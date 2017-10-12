'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _number = require('./number.js');

var _number2 = _interopRequireDefault(_number);

var _range = require('./range.js');

var _range2 = _interopRequireDefault(_range);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NumberRange = function (_React$PureComponent) {
  _inherits(NumberRange, _React$PureComponent);

  function NumberRange(props) {
    _classCallCheck(this, NumberRange);

    var _this = _possibleConstructorReturn(this, (NumberRange.__proto__ || Object.getPrototypeOf(NumberRange)).call(this, props));

    _this.state = {
      value: _this.props.value
    };
    return _this;
  }

  _createClass(NumberRange, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        {
          style: {
            width: this.props.width,
            display: 'flex',
            flexFlow: 'row wrap',
            alignItems: 'center',
            justifyContent: 'space-between'
          }
        },
        _react2.default.createElement(_range2.default, {
          value: this.state.value,
          min: this.props.min,
          max: this.props.max,
          step: this.props.step,
          width: this.props.rangeWidth,
          onChange: this.handleChange.bind(this),
          onFinishChange: this.handleFinishChange.bind(this)
        }),
        _react2.default.createElement(_number2.default, {
          decimals: this.props.decimals,
          value: this.state.value,
          width: this.props.numberWidth,
          onChange: this.handleChange.bind(this),
          onFinishChange: this.handleFinishChange.bind(this)
        })
      );
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        value: nextProps.value
      });
    }
  }, {
    key: 'handleChange',
    value: function handleChange(value) {
      value = Math.min(this.props.max, Math.max(this.props.min, value));
      this.setState({
        value: value
      }, function () {
        if (this.props.onChange) {
          this.props.onChange(this.state.value);
        }
      });
    }
  }, {
    key: 'handleFinishChange',
    value: function handleFinishChange(value) {
      value = Math.min(this.props.max, Math.max(this.props.min, value));
      this.setState({
        value: value
      }, function () {
        if (this.props.onFinishChange) {
          this.props.onFinishChange(this.state.value);
        }
      });
    }
  }]);

  return NumberRange;
}(_react2.default.PureComponent);

exports.default = NumberRange;


NumberRange.propTypes = {
  value: _propTypes2.default.number.isRequired,
  min: _propTypes2.default.number.isRequired,
  max: _propTypes2.default.number.isRequired,
  step: _propTypes2.default.number,
  width: _propTypes2.default.string,
  rangeWidth: _propTypes2.default.string,
  numberWidth: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  OnFinishChange: _propTypes2.default.func
};

NumberRange.defaultProps = {
  rangeWidth: '65%',
  numberWidth: '30%',
  width: '100%'
};