import React from 'react'
import ReactDOM from 'react-dom'
import Cycle from '@cycle/core'
import { createDOMDriver } from './lib/driver';
import App from './components/app'

const initialState = { todos: [] }

function intent({ DOM }) {
    return {
        addTodo: DOM.events('addTodo').filter(todo => todo.title !== ''),
        removeTodo: DOM.events('removeTodo')
    }
}

const operations = {
    addTodo: newTodo => state => ({
        todos: state.todos.concat(newTodo)
    }),
    removeTodo: idToRemove => state => ({
        todos: state.todos.filter(todo => todo.id !== idToRemove)
    })
}

function model(intents) {
    const allOperations$ = Rx.Observable.merge(
        Object.keys(intents).map(intent =>
            intents[intent].map(item => operations[intent](item))))

    return allOperations$
        .scan((state, operation) => operation(state), initialState)
}

function view(state$) {
    return state$
        .startWith(initialState)
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
