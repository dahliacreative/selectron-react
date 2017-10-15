import React from 'react'
import SelectMultiItem from './SelectMultiItem'

class SelectMultiTrigger extends React.Component {

  render() {
    return (
      <div className="selectron__trigger selectron__trigger--multi" {...this.props} ref={node => { this.button = node }} tabIndex="0">
        { this.props.value && this.props.map(item => (
          <SelectMultiItem onChange={ this.props.onChange } item={ item } />
        ))}
        { !this.props.value &&
          <span>{ this.props.placeholder }</span>
        }
      </div>
    )
  }

}

export default SelectMultiTrigger