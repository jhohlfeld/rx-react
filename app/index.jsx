import React from 'react'
import ReactDOM from 'react-dom'
import Cycle from '@cycle/core'
import { createDOMDriver } from './lib/driver';

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
