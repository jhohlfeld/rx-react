import React from 'react'
import Todo from './todo'

export default function ListTodos({removeTodo, todos, ...props}) {

    return (
        <ul>
            {todos.map(todo => (
                <li key={todo.id}><Todo removeTodo={removeTodo} todo={todo} /></li>
            ))}
        </ul>
    )
}
