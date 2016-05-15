import React from 'react'
import ReactDOM from 'react-dom'
import Cycle from '@cycle/core'

function main(drivers) {

    const click$ = drivers.DOM.events('onClick')

    return {
        DOM: Rx.Observable.of('Hello React!')
            .concat(click$
                .map((e) => 'The button was clicked')
            ),

        Log: click$
    }

}

function createDOMDriver(initDriver) {
    return function(props$) {

        const _events = {}
        const _callbacks = {}

        const events = function(type) {
            if (!_events[type]) {
                const event$ = new Rx.Subject()
                _events[type] = event$
                _callbacks[type] = (e) => event$.onNext(e)
            }
            return _events[type]
        }

        const createCallback = function(type) {
            if (!_callbacks[type]) {
                events(type)
            }
            return _callbacks[type]
        }

        initDriver(props$, createCallback)

        return { events }

    }
}

const drivers = {

    DOM: createDOMDriver((props$, createCallback) => {
        const onClick = createCallback('onClick')

        props$.subscribe(text => {
            ReactDOM.render(
                React.createElement('button', { onClick }, text),
                document.querySelector('#app')
            )
        })
    }),

    Log: function(click$) {
        click$.subscribe(e => console.log(e))
    }
}

Cycle.run(main, drivers)
