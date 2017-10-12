'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _components = require('./components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = function (_React$PureComponent) {
  _inherits(Button, _React$PureComponent);

  function Button() {
    _classCallCheck(this, Button);

    return _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).apply(this, arguments));
  }

  _createClass(Button, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _components.Row,
        null,
        _react2.default.createElement(_components.Label, null),
        _react2.default.createElement(
          _components.Control,
          null,
          _react2.default.createElement(
            'div',
            {
              onClick: this.handleClick.bind(this),
              style: {
                backgroundColor: this.context.style.lowlight,
                color: this.context.style.highlight,
                font: this.context.style.font,
                padding: this.context.style.paddingY + 'px ' + this.context.style.paddingX + 'px',
                textAlign: 'center',
                cursor: 'pointer',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none',
                userSelect: 'none'
              }
            },
            this.props.label
          )
        )
      );
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      if (this.props.onClick) {
        this.props.onClick();
      }
    }
  }]);

  return Button;
}(_react2.default.PureComponent);

exports.default = Button;


Button.propTypes = {
  label: _propTypes2.default.string.isRequired,
  onClick: _propTypes2.default.func
};

Button.contextTypes = {
  style: _propTypes2.default.object
};