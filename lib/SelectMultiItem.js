'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectMultiItem = function (_React$Component) {
  _inherits(SelectMultiItem, _React$Component);

  function SelectMultiItem(props) {
    _classCallCheck(this, SelectMultiItem);

    var _this = _possibleConstructorReturn(this, (SelectMultiItem.__proto__ || Object.getPrototypeOf(SelectMultiItem)).call(this, props));

    var methods = ['removeItem'].forEach(function (fn) {
      return _this[fn] = _this[fn].bind(_this);
    });
    return _this;
  }

  _createClass(SelectMultiItem, [{
    key: 'removeItem',
    value: function removeItem(e) {
      e.stopPropagation();
      e.preventDefault();
      this.props.onChange(this.props.item, true);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'selectron__item' },
        _react2.default.createElement(
          'button',
          { type: 'button', className: 'selectron__item-remove', onMouseDown: this.removeItem },
          'x'
        ),
        _react2.default.createElement(
          'span',
          { className: 'selectron__item-copy' },
          this.props.item.label
        )
      );
    }
  }]);

  return SelectMultiItem;
}(_react2.default.Component);

exports.default = SelectMultiItem;