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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Color = function (_React$PureComponent) {
  _inherits(Color, _React$PureComponent);

  function Color(props) {
    _classCallCheck(this, Color);

    var _this = _possibleConstructorReturn(this, (Color.__proto__ || Object.getPrototypeOf(Color)).call(this, props));

    _this.state = {
      red: _this.props.red,
      green: _this.props.green,
      blue: _this.props.blue,
      expanded: _this.props.expanded
    };
    return _this;
  }

  _createClass(Color, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var nextState = {};
      var hasChange = false;
      if (nextProps.red !== this.props.red) {
        if (nextProps.red !== this.state.red) {
          nextState.red = nextProps.red;
          hasChange = true;
        }
      }
      if (nextProps.green !== this.props.green) {
        if (nextProps.green !== this.state.green) {
          nextState.green = nextProps.green;
          hasChange = true;
        }
      }
      if (nextProps.blue !== this.props.blue) {
        if (nextProps.blue !== this.state.blue) {
          nextState.blue = nextProps.blue;
          hasChange = true;
        }
      }
      if (nextProps.expanded !== this.props.expanded) {
        if (nextProps.expanded !== this.state.expanded) {
          nextState.expanded = nextProps.expanded;
          hasChange = true;
        }
      }
      if (hasChange) {
        this.setState(nextState);
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
            'div',
            {
              onClick: this.handleColorClick.bind(this),
              style: _defineProperty({
                font: this.context.style.font,
                backgroundColor: 'rgb(' + this.state.red + ', ' + this.state.green + ', ' + this.state.blue + ')',
                height: this.context.style.computed.itemHeight + 'px',
                lineHeight: this.context.style.computed.itemHeight + 'px',
                width: '100%',
                textAlign: 'center',
                color: 'white',
                fontWeight: 'bold',
                textShadow: 'black 0 0 4px, black 0 0 4px, black 0 0 4px, black 0 0 4px, black 0 0 4px',
                cursor: 'default',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none',
                userSelect: 'none'
              }, 'cursor', 'pointer')
            },
            this.state.red,
            ', ',
            this.state.green,
            ', ',
            this.state.blue
          ),
          this.state.expanded && _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_components.ColorRange, {
              label: 'Red',
              value: this.state.red,
              onChange: this.handleChangeRed.bind(this),
              onFinishChange: this.handleFinishChange.bind(this)
            }),
            _react2.default.createElement(_components.ColorRange, {
              label: 'Green',
              value: this.state.green,
              onChange: this.handleChangeGreen.bind(this),
              onFinishChange: this.handleFinishChange.bind(this)
            }),
            _react2.default.createElement(_components.ColorRange, {
              label: 'Blue',
              value: this.state.blue,
              onChange: this.handleChangeBlue.bind(this),
              onFinishChange: this.handleFinishChange.bind(this)
            })
          )
        )
      );
    }
  }, {
    key: 'handleColorClick',
    value: function handleColorClick(e) {
      this.setState({
        expanded: !this.state.expanded
      });
    }
  }, {
    key: 'handleChangeRed',
    value: function handleChangeRed(value) {
      this.setState({
        red: value
      }, this.handleChange);
    }
  }, {
    key: 'handleChangeGreen',
    value: function handleChangeGreen(value) {
      this.setState({
        green: value
      }, this.handleChange);
    }
  }, {
    key: 'handleChangeBlue',
    value: function handleChangeBlue(value) {
      this.setState({
        blue: value
      }, this.handleChange);
    }
  }, {
    key: 'handleChange',
    value: function handleChange() {
      if (this.props.onChange) {
        this.props.onChange({
          red: this.state.red,
          green: this.state.green,
          blue: this.state.blue
        });
      }
    }
  }, {
    key: 'handleFinishChange',
    value: function handleFinishChange() {
      var _this2 = this;

      if (this.props.onFinishChange) {
        setTimeout(function () {
          _this2.props.onFinishChange({
            red: _this2.state.red,
            green: _this2.state.green,
            blue: _this2.state.blue
          });
        }, 0);
      }
    }
  }]);

  return Color;
}(_react2.default.PureComponent);

exports.default = Color;


Color.propTypes = {
  red: _propTypes2.default.number,
  green: _propTypes2.default.number,
  blue: _propTypes2.default.number,
  expanded: _propTypes2.default.bool,
  label: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  onFinishChange: _propTypes2.default.func
};

Color.defaultProps = {
  red: 0,
  green: 0,
  blue: 0,
  expanded: false
};

Color.contextTypes = {
  style: _propTypes2.default.object
};