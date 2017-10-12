'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _sprintf = require('sprintf');

var _sprintf2 = _interopRequireDefault(_sprintf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Number = function (_React$PureComponent) {
  _inherits(Number, _React$PureComponent);

  function Number(props) {
    _classCallCheck(this, Number);

    var _this = _possibleConstructorReturn(this, (Number.__proto__ || Object.getPrototypeOf(Number)).call(this, props));

    _this.state = {
      invalid: false,
      value: _this.props.value
    };
    return _this;
  }

  _createClass(Number, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement('input', {
        style: {
          width: this.props.width,
          color: this.context.style.highlight,
          font: this.context.style.font,
          padding: this.context.style.paddingY + 'px ' + this.context.style.paddingX + 'px',
          backgroundColor: this.state.invalid ? this.context.style.lowlighterr : this.context.style.lowlight,
          border: 'none',
          outline: 'none'
        },
        type: 'text',
        value: this.state.value,
        onChange: this.onChange.bind(this),
        onKeyDown: this.onKeyDown.bind(this),
        onBlur: this.onBlur.bind(this)
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        invalid: !this.isNumber(nextProps.value),
        value: this.truncate(nextProps.value)
      });
    }
  }, {
    key: 'truncate',
    value: function truncate(value) {
      if (this.props.decimals !== undefined) {
        return (0, _sprintf2.default)('%.' + this.props.decimals + 'f', parseFloat(value));
      }
      return value;
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(e) {
      if (e.which === 13) {
        this.handleChange(this.truncate(e.target.value));
      }
    }
  }, {
    key: 'onBlur',
    value: function onBlur(e) {
      this.handleChange(this.truncate(e.target.value));
    }
  }, {
    key: 'isNumber',
    value: function isNumber(value) {
      return !isNaN(value) && value !== '';
    }
  }, {
    key: 'onChange',
    value: function onChange(e) {
      if (!this.isNumber(e.target.value)) {
        this.setState({
          invalid: true,
          value: e.target.value
        });
        return;
      }
      this.setState({
        invalid: false,
        value: e.target.value
      });
    }
  }, {
    key: 'handleChange',
    value: function handleChange(value) {
      if (!this.state.invalid && this.props.onChange) {
        this.props.onChange(parseFloat(value));
      }
      if (!this.state.invalid && this.props.onFinishChange) {
        this.props.onFinishChange(parseFloat(value));
      }
    }
  }]);

  return Number;
}(_react2.default.PureComponent);

exports.default = Number;


Number.propTypes = {
  value: _propTypes2.default.number.isRequired,
  width: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  OnFinishChange: _propTypes2.default.func
};

Number.defaultProps = {
  width: '100%'
};

Number.contextTypes = {
  style: _propTypes2.default.object
};