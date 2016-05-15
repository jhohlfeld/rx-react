import React from 'react'
import ReactDOM from 'react-dom'
import Cycle from '@cycle/core'
import { createDOMDriver } from './lib/driver';
import uuid from 'uuid'
import App from './components/app'

const todos = []

function intent({ DOM }) {
    return {
        addTodo: DOM.events('addTodo')
            .map(e => {
                e.preventDefault()
                const title = e.target.title.value
                e.target.title.value = ''
                e.target.title.focus()
                return {
                    id: uuid.v4(),
                    title
                }
            })
            .filter(todo => todo.title !== '')
    }
}

function model(intents) {
    return intents.addTodo
        .scan((state, todo) => ({
            todos: state.todos.concat(todo)
        }), { todos })
}

function view(state$) {
    return state$
        .startWith({ todos })
        .map(state => React.createElement(App, { todos: state.todos }))
}

function main({ DOM }) {
    return {
        DOM: view(model(intent({ DOM })))
    }
}

Cycle.run(main, {
    DOM: createDOMDriver('#app')
})
