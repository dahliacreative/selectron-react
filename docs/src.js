import React from 'react'
import ReactDOM from 'react-dom'
import Selectron from '../lib/index.js'

class Default extends React.Component {
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
              onChange={(value) => { this.setState({value}) }}/>
  }
}

ReactDOM.render(<Default/>, document.getElementById('default'))

class DefaultAjax extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: null,
      options: []
    }
  }
  returnOptions(term) {
    const options = [{
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
              }]
    return options.filter(opt => opt.label.toLowerCase().includes(term.toLowerCase()))
  }
  handleSearch(term) {
    console.log(term)
    // Fake ajax request
    setTimeout(() => {
        this.setState({
        options: this.returnOptions(term)
        })
    }, 500)
  }
  render() {
    return <Selectron
              options={ this.state.options }
              value={ this.state.value }
              onChange={(value) => { this.setState({value}) }}
              onSearch={ this.handleSearch.bind(this) }/>
  }
}

ReactDOM.render(<DefaultAjax/>, document.getElementById('default-ajax'))

class Multi extends React.Component {
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

ReactDOM.render(<Multi/>, document.getElementById('multi'))

class MultiAjax extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: null,
      options: []
    }
  }
  returnOptions(term) {
    const options = [{
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
              }]
    return options.filter(opt => opt.label.toLowerCase().includes(term.toLowerCase()))
  }
  handleSearch(term) {
    console.log(term)
    // Fake ajax request
    setTimeout(() => {
        this.setState({
        options: this.returnOptions(term)
        })
    }, 500)
  }
  render() {
    return <Selectron
              options={ this.state.options }
              value={ this.state.value }
              onChange={(value) => { this.setState({value}) }}
              onSearch={ this.handleSearch.bind(this) }
              multi={ true }/>
  }
}

ReactDOM.render(<MultiAjax/>, document.getElementById('multi-ajax'))