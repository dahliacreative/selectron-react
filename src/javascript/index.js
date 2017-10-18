import React from 'react'
import PropTypes from 'prop-types'
import Select from './Select'

class Selectron extends React.Component {

  render() {
    return <Select {...this.props} />
  }

}

Selectron.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    label: PropTypes.string
  })),
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]),
      label: PropTypes.string
    })),
    PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]),
      label: PropTypes.string
    })
  ]),
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  clearable: PropTypes.bool,
  multi: PropTypes.bool,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  searchable: PropTypes.bool,
  name: PropTypes.string
}

Selectron.defaultProps = {
  clearable: true,
  multi: false,
  placeholder: 'Please select...',
  required: false,
  searchable: true,
  required: false,
  onChange: () => {},
  options: [],
  value: null,
  name: 'selectron-react-value'
}

export default Selectron