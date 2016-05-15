import React from 'react'
import Todo from './todo'

export default function ListTodos(props) {

    const { todos } = props

    return (
        <ul>
            {todos.map(todo => (
                <li key={todo.id}>{todo.title}</li>
            ))}
        </ul>
    )
}
