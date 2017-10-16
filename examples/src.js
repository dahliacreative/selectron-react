import React from 'react'
import ReactDOM from 'react-dom'
import Selectron from '../lib/index.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: null
    }
  }
  render() {
    return <Selectron
              options={[{
                value: 1,
                label: 'Option 1'
              },{
                value: 2,
                label: 'Option 2'
              },{
                value: 3,
                label: 'Option 3'
              },{
                value: 4,
                label: 'Option 4'
              },{
                value: 5,
                label: 'Option 5'
              },{
                value: 6,
                label: 'Option 6'
              },{
                value: 7,
                label: 'Option 7'
              },{
                value: 8,
                label: 'Option 8'
              },{
                value: 9,
                label: 'Option 9'
              },{
                value: 10,
                label: 'Option 10'
              }]}
              value={ this.state.value }
              onChange={(value) => { this.setState({value}) }}
              multi={ true }/>
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))