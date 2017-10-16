import React from 'react'
import ReactDOM from 'react-dom'
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
      isFocused: false,
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
      'onFocus',
      'onBlur',
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
        highlighted: newOptions[0],
        loading: false
      })
    } else {
      this.closeOptions()
    }
  }

  toggleOptions(e, toggle = !this.state.isOpen) {
    if (e) e.preventDefault()
    this.setState({
      isOpen: toggle
    })
  }

  closeOptions(focus = true) {
    this.toggleOptions(null, false)
    this.setState({ searchTerm: '' })
    if (focus) {
      this.focusTrigger()
    } else {
      this.setState({ isFocused: false })
    }
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
        } else if (options.length > 0) {
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
        } else if (options.length > 0) {
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
        } else if (this.state.options) {
          this.setState({
            options,
            searchTerm: ''
          })
          changeFunction(this.state.highlighted)
        }
      }
    }
  }

  onFocus() {
    this.setState({ isFocused: true })
  }

  onBlur() {
    this.setState({ isFocused: false }, () => {
      const focused = document.activeElement
      if (!this.search || ((this.search && focused !== this.search.input) && focused !== this.trigger.button)) {
        this.closeOptions(false)
      }
    })
  }

  onSearch({target}) {
    const { onSearch, options, multi, value } = this.props
    if (onSearch) {
      clearTimeout(this.ajaxTimer)
      this.setState({
        searchTerm: target.value,
        options: [],
        loading: true
      })
      this.ajaxTimer = setTimeout(() => {
        onSearch(target.value)
      }, 500)
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
    const { isOpen, isFocused, value, highlighted, options, searchTerm, loading } = this.state
    const onChange = multi ? this.multiOnChange : this.props.onChange

    const triggerProps = {
      onChange: multi ? onChange : null,
      onMouseDown: this.toggleOptions,
      onKeyDown: this.onKeyDown,
      onKeyUp: this.onKeyUp,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      value: value,
      placeholder: placeholder,
      ref: node => { this.trigger = node }
    }

    const Trigger = multi ? SelectMultiTrigger : SelectTrigger

    const searchProps = {
      onChange: this.onSearch,
      onKeyDown: this.onKeyDown,
      onKeyUp: this.onKeyUp,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      value: searchTerm
    }

    const classes = ['selectron']
    if (isOpen) classes.push('is-open')
    if (isFocused) classes.push('is-focused')
    if (clearable) classes.push('is-clearable')
    if (multi) classes.push('multiple')
    if (value) classes.push('is-filled')

    return (
      <div className={ classes.join(' selectron--')} ref={node => { this.select = node }}>
        <Trigger {...triggerProps} />
        { value && clearable &&
          <button type="button" className="selectron__clear"
            onMouseDown={(e) => {
              e.preventDefault()
              onChange(null)
            }}>Clear</button>
        }
        { isOpen &&
          <Options select={ this.select } ref={node => { this.options = node }}>
            { searchable &&
              <Search {...searchProps} ref={node => { this.search = node }}/>
            }
            <ul className="selectron__list">
              { options.length < 1 &&
                <li className="selectron__option selectron__option--empty">{ loading ? "Loading..." : "No results" }</li>
              }
              { options.map(option => {
                const isSelected = value ? option.value === value.value : false
                const isHighlighted = option.value === highlighted.value
                return (
                  <Option key={ option.value } option={ option } term={ this.state.searchTerm } onSelect={ onChange } highlighted={ isHighlighted } selected={ isSelected } onMouseEnter={() => { this.setState({ highlighted: option }) }} />
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