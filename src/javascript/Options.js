import React from 'react'
import ReactDOM from 'react-dom'

class Options extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstRender: true
    }
  }
  componentWillMount() {
    this.options = document.createElement('div')
    document.body.appendChild(this.options)
    this.renderOptions(this.props)
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.options)
    document.body.removeChild(this.options)
  }

  componentWillReceiveProps(nextProps) {
    setTimeout(() => {
      this.renderOptions(nextProps)
      if (nextProps.updateScroll) {
        this.props.onMount()
      }
    }, 0)
  }

  renderOptions(props) {
    const { select } = props
    const style = {
      position: 'absolute',
      top: select.offsetTop + select.offsetHeight,
      left: select.offsetLeft,
      width: select.clientWidth
    }
    ReactDOM.render(
      <div className="selectron__options" style={ style } ref={node => { this.wrapper = node }}>
        { props.children }
      </div>
    , this.options, () => {
      if (this.state.firstRender) {
        this.setState({ firstRender:false }, this.props.onMount)
      }
    })
  }

  render() {
    return null
  }
}

export default Options