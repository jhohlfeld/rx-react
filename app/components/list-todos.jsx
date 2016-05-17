import React from 'react'
import Todo from './todo'

export default function ListTodos({ updateTodo, removeTodo, todos, ...props }) {

    return (
        <ul>
            {todos.map(todo => {
                return <li key={todo.id}><Todo { ...{removeTodo, updateTodo, todo}} /></li>
            })}
        </ul>
    )
}
