'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _SelectTrigger = require('./SelectTrigger');

var _SelectTrigger2 = _interopRequireDefault(_SelectTrigger);

var _SelectMultiTrigger = require('./SelectMultiTrigger');

var _SelectMultiTrigger2 = _interopRequireDefault(_SelectMultiTrigger);

var _Search = require('./Search');

var _Search2 = _interopRequireDefault(_Search);

var _options = require('./options');

var _options2 = _interopRequireDefault(_options);

var _option = require('./option');

var _option2 = _interopRequireDefault(_option);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Select = function (_React$Component) {
  _inherits(Select, _React$Component);

  function Select(props) {
    _classCallCheck(this, Select);

    var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

    _this.option = {};
    _this.state = {
      isOpen: false,
      isFocused: false,
      options: props.options,
      value: props.value,
      highlighted: props.value || props.options[0],
      searchTerm: '',
      displayNoResults: false
    };
    var methods = ['clickOutside', 'toggleOptions', 'onKeyDown', 'onKeyUp', 'onFocus', 'onBlur', 'onSearch', 'multiOnChange', 'updateScrollPosition'].forEach(function (fn) {
      return _this[fn] = _this[fn].bind(_this);
    });
    return _this;
  }

  _createClass(Select, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      document.addEventListener('click', this.clickOutside);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('click', this.clickOutside);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var multi = nextProps.multi,
          value = nextProps.value,
          options = nextProps.options;

      var currentValue = this.state.value;
      var currentOptions = this.state.options;

      var newOptions = options;

      if (multi && value) {
        newOptions = options.filter(function (opt) {
          return value.findIndex(function (val) {
            return val.value === opt.value;
          }) < 0;
        });
      }

      if (value !== currentValue) {
        this.setState({
          value: value,
          options: newOptions,
          highlighted: multi ? this.state.highlighted : value || newOptions[0]
        });
        if (!nextProps.onSearch && !nextProps.multi || newOptions.length < 1 || nextProps.onSearch && !nextProps.multi) {
          this.closeOptions();
        }
      } else if (options !== currentOptions) {
        this.setState({
          options: newOptions,
          highlighted: newOptions[0],
          loading: false,
          displayNoResults: true
        });
      } else {
        this.closeOptions();
      }
    }
  }, {
    key: 'toggleOptions',
    value: function toggleOptions(e) {
      var toggle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !this.state.isOpen;

      if (e) e.preventDefault();
      this.setState({
        isOpen: toggle,
        updateScrollPosition: toggle
      });
    }
  }, {
    key: 'closeOptions',
    value: function closeOptions() {
      var focus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this.toggleOptions(null, false);
      this.setState({ searchTerm: '' });
      if (focus) {
        this.focusTrigger();
      } else {
        this.setState({ isFocused: false });
      }
    }
  }, {
    key: 'openOptions',
    value: function openOptions() {
      this.toggleOptions(null, true);
    }
  }, {
    key: 'clickOutside',
    value: function clickOutside(e) {
      if (this.select.contains(e.target) || this.options && this.options.wrapper.contains(e.target)) return;
      this.closeOptions(false);
    }
  }, {
    key: 'focusTrigger',
    value: function focusTrigger() {
      this.trigger.button.focus();
    }
  }, {
    key: 'updateScrollPosition',
    value: function updateScrollPosition() {
      var node = this['option-' + this.state.highlighted.value].option;
      var item = {
        node: node,
        top: node.offsetTop,
        bottom: node.offsetTop + node.offsetHeight,
        height: node.offsetHeight,
        index: this.state.options.indexOf(this.state.highlighted)
      };
      var list = {
        node: this.list,
        height: this.list.offsetHeight,
        scroll: this.list.scrollTop,
        scrollHeight: this.list.scrollHeight
      };
      if (item.index === this.state.options.length - 1) {
        list.node.scrollTop = list.scrollHeight;
      } else if (item.bottom - list.scroll > list.height) {
        list.node.scrollTop = item.top - (list.height - item.height);
      } else if (item.top < list.scroll) {
        list.node.scrollTop = item.top;
      }
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(e) {
      var _state = this.state,
          isOpen = _state.isOpen,
          highlighted = _state.highlighted,
          options = _state.options;

      switch (e.which) {
        case 13:
          {
            e.preventDefault();
            break;
          }
        case 27:
          {
            if (isOpen) {
              this.closeOptions();
            }
            break;
          }
        case 38:
          {
            if (!isOpen) {
              this.openOptions();
            } else if (options.length > 0) {
              var currentIndex = options.map(function (opt) {
                return opt.value;
              }).indexOf(highlighted.value);
              var nextIndex = currentIndex === 0 ? options.length - 1 : currentIndex - 1;
              this.setState({
                highlighted: options[nextIndex]
              }, this.updateScrollPosition);
            }
            break;
          }
        case 40:
          {
            if (!isOpen) {
              this.openOptions();
            } else if (options.length > 0) {
              var _currentIndex = options.map(function (opt) {
                return opt.value;
              }).indexOf(highlighted.value);
              var _nextIndex = _currentIndex === options.length - 1 ? 0 : _currentIndex + 1;
              this.setState({
                highlighted: options[_nextIndex]
              }, this.updateScrollPosition);
            }
            break;
          }
      }
    }
  }, {
    key: 'onKeyUp',
    value: function onKeyUp(e) {
      var _props = this.props,
          multi = _props.multi,
          options = _props.options,
          onChange = _props.onChange;
      var _state2 = this.state,
          isOpen = _state2.isOpen,
          highlighted = _state2.highlighted;

      var changeFunction = multi ? this.multiOnChange : onChange;
      switch (e.which) {
        case 13:
          {
            if (!isOpen) {
              return false;
            } else if (this.state.options) {
              this.setState({
                options: options,
                searchTerm: ''
              });
              changeFunction(this.state.highlighted);
            }
          }
      }
    }
  }, {
    key: 'onFocus',
    value: function onFocus() {
      this.setState({ isFocused: true });
    }
  }, {
    key: 'onBlur',
    value: function onBlur() {
      var _this2 = this;

      this.setState({ isFocused: false }, function () {
        var focused = document.activeElement;
        if (!_this2.search || _this2.search && focused !== _this2.search.input && focused !== _this2.trigger.button) {
          _this2.closeOptions(false);
        }
      });
    }
  }, {
    key: 'onSearch',
    value: function onSearch(_ref) {
      var target = _ref.target;
      var _props2 = this.props,
          onSearch = _props2.onSearch,
          options = _props2.options,
          multi = _props2.multi,
          value = _props2.value;

      if (onSearch) {
        clearTimeout(this.ajaxTimer);
        this.setState({
          searchTerm: target.value,
          options: [],
          loading: true,
          displayNoResults: false
        });
        this.ajaxTimer = setTimeout(function () {
          onSearch(target.value);
        }, 500);
        return false;
      }
      var newOptions = options;
      if (multi && value) {
        newOptions = options.filter(function (opt) {
          return value.findIndex(function (val) {
            return val.value === opt.value;
          }) < 0;
        });
      }
      newOptions = newOptions.filter(function (_ref2) {
        var label = _ref2.label;
        return label.toLowerCase().includes(target.value.toLowerCase());
      });
      this.setState({
        searchTerm: target.value,
        options: newOptions,
        highlight: newOptions[0],
        displayNoResults: true
      });
    }
  }, {
    key: 'multiOnChange',
    value: function multiOnChange(value) {
      var remove = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var onChange = this.props.onChange;

      var currentValue = this.props.value || [];
      if (!value) {
        onChange(null);
        return false;
      }
      if (remove) {
        var newValue = currentValue.filter(function (item) {
          return item.value !== value.value;
        });
        if (newValue.length < 1) {
          onChange(null);
          return false;
        }
        onChange(newValue);
      } else {
        var options = this.state.options;

        currentValue.push(value);
        if (options.length > 1) {
          var index = options.findIndex(function (opt) {
            return opt.value === value.value;
          });
          var newHighlight = options[index + 1];
          this.setState({ highlighted: newHighlight }, function () {
            onChange(currentValue.slice(0));
          });
        } else {
          onChange(currentValue.slice(0));
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props3 = this.props,
          placeholder = _props3.placeholder,
          multi = _props3.multi,
          clearable = _props3.clearable,
          searchable = _props3.searchable;
      var _state3 = this.state,
          isOpen = _state3.isOpen,
          isFocused = _state3.isFocused,
          value = _state3.value,
          highlighted = _state3.highlighted,
          options = _state3.options,
          searchTerm = _state3.searchTerm,
          loading = _state3.loading,
          displayNoResults = _state3.displayNoResults;

      var onChange = multi ? this.multiOnChange : this.props.onChange;

      var triggerProps = {
        onChange: multi ? onChange : null,
        onMouseDown: this.toggleOptions,
        onKeyDown: this.onKeyDown,
        onKeyUp: this.onKeyUp,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        value: value,
        placeholder: placeholder,
        ref: function ref(node) {
          _this3.trigger = node;
        }
      };

      var Trigger = multi ? _SelectMultiTrigger2.default : _SelectTrigger2.default;

      var searchProps = {
        onChange: this.onSearch,
        onKeyDown: this.onKeyDown,
        onKeyUp: this.onKeyUp,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        value: searchTerm
      };

      var classes = ['selectron'];
      if (isOpen) classes.push('is-open');
      if (isFocused) classes.push('is-focused');
      if (clearable) classes.push('is-clearable');
      if (multi) classes.push('multiple');
      if (value) classes.push('is-filled');

      return _react2.default.createElement(
        'div',
        { className: classes.join(' selectron--'), ref: function ref(node) {
            _this3.select = node;
          } },
        _react2.default.createElement(Trigger, triggerProps),
        value && clearable && !loading && _react2.default.createElement(
          'button',
          { type: 'button', className: 'selectron__clear',
            onMouseDown: function onMouseDown(e) {
              e.preventDefault();
              onChange(null);
            } },
          'Clear'
        ),
        loading && _react2.default.createElement('div', { className: 'selectron__spinner' }),
        isOpen && _react2.default.createElement(
          _options2.default,
          { select: this.select, ref: function ref(node) {
              _this3.options = node;
            }, onMount: this.updateScrollPosition },
          searchable && _react2.default.createElement(_Search2.default, _extends({}, searchProps, { ref: function ref(node) {
              _this3.search = node;
            } })),
          _react2.default.createElement(
            'ul',
            { className: 'selectron__list', ref: function ref(node) {
                _this3.list = node;
              } },
            options.length < 1 && displayNoResults && _react2.default.createElement(
              'li',
              { className: 'selectron__option selectron__option--empty' },
              loading ? "Loading..." : "No results"
            ),
            options.map(function (option) {
              var isSelected = value ? option.value === value.value : false;
              var isHighlighted = option.value === highlighted.value;
              return _react2.default.createElement(_option2.default, { key: option.value, option: option, term: _this3.state.searchTerm, onSelect: onChange, highlighted: isHighlighted, selected: isSelected, onMouseEnter: function onMouseEnter() {
                  _this3.setState({ highlighted: option });
                }, ref: function ref(node) {
                  _this3['option-' + option.value] = node;
                } });
            })
          )
        )
      );
    }
  }]);

  return Select;
}(_react2.default.Component);

exports.default = Select;