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
    this.option = {}
    this.state = {
      isOpen: false,
      isFocused: false,
      options: props.options,
      value: props.value,
      highlighted: props.value || props.options[0],
      searchTerm: '',
      displayNoResults: false
    }
    const methods = [
      'clickOutside',
      'toggleOptions',
      'onKeyDown',
      'onKeyUp',
      'onFocus',
      'onBlur',
      'onSearch',
      'multiOnChange',
      'updateScrollPosition'
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
        highlighted: multi ? this.state.highlighted : (value || newOptions[0])
      })
      if ((!nextProps.onSearch && !nextProps.multi) || newOptions.length < 1 || (nextProps.onSearch && !nextProps.multi)) {
        this.closeOptions()
      }
    } else if (options !== currentOptions) {
      this.setState({
        options: newOptions,
        highlighted: newOptions[0],
        loading: false,
        displayNoResults: true
      })
    } else {
      this.closeOptions()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.updateScroll) {
      this.setState({
        updateScroll: false
      })
    }
  }

  toggleOptions(e, toggle = !this.state.isOpen) {
    if (e) e.preventDefault()
    this.setState({
      isOpen: toggle,
      updateScrollPosition: toggle
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
    if (this.select.contains(e.target) || (this.options && this.options.wrapper.contains(e.target))) return
    this.closeOptions(false)
  }

  focusTrigger() {
    this.trigger.button.focus()
  }

  updateScrollPosition() {
    const { options } = this.state
    if (options.length < 1) {
      return
    }
    const node = this[`option-${this.state.highlighted.value}`].option
    const item = {
        node: node,
        top: node.offsetTop,
        bottom: node.offsetTop + node.offsetHeight,
        height: node.offsetHeight,
        index: options.indexOf(this.state.highlighted)
    }
    const list = {
        node: this.list,
        height: this.list.offsetHeight,
        scroll: this.list.scrollTop,
        scrollHeight: this.list.scrollHeight
    }
    if (item.index === this.state.options.length -1) {
      list.node.scrollTop = list.scrollHeight
    } else if (item.bottom - list.scroll > list.height) {
      list.node.scrollTop = item.top - (list.height - item.height)
    } else if(item.top < list.scroll) {
      list.node.scrollTop = item.top
    }
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
            highlighted: options[nextIndex],
            updateScroll: true
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
            highlighted: options[nextIndex],
            updateScroll: true
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
        loading: true,
        displayNoResults: false
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
      highlight: newOptions[0],
      displayNoResults: true
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
      const { options } = this.state
      currentValue.push(value)
      if (options.length > 1) {
        const index = options.findIndex(opt => opt.value === value.value)
        const newHighlight = options[index + 1]
        this.setState({ highlighted: newHighlight }, () => {
          onChange(currentValue.slice(0))
        })
      } else {
        onChange(currentValue.slice(0))
      }
    }
  }

  render() {
    const { placeholder, multi, clearable, searchable, name } = this.props
    const { isOpen, isFocused, value, highlighted, options, searchTerm, loading, displayNoResults } = this.state
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
        { value && clearable && !loading &&
          <button type="button" className="selectron__clear"
            onMouseDown={(e) => {
              e.preventDefault()
              onChange(null)
            }}>Clear</button>
        }
        { loading &&
            <div className="selectron__spinner"></div>
        }
        { isOpen &&
          <Options select={ this.select } ref={node => { this.options = node }} onMount={ this.updateScrollPosition } updateScroll={ this.state.updateScroll }>
            { searchable &&
              <Search {...searchProps} ref={node => { this.search = node }}/>
            }
            <ul className="selectron__list" ref={node => { this.list = node }}>
              { options.length < 1 && displayNoResults &&
                <li className="selectron__option selectron__option--empty">{ loading ? "Loading..." : "No results" }</li>
              }
              { options.map(option => {
                const isSelected = value ? option.value === value.value : false
                const isHighlighted = option.value === highlighted.value
                return (
                  <Option key={ option.value } option={ option } term={ this.state.searchTerm } onSelect={ onChange } highlighted={ isHighlighted } selected={ isSelected } onMouseEnter={() => { this.setState({ highlighted: option }) }} ref={node => { this[`option-${option.value}`] = node }} />
                )
              })}
            </ul>
          </Options>
        }
        { multi ? (
          <input type="hidden" name={ name } value={ value ? value.map(val => val.value ).join(',') : '' } />
        ) : (
          <input type="hidden" name={ name } value={ value ? value.value : '' } />
        )}
      </div>
    )
  }

}

export default Select