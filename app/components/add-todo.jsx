import React from 'react'

export default function AddTodo({addTodo}) {
    return (
        <form onSubmit={addTodo}>
            Todo: <input name="title" type="text" />
            <button>Add</button>
        </form>
    )
}
