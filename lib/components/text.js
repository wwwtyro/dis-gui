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

var Text = function (_React$PureComponent) {
  _inherits(Text, _React$PureComponent);

  function Text(props) {
    _classCallCheck(this, Text);

    var _this = _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, props));

    _this.state = {
      value: _this.props.value
    };
    return _this;
  }

  _createClass(Text, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _components.Row,
        null,
        _react2.default.createElement(
          _components.Label,
          null,
          this.props.label
        ),
        _react2.default.createElement(
          _components.Control,
          null,
          _react2.default.createElement('input', {
            type: 'text',
            value: this.state.value,
            onChange: this.handleChange.bind(this),
            onBlur: this.onBlur.bind(this),
            onKeyDown: this.onKeyDown.bind(this),
            style: {
              color: this.context.style.highlight,
              font: this.context.style.font,
              backgroundColor: this.context.style.lowlight,
              padding: this.context.style.paddingY + 'px ' + this.context.style.paddingX + 'px',
              width: '100%',
              border: 'none',
              outline: 'none'
            } })
        )
      );
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('value' in nextProps) {
        this.setState({
          value: nextProps.value
        });
      }
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(e) {
      if (e.which === 13) {
        if (this.props.onFinishChange) {
          this.props.onFinishChange(e.target.value);
        }
      }
    }
  }, {
    key: 'onBlur',
    value: function onBlur(e) {
      if (this.props.onFinishChange) {
        this.props.onFinishChange(e.target.value);
      }
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e) {
      this.setState({
        value: e.target.value
      });
      if (this.props.onChange) {
        this.props.onChange(e.target.value);
      }
    }
  }]);

  return Text;
}(_react2.default.PureComponent);

exports.default = Text;


Text.propTypes = {
  value: _propTypes2.default.string,
  label: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  onFinishChange: _propTypes2.default.func
};

Text.contextTypes = {
  style: _propTypes2.default.object
};