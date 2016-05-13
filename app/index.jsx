import React from 'react'
import ReactDOM from 'react-dom'
import Cycle from '@cycle/core'

function main(drivers) {

    const click$ = drivers.DOM

    return {
        DOM: click$
            .startWith(null)
            .flatMapLatest(() =>
                Rx.Observable.of('Hello React!')
            ),

        Log: click$
    }

}

const drivers = {

    DOM: function(initialProps$) {

        const click$ = new Rx.Subject()
        const onClick = (e) => click$.onNext(e)

        initialProps$.subscribe(text => {
            ReactDOM.render(
                React.createElement('button', { onClick }, text),
                document.querySelector('#app')
            )
        })

        return click$

    },

    Log: function(click$) {
        click$.subscribe(e => console.log(e))
    }
}

Cycle.run(main, drivers)
