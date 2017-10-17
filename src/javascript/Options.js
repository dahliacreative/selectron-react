import React from 'react'
import ReactDOM from 'react-dom'

class Options extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstRender: true
    }
    this.checkOverflow = this.checkOverflow.bind(this)
  }
  componentWillMount() {
    this.options = document.createElement('div')
    document.body.appendChild(this.options)
    this.renderOptions(this.props)
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.options)
    document.body.removeChild(this.options)
    window.removeEventListener('scroll', this.checkOverflow)
    this.props.toggleOverflow(false)
  }

  checkOverflow() {
    const docBottom = window.pageYOffset + window.innerHeight
    this.props.toggleOverflow(this.state.optionsBottom > docBottom)
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
    const { select, isOverflowing } = props
    const style = {
      position: 'absolute',
      left: select.offsetLeft,
      width: select.clientWidth,
      opacity: this.state.firstRender ? 0 : 1
    }
    if (isOverflowing) {
      style.bottom = window.innerHeight - select.offsetTop
    } else {
      style.top = select.offsetTop + select.offsetHeight
    }
    const classes = ['selectron__options']
    if (isOverflowing) classes.push('is-overflowing')
    const classNames = classes.join(' selectron__options--')
    ReactDOM.render(
      <div className={ classNames } style={ style } ref={node => { this.wrapper = node }}>
        { props.children }
      </div>
    , this.options, () => {
      if (this.state.firstRender) {
        const options = this.wrapper
        const optionsBottom = options.offsetTop + options.offsetHeight + 20
        this.setState({
          firstRender: false,
          optionsBottom
        }, () => {
            this.props.onMount()
            this.checkOverflow()
            window.addEventListener('scroll', this.checkOverflow)
        })
      }
    })
  }

  render() {
    return null
  }
}

export default Options