import React from 'react'
import uuid from 'uuid'

export default function AddTodo({addTodo}) {
    const onAdd = (e) => {
        e.preventDefault()
        const title = e.target.title.value
        e.target.title.value = ''
        e.target.title.focus()
        addTodo({
            id: uuid.v4(),
            title
        })
    }
    return (
        <form onSubmit={onAdd}>
            Todo: <input name="title" type="text" />
            <button>Add</button>
        </form>
    )
}
