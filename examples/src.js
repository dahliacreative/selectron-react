import React from 'react'
import ReactDOM from 'react-dom'
import Selectron from '../lib/index.js'

class App extends React.Component {
  render() {
    return <Selectron
              options={[]} />
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))