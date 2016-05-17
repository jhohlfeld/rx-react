import React from 'react'
import ReactDOM from 'react-dom'
import Cycle from '@cycle/core'
import { createReactDriver } from './lib/driver-react';
import { createRouterDriver } from '@cycloidal/driver-router';
import App from './components/app'

function intent({ DOM, router }) {
    return {
        addTodo: DOM.events('addTodo').filter(todo => todo.title !== ''),
        updateTodo: DOM.events('updateTodo'),
        removeTodo: DOM.events('removeTodo'),
        routeChanged: router.onRouteChanged
    }
}

const operations = {

    addTodo: newTodo => state => ({
        ...state,
        todos: state.todos.concat(newTodo)
    }),

    updateTodo: todoToUpdate => state => ({
        ...state,
        todos: state.todos.map(todo => todo.id === todoToUpdate.id ? todoToUpdate : todo)
    }),

    removeTodo: idToRemove => state => ({
        ...state,
        todos: state.todos.filter(todo => todo.id !== idToRemove)
    }),

    routeChanged: newRoute => state => ({
        ...state,
        route: newRoute
    })

}

function model(intents, initialState) {

    const allOperations$ = Rx.Observable.merge(

        // add state operations due to state
        Object.keys(intents).map(intent =>
            intents[intent].map(item => operations[intent](item)))

    )

    return allOperations$
        .scan((state, operation) => operation(state), initialState)

}

function view(state$) {
    return state$
        .startWith(null)
        .skipWhile(state => !state || !state.hasOwnProperty('route'))
        .map(state => React.createElement(App, state))
}

function main({ DOM, router }) {

    const initialState = {
        todos: [],
        router
    }

    return {
        DOM: view(model(intent({ DOM, router }), initialState))
    }

}

const routes = {
    listTodos: 'GET /todos',
    editTodo: 'GET /todo/:id'
}

const aliases = {
    'GET /': 'listTodos'
}

Cycle.run(main, {
    DOM: createReactDriver('#app'),
    router: createRouterDriver(routes, aliases)
})
