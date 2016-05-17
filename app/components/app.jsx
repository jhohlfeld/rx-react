import React from 'react'
import AddTodo from './add-todo'
import ListTodos from './list-todos'
import { connect } from '../lib/driver-react'

@connect('addTodo', 'updateTodo', 'removeTodo')
class App extends React.Component {

    render() {

        const { todos, events } = this.props
        const { addTodo, updateTodo, removeTodo } = events

        return (
            <div>
                <header>
                    <h1>Todo-app with Cycle.js and React.js</h1>
                </header>
                <main>

                    <AddTodo addTodo={addTodo} />
                    <ListTodos {...{todos, updateTodo, removeTodo}} />

                </main>
                <footer>
                    <i>driven by React and RxJS</i>
                </footer>
            </div>
        )
    }
}

export default App
