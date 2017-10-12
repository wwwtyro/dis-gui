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

var Checkbox = function (_React$PureComponent) {
  _inherits(Checkbox, _React$PureComponent);

  function Checkbox(props) {
    _classCallCheck(this, Checkbox);

    var _this = _possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).call(this, props));

    _this.state = {
      checked: _this.props.checked
    };
    return _this;
  }

  _createClass(Checkbox, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.checked !== this.props.checked) {
        if (nextProps.checked !== this.state.checked) {
          this.setState({ checked: nextProps.checked });
        }
      }
    }
  }, {
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
          _react2.default.createElement(
            'svg',
            {
              width: '' + this.context.style.computed.fontHeight,
              height: '' + this.context.style.computed.fontHeight,
              onClick: this.handleClick.bind(this),
              style: {
                cursor: 'pointer'
              }
            },
            _react2.default.createElement(
              'g',
              { transform: 'scale(' + this.context.style.computed.fontHeight / 100 + ')' },
              _react2.default.createElement('rect', { className: 'shape', x: '0', y: '0', width: '100', height: '100', fill: this.context.style.lowlight }),
              this.state.checked && _react2.default.createElement('path', {
                transform: 'translate(18.75 50)',
                d: 'M0 0 L25 25 L62.5 -32.5',
                stroke: this.context.style.highlight,
                strokeWidth: '15',
                fill: 'none'
              })
            )
          )
        )
      );
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      this.setState({
        checked: !this.state.checked
      });
      if (this.props.onChange) {
        this.props.onChange(!this.state.checked);
      }
      if (this.props.onFinishChange) {
        this.props.onFinishChange(!this.state.checked);
      }
    }
  }]);

  return Checkbox;
}(_react2.default.PureComponent);

exports.default = Checkbox;


Checkbox.propTypes = {
  checked: _propTypes2.default.bool,
  label: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  onFinishChange: _propTypes2.default.func
};

Checkbox.defaultProps = {
  checked: false
};

Checkbox.contextTypes = {
  style: _propTypes2.default.object
};