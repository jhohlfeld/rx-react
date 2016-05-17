import React, { PropTypes } from 'react'

export default class Todo extends React.Component {

    static propTypes = {
        todo: PropTypes.object,
        updateTodo: PropTypes.func,
        removeTodo: PropTypes.func
    }

    constructor(props) {
        super(props)
        this.state = {
            editing: false,
            edit: false,
            todo: props.todo
        }
    }

    onEdit = (e) => {
        this.setState({
            ...this.state,
            edit: true
        })
    }

    onChange = (e) => {
        this.setState({
            ...this.state,
            todo: {
                ...this.state.todo,
                title: e.target.value
            },
            editing: true
        });
    }

    updateEdit = (e) => {
        switch (true) {
            case e.key && e.key === 'Escape':
                this.setState({
                    ...this.state,
                    todo: this.props.todo,
                    edit: false,
                    editing: false
                })
                break
            case e.key && e.key === 'Enter':
            case !e.key:
                this.props.updateTodo(this.state.todo)
                this.setState({
                    ...this.state,
                    edit: false,
                    editing: false
                })
                break
        }
    }

    onRemove = (e) => {
        this.props.removeTodo(this.state.todo.id)
    }

    render() {
        const { todo, edit, editing } = this.state

        return (
            <div>
                {edit
                    ? <input
                        ref={(e) => e && !editing && e.select()}
                        value={todo.title}
                        onChange={this.onChange}
                        onKeyDown={this.updateEdit}
                        onBlur={this.updateEdit} />
                    : <span onClick={this.onEdit}>{todo.title}</span>
                }
                <button onClick={this.onRemove}>X</button>
            </div>
        )
    }
}
