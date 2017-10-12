'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _numberRange = require('./number-range.js');

var _numberRange2 = _interopRequireDefault(_numberRange);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ColorRange = function (_React$PureComponent) {
  _inherits(ColorRange, _React$PureComponent);

  function ColorRange() {
    _classCallCheck(this, ColorRange);

    return _possibleConstructorReturn(this, (ColorRange.__proto__ || Object.getPrototypeOf(ColorRange)).apply(this, arguments));
  }

  _createClass(ColorRange, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        {
          style: {
            padding: this.context.style.paddingY + 'px 0px',
            paddingBottom: '0px',
            display: 'flex',
            flexFlow: 'row wrap',
            alignItems: 'center',
            width: '100%'
          }
        },
        _react2.default.createElement(
          'span',
          {
            style: {
              font: this.context.style.font,
              color: this.context.style.highlight,
              width: '20%',
              display: 'inline-block',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none',
              userSelect: 'none'
            }
          },
          this.props.label
        ),
        _react2.default.createElement(_numberRange2.default, {
          width: '80%',
          min: 0,
          max: 255,
          step: 1,
          value: this.props.value,
          onChange: this.handleChange.bind(this),
          onFinishChange: this.handleFinishChange.bind(this)
        })
      );
    }
  }, {
    key: 'handleFinishChange',
    value: function handleFinishChange(value) {
      if (this.props.onFinishChange) {
        this.props.onFinishChange(value);
      }
    }
  }, {
    key: 'handleChange',
    value: function handleChange(value) {
      if (this.props.onChange) {
        this.props.onChange(value);
      }
    }
  }]);

  return ColorRange;
}(_react2.default.PureComponent);

exports.default = ColorRange;


ColorRange.propTypes = {
  label: _propTypes2.default.string,
  value: _propTypes2.default.number.isRequired,
  onChange: _propTypes2.default.func,
  onFinishChange: _propTypes2.default.func
};

ColorRange.contextTypes = {
  style: _propTypes2.default.object
};