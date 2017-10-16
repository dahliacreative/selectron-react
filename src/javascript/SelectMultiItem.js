import React from 'react'

class SelectMultiItem extends React.Component {
  constructor(props) {
    super(props)
    const methods = [
      'removeItem'
    ].forEach(fn => this[fn] = this[fn].bind(this))
  }

  removeItem(e) {
    e.stopPropagation()
    e.preventDefault()
    this.props.onChange(this.props.item, true)
  }

  render() {
    return(
      <div className="selectron__item">
        <button type="button" className="selectron__item-remove" onMouseDown={ this.removeItem } tabIndex="-1">x</button>
        <span className="selectron__item-copy">{ this.props.item.label }</span>
      </div>
    )
  }
}

export default SelectMultiItem