"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Option = function (_React$Component) {
  _inherits(Option, _React$Component);

  function Option() {
    _classCallCheck(this, Option);

    return _possibleConstructorReturn(this, (Option.__proto__ || Object.getPrototypeOf(Option)).apply(this, arguments));
  }

  _createClass(Option, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          option = _props.option,
          onSelect = _props.onSelect,
          highlighted = _props.highlighted,
          selected = _props.selected,
          onMouseEnter = _props.onMouseEnter,
          term = _props.term;

      var regex = new RegExp("(" + term + ")", ["gi"]);
      var classes = ['selectron__option'];
      if (highlighted) classes.push('highlighted');
      if (selected) classes.push('selected');
      var classNames = classes.join(' selectron__option--');
      return _react2.default.createElement("li", { className: classNames,
        onMouseDown: function onMouseDown(e) {
          e.preventDefault();
          onSelect(option);
        },
        onMouseEnter: onMouseEnter,
        dangerouslySetInnerHTML: { __html: option.label.replace(regex, '<b>$1</b>') } });
    }
  }]);

  return Option;
}(_react2.default.Component);

exports.default = Option;