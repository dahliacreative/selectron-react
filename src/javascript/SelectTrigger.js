import React from 'react'

class SelectTrigger extends React.Component {

  render() {
    return (
      <button type="button" className="selectron__trigger" {...this.props} ref={node => { this.button = node }}>
        { this.props.value ? (
          <span>{ this.props.value.label }</span>
        ) : (
          <span>{ this.props.placeholder }</span>
        )}
      </button>
    )
  }

}

export default SelectTrigger