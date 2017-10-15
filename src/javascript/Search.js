import React from 'react'

class Search extends React.Component {
  componentDidMount() {
    this.input.focus()
  }
  render() {
    return(
      <input type="text" className="selectron__search" placeholder="Type to search..." {...this.props} ref={node => { this.input = node }} />
    )
  }
}

export default Search