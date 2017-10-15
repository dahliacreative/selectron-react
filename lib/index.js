'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Selectron = function (_React$Component) {
  _inherits(Selectron, _React$Component);

  function Selectron() {
    _classCallCheck(this, Selectron);

    return _possibleConstructorReturn(this, (Selectron.__proto__ || Object.getPrototypeOf(Selectron)).apply(this, arguments));
  }

  _createClass(Selectron, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_Select2.default, this.props);
    }
  }]);

  return Selectron;
}(_react2.default.Component);

Selectron.propTypes = {
  options: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
    label: _propTypes2.default.string
  })),
  value: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.shape({
    value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
    label: _propTypes2.default.string
  })), _propTypes2.default.shape({
    value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
    label: _propTypes2.default.string
  })]),
  onChange: _propTypes2.default.func,
  onSearch: _propTypes2.default.func,
  clearable: _propTypes2.default.bool,
  multi: _propTypes2.default.bool,
  placeholder: _propTypes2.default.string,
  required: _propTypes2.default.bool,
  searchable: _propTypes2.default.bool
};

Selectron.defaultProps = {
  clearable: true,
  multi: false,
  placeholder: 'Please select...',
  required: false,
  searchable: true
};

exports.default = Selectron;