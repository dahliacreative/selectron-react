import React from 'react'

class Search extends React.Component {
  componentDidMount() {
    this.search.focus()
  }
  render() {
    return(
      <input type="text" className="selectron__search" placeholder="Type to search..." {...this.props} ref={node => { this.search = node }} />
    )
  }
}

export default Search