import React from 'react'
import AddTodo from './add-todo'
import ListTodos from './list-todos'

class App extends React.Component {

    render() {

        const { addTodo, todos } = this.props

        return (
            <div>
                <header>
                    <h1>Sample TodoApp showing off React and RxJS</h1>
                </header>
                <main>

                    <AddTodo addTodo={addTodo} />
                    <ListTodos todos={todos} />

                </main>
                <footer>
                    <i>driven by React and RxJS</i>
                </footer>
            </div>
        )
    }
}

export default App
