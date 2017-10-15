import React from 'react'

class Option extends React.Component {
  render() {
    const { option, onSelect, highlighted, selected, onMouseEnter, term } = this.props
    const regex = new RegExp("(" + term + ")", ["gi"])
    const classes = ['selectron__option']
    if (highlighted) classes.push('highlighted')
    if (selected) classes.push('selected')
    const classNames = classes.join(' selectron__option--')
    return(
      <li className={ classNames }
        onMouseDown={(e) => {
          e.preventDefault()
          onSelect(option) }}
        onMouseEnter={ onMouseEnter }
        dangerouslySetInnerHTML={{ __html: option.label.replace(regex, '<b>$1</b>') }}></li>
    )
  }
}

export default Option