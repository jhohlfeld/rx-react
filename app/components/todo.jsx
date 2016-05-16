import React from 'react'

export default function Todo({ todo, removeTodo, ...props }) {
    const onRemove = (e) => {
        e.preventDefault()
        removeTodo(todo.id)
    }
    return (
        <div>
            <span>{todo.title}</span>
            <button onClick={onRemove}>X</button>
        </div>
    )
}
