import React from 'react'
import ReactDOM from 'react-dom'
import Cycle from '@cycle/core'

function Test({ text, ...props }) {
    return React.createElement('h1', props, text)
}

function main(drivers) {

    const props$ = drivers.props$

    // consume event stream here somehow
    const onUpdate$ = drivers.DOM
        .events('onClick')
        .map(event => ({ text: event.text }))
        .delay(2000)

    return {
        DOM: Rx.Observable.concat(props$, onUpdate$)
            .map(props => React.createElement(Test, props))
    }

}

const drivers = {

    props$: () => Rx.Observable.of({
        text: 'I want dataflow! Now',
    }),

    DOM: function(vtree$) {

        // materialize the side effects

        vtree$.subscribe((element) =>

            ReactDOM.render(
                element,
                document.getElementById('app')
            )

        )

        // declare interface to attach event listeners

        return {
            events: function(type) {
                return Rx.Observable.just({
                    type,
                    text: `I'm a simulated event!`
                })
            }
        }

    }
}

Cycle.run(main, drivers)
