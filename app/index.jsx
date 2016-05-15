import React from 'react'
import ReactDOM from 'react-dom'
import Cycle from '@cycle/core'
import { createDOMDriver } from './lib/driver';
import uuid from 'uuid'
import App from './components/app'

const todos = [{
    id: uuid.v4(),
    title: 'Buy groceries'
}]

function main({ DOM }) {

    const addTodo$ = DOM.events('addTodo')
        .map(e => {
            e.preventDefault()
            const title = e.target.title.value
            e.target.title.value = ''
            return {
                id: uuid.v4(),
                title
            }
        })
        .filter(todo => todo.title !== '')

    return {
        DOM: addTodo$
            .scan((state, todo) => ({
                todos: state.todos.concat(todo)
            }), { todos })
            .startWith({ todos }),

        Log: addTodo$
    }

}

const drivers = {

    DOM: createDOMDriver((state$, createCallback) => {
        const addTodo = createCallback('addTodo')

        state$.subscribe(({ todos }) => {
            ReactDOM.render(
                React.createElement(App, { addTodo, todos }),
                document.querySelector('#app')
            )
        })
    }),

    Log: function(e$) {
        e$.subscribe(e => console.log(e))
    }
}

Cycle.run(main, drivers)
