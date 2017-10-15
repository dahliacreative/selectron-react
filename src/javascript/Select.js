import React from 'react'
import SelectTrigger from './SelectTrigger'
import SelectMultiTrigger from './SelectMultiTrigger'
import Search from './Search'
import Options from './options'
import Option from './option'

class Select extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      options: props.options,
      value: props.value,
      highlighted: props.value || props.options[0],
      searchTerm: ''
    }
    const methods = [
      'clickOutside',
      'toggleOptions',
      'onKeyDown',
      'onKeyUp',
      'onSearch',
      'multiOnChange'
    ].forEach(fn => this[fn] = this[fn].bind(this))
  }

  componentWillMount() {
    document.addEventListener('click', this.clickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.clickOutside)
  }

  componentWillReceiveProps(nextProps) {
    const { multi, value, options } = nextProps
    const currentValue = this.state.value
    const currentOptions = this.state.options

    let newOptions = options

    if (multi && value) {
      newOptions = options.filter(opt => value.findIndex(val => val.value === opt.value) < 0)
    }

    if (value !== currentValue) {
      this.setState({
        value,
        options: newOptions,
        highlighted: value || newOptions[0]
      })
      this.closeOptions()
    } else if (options !== currentOptions) {
      this.setState({
        options: newOptions,
        highlighted: newOptions[0]
      })
    } else {
      this.closeOptions()
    }
  }

  toggleOptions(e, toggle = !this.state.isOpen) {
    this.setState({
      isOpen: toggle
    })
  }

  closeOptions(focus = true) {
    this.toggleOptions(null, false)
    if (focus) this.focusTrigger()
  }

  openOptions() {
    this.toggleOptions(null, true)
  }

  clickOutside(e) {
    if (!this.state.isOpen || (this.select.contains(e.target) || this.options.wrapper.contains(e.target))) return
    this.closeOptions(false)
  }

  focusTrigger() {
    this.trigger.button.focus()
  }

  onKeyDown(e) {
    const { isOpen, highlighted, options } = this.state
    switch (e.which) {
      case 13: {
        e.preventDefault()
        break
      }
      case 27: {
        if (isOpen) {
          this.closeOptions()
        }
        break
      }
      case 38: {
        if (!isOpen) {
          this.openOptions()
        } else if (options.legnth > 0) {
          const currentIndex = options.map(opt => opt.value).indexOf(highlighted.value)
          const nextIndex = currentIndex === 0 ? options.length - 1 : currentIndex - 1
          this.setState({
            highlighted: options[nextIndex]
          })
        }
        break
      }
      case 40: {
        if (!isOpen) {
          this.openOptions()
        } else if (options.legnth > 0) {
          const currentIndex = options.map(opt => opt.value).indexOf(highlighted.value)
          const nextIndex = currentIndex === options.length - 1 ? 0 : currentIndex + 1
          this.setState({
            highlighted: options[nextIndex]
          })
        }
        break
      }
    }
  }

  onKeyUp(e) {
    const { multi, options, onChange } = this.props
    const { isOpen, highlighted } = this.state
    const changeFunction = multi ? this.multiOnChange : onChange
    switch (e.which) {
      case 13: {
        if(!isOpen) {
          return false
        } else {
          this.setState({
            options,
            searchTerm: ''
          })
          changeFunction(this.state.highlighted)
        }
      }
    }
  }

  onSearch({target}) {
    const { onSearch, options, multi, value } = this.props
    if (onSearch) {
      this.setState({
        searchTerm: target.value
      })
      onSearch(target.value)
      return false
    }
    let newOptions = options
    if (multi && value) {
      newOptions = options.filter(opt => value.findIndex(val => val.value === opt.value) < 0)
    }
    newOptions = newOptions.filter(({label}) => label.toLowerCase().includes(target.value.toLowerCase()))
    this.setState({
      searchTerm: target.value,
      options: newOptions,
      highlight: newOptions[0]
    })
  }

  multiOnChange(value, remove = false) {
    const { onChange } = this.props
    const currentValue = this.props.value || []
    if (!value) {
      onChange(null)
      return false
    }
    if (remove) {
      const newValue = currentValue.filter(item => item.value !== value.value)
      if (newValue.length < 1) {
        onChange(null)
        return false
      }
      onChange(newValue)
    } else {
      currentValue.push(value)
      onChange(currentValue.slice(0))
    }
  }

  render() {
    const { placeholder, multi, clearable, searchable } = this.props
    const { isOpen, value, highlighted, options, searchTerm } = this.state
    const onChange = multi ? this.multiOnChange : this.props.onChange

    const triggerProps = {
      onChange: multi ? onChange : null,
      onClick: this.toggleOptions,
      onKeyDown: this.onKeyDown,
      onKeyUp: this.onKeyUp,
      value: value,
      placeholder: placeholder,
      ref: node => { this.trigger = node }
    }

    const Trigger = multi ? SelectMultiTrigger : SelectTrigger

    const searchProps = {
      onChange: this.onSearch,
      onKeyDown: this.onKeyDown,
      onKeyUp: this.onKeyUp,
      value: searchTerm
    }

    return (
      <div className="selectron" ref={node => { this.select = node }}>
        <Trigger {...triggerProps} />
        { value && clearable &&
          <button type="button" className="selectron__clear" onClick={() => { onChange(null) }}>Clear</button>
        }
        { isOpen &&
          <Options select={ this.select } ref={node => { this.options = node }}>
            { searchable &&
              <Search {...searchProps} />
            }
            <ul className="selectron__list">
              { options.length > 1 &&
                <li className="seectron__no-results">No results</li>
              }
              { options.map(option => {
                const isSelected = value ? option.value === value.value : false
                const isHighlighted = option.value === highlighted.value
                return (
                  <Option key={ option.value } option={ option } onChange={ onChange } highlighted={ isHighlighted } selected={ isSelected } onMouseEnter={() => { this.setState({ highlighted: option }) }} />
                )
              })}
            </ul>
          </Options>
        }
      </div>
    )
  }

}

export default Select