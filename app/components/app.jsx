import React from 'react'
import AddTodo from './add-todo'
import ListTodos from './list-todos'
import {connect} from '../lib/driver'

@connect('addTodo', 'removeTodo')
class App extends React.Component {

    render() {

        const { todos, addTodo, removeTodo } = this.props

        return (
            <div>
                <header>
                    <h1>Todo-app with Cycle.js and React.js</h1>
                </header>
                <main>

                    <AddTodo addTodo={addTodo} />
                    <ListTodos {...{todos, removeTodo}} />

                </main>
                <footer>
                    <i>driven by React and RxJS</i>
                </footer>
            </div>
        )
    }
}

export default App
