import React from 'react'

class App extends React.Component {

    render() {

        const { onClick, text } = this.props

        return (
            <div>
                <header><i>Simple react app</i></header>
                <main>

                    <button { ...{onClick}}>{text}</button>

                </main>
                <footer>
                    <i>driven by React and RxJS</i>
                </footer>
            </div>
        )
    }
}

export default App
