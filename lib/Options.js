'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Options = function (_React$Component) {
  _inherits(Options, _React$Component);

  function Options(props) {
    _classCallCheck(this, Options);

    var _this = _possibleConstructorReturn(this, (Options.__proto__ || Object.getPrototypeOf(Options)).call(this, props));

    _this.state = {
      firstRender: true
    };
    _this.checkOverflow = _this.checkOverflow.bind(_this);
    return _this;
  }

  _createClass(Options, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.options = document.createElement('div');
      document.body.appendChild(this.options);
      this.renderOptions(this.props);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _reactDom2.default.unmountComponentAtNode(this.options);
      document.body.removeChild(this.options);
      window.removeEventListener('scroll', this.checkOverflow);
      this.props.toggleOverflow(false);
    }
  }, {
    key: 'checkOverflow',
    value: function checkOverflow() {
      var docBottom = window.pageYOffset + window.innerHeight;
      this.props.toggleOverflow(this.state.optionsBottom > docBottom);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      setTimeout(function () {
        _this2.renderOptions(nextProps);
        if (nextProps.updateScroll) {
          _this2.props.onMount();
        }
      }, 0);
    }
  }, {
    key: 'renderOptions',
    value: function renderOptions(props) {
      var _this3 = this;

      var select = props.select,
          isOverflowing = props.isOverflowing;

      var style = {
        position: 'absolute',
        left: select.offsetLeft,
        width: select.clientWidth,
        opacity: this.state.firstRender ? 0 : 1
      };
      if (isOverflowing) {
        style.bottom = window.innerHeight - select.offsetTop;
      } else {
        style.top = select.offsetTop + select.offsetHeight;
      }
      var classes = ['selectron__options'];
      if (isOverflowing) classes.push('is-overflowing');
      var classNames = classes.join(' selectron__options--');
      _reactDom2.default.render(_react2.default.createElement(
        'div',
        { className: classNames, style: style, ref: function ref(node) {
            _this3.wrapper = node;
          } },
        props.children
      ), this.options, function () {
        if (_this3.state.firstRender) {
          var options = _this3.wrapper;
          var optionsBottom = options.offsetTop + options.offsetHeight + 20;
          _this3.setState({
            firstRender: false,
            optionsBottom: optionsBottom
          }, function () {
            _this3.props.onMount();
            _this3.checkOverflow();
            window.addEventListener('scroll', _this3.checkOverflow);
          });
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return Options;
}(_react2.default.Component);

exports.default = Options;