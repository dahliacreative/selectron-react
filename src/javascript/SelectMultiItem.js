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
    this.props.onChange(this.props.item, true)
  }

  render() {
    return(
      <div className="selectron__item">
        <button type="button" className="selectron__item-remove" onClick={ this.removeItem }>x</button>
        { this.props.item.label }
      </div>
    )
  }
}

export default SelectMultiItem