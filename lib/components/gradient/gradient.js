'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutabilityHelper = require('immutability-helper');

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

var _components = require('../components');

var _stop = require('./stop.js');

var _stop2 = _interopRequireDefault(_stop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Gradient = function (_React$PureComponent) {
  _inherits(Gradient, _React$PureComponent);

  function Gradient(props) {
    _classCallCheck(this, Gradient);

    var _this = _possibleConstructorReturn(this, (Gradient.__proto__ || Object.getPrototypeOf(Gradient)).call(this, props));

    _this.state = {
      expanded: _this.props.expanded,
      stops: _this.props.stops,
      selectedStop: 0
    };
    return _this;
  }

  _createClass(Gradient, [{
    key: 'render',
    value: function render() {
      var stopSide = this.context.style.computed.fontHeight;
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
          _react2.default.createElement('canvas', {
            ref: 'canvas',
            onClick: this.handleCanvasClick.bind(this),
            style: {
              width: this.context.style.controlWidth + 'px',
              position: 'relative',
              height: this.context.style.computed.itemHeight + 'px',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none',
              userSelect: 'none',
              cursor: 'pointer'
            }
          }),
          this.state.expanded && _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'div',
              {
                ref: 'stopfield',
                onMouseDown: this.handleStopFieldMouseDown.bind(this),
                style: {
                  width: this.context.style.controlWidth + 'px',
                  height: stopSide * 1.875 + 'px',
                  boxSizing: 'border-box',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer'
                }
              },
              this.state.stops.map(function (stop, index) {
                return _react2.default.createElement(_stop2.default, {
                  key: 'stop' + index,
                  index: index,
                  stop: stop.stop,
                  red: stop.red,
                  green: stop.green,
                  blue: stop.blue,
                  selected: index === this.state.selectedStop,
                  onClick: this.handleStopClick.bind(this),
                  onChange: this.handleStopChange.bind(this),
                  onFinishChange: this.handleFinishChange.bind(this)
                });
              }.bind(this))
            ),
            _react2.default.createElement(_components.ColorRange, {
              label: 'Red',
              value: this.state.stops[this.state.selectedStop].red,
              onChange: this.handleChangeRed.bind(this),
              onFinishChange: this.handleFinishChange.bind(this)
            }),
            _react2.default.createElement(_components.ColorRange, {
              label: 'Green',
              value: this.state.stops[this.state.selectedStop].green,
              onChange: this.handleChangeGreen.bind(this),
              onFinishChange: this.handleFinishChange.bind(this)
            }),
            _react2.default.createElement(_components.ColorRange, {
              label: 'Blue',
              value: this.state.stops[this.state.selectedStop].blue,
              onChange: this.handleChangeBlue.bind(this),
              onFinishChange: this.handleFinishChange.bind(this)
            }),
            this.state.stops.length > 1 && _react2.default.createElement(
              'div',
              {
                onClick: this.handleRemoveStop.bind(this),
                style: {
                  backgroundColor: this.context.style.lowlight,
                  color: this.context.style.highlight,
                  font: this.context.style.font,
                  padding: this.context.style.paddingY + 'px 0px',
                  marginTop: this.context.style.paddingY + 'px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  width: '100%',
                  WebkitUserSelect: 'none',
                  MozUserSelect: 'none',
                  msUserSelect: 'none',
                  userSelect: 'none'
                }
              },
              'Remove Stop'
            )
          )
        )
      );
    }
  }, {
    key: 'handleStopFieldMouseDown',
    value: function handleStopFieldMouseDown(e) {
      var _this2 = this;

      if (e.target !== this.refs.stopfield) return;
      var stops = this.state.stops.slice();
      var rect = e.target.getBoundingClientRect();
      var stop = (e.pageX - rect.left) / rect.width;
      var c = this.getGradientValue(this.getCleanStops(), stop);
      stops.push({
        stop: stop,
        red: c.red,
        green: c.green,
        blue: c.blue
      });
      var newState = (0, _immutabilityHelper2.default)(this.state, {
        $set: {
          stops: stops,
          selectedStop: stops.length - 1
        }
      });
      this.setState(newState, function () {
        _this2.handleChange();
        _this2.handleFinishChange();
      });
    }
  }, {
    key: 'handleRemoveStop',
    value: function handleRemoveStop() {
      var _this3 = this;

      var stops = this.state.stops.slice();
      stops.splice(this.state.selectedStop, 1);
      var newState = (0, _immutabilityHelper2.default)(this.state, {
        $set: {
          stops: stops,
          selectedStop: 0
        }
      });
      this.setState(newState, function () {
        _this3.handleChange();
        _this3.handleFinishChange();
      });
    }
  }, {
    key: 'handleChangeRed',
    value: function handleChangeRed(value) {
      var stops = this.state.stops.slice();
      stops[this.state.selectedStop].red = parseInt(value);
      var newState = (0, _immutabilityHelper2.default)(this.state, {
        $set: {
          stops: stops
        }
      });
      this.setState(newState, this.handleChange);
    }
  }, {
    key: 'handleChangeGreen',
    value: function handleChangeGreen(value) {
      var stops = this.state.stops.slice();
      stops[this.state.selectedStop].green = parseInt(value);
      var newState = (0, _immutabilityHelper2.default)(this.state, {
        $set: {
          stops: stops
        }
      });
      this.setState(newState, this.handleChange);
    }
  }, {
    key: 'handleChangeBlue',
    value: function handleChangeBlue(value) {
      var stops = this.state.stops.slice();
      stops[this.state.selectedStop].blue = parseInt(value);
      var newState = (0, _immutabilityHelper2.default)(this.state, {
        $set: {
          stops: stops
        }
      });
      this.setState(newState, this.handleChange);
    }
  }, {
    key: 'handleChange',
    value: function handleChange() {
      if (this.props.onChange) {
        this.props.onChange(this.getCleanStops());
      }
    }
  }, {
    key: 'handleFinishChange',
    value: function handleFinishChange() {
      if (this.props.onFinishChange) {
        this.props.onFinishChange(this.getCleanStops());
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateCanvas();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.updateCanvas();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this4 = this;

      var newState = (0, _immutabilityHelper2.default)(this.state, {
        $set: {
          stops: nextProps.stops
        }
      });
      this.setState(newState, function () {
        _this4.handleChange();
        _this4.handleFinishChange();
      });
    }
  }, {
    key: 'handleCanvasClick',
    value: function handleCanvasClick() {
      this.setState({
        expanded: !this.state.expanded
      });
    }
  }, {
    key: 'handleStopChange',
    value: function handleStopChange(e) {
      var stops = this.state.stops.slice();
      stops[e.index].stop = e.stop;
      var newState = (0, _immutabilityHelper2.default)(this.state, {
        $set: {
          stops: stops
        }
      });
      this.setState(newState, this.handleChange);
    }
  }, {
    key: 'handleStopClick',
    value: function handleStopClick(e) {
      this.setState({
        selectedStop: e.index
      });
    }
  }, {
    key: 'getCleanStops',
    value: function getCleanStops() {
      // Returns this.state.stops, bounded to [0..1] and sorted.
      var stops = this.state.stops.slice();
      stops.sort(function (a, b) {
        return a.stop - b.stop;
      });
      if (stops[0].stop > 0) {
        stops.unshift({
          stop: 0,
          red: stops[0].red,
          green: stops[0].green,
          blue: stops[0].blue
        });
      }
      var lastStop = stops[stops.length - 1];
      if (lastStop.stop < 1) {
        stops.push({
          stop: 1,
          red: lastStop.red,
          green: lastStop.green,
          blue: lastStop.blue
        });
      }
      return stops;
    }
  }, {
    key: 'getGradientValue',
    value: function getGradientValue(cleanStops, frac) {
      for (var i = 0; i < cleanStops.length - 1; i++) {
        if (frac >= cleanStops[i].stop && frac <= cleanStops[i + 1].stop) {
          var left = cleanStops[i];
          var right = cleanStops[i + 1];
          var ifrac = (frac - left.stop) / (right.stop - left.stop);
          return {
            red: Math.round(left.red + ifrac * (right.red - left.red)),
            green: Math.round(left.green + ifrac * (right.green - left.green)),
            blue: Math.round(left.blue + ifrac * (right.blue - left.blue))
          };
        }
      }
      throw 'Error calculating gradient value.';
    }
  }, {
    key: 'updateCanvas',
    value: function updateCanvas() {
      var stops = this.getCleanStops();
      var canvas = this.refs.canvas;
      canvas.width = 512;
      canvas.height = 1;
      var ctx = canvas.getContext('2d');
      for (var x = 0; x < canvas.width; x++) {
        var frac = x / (canvas.width - 1);
        var c = this.getGradientValue(stops, frac);
        ctx.fillStyle = 'rgb(' + c.red + ', ' + c.green + ', ' + c.blue + ')';
        ctx.fillRect(x, 0, 1, 1);
      }
    }
  }]);

  return Gradient;
}(_react2.default.PureComponent);

exports.default = Gradient;


Gradient.propTypes = {
  expanded: _propTypes2.default.bool,
  stops: _propTypes2.default.array,
  label: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  onFinishChange: _propTypes2.default.func
};

Gradient.defaultProps = {
  expanded: false,
  stops: [{ red: 255, green: 0, blue: 0, stop: 0.125 }, { red: 255, green: 255, blue: 0, stop: 0.5 }, { red: 255, green: 255, blue: 255, stop: 0.875 }]
};

Gradient.contextTypes = {
  style: _propTypes2.default.object
};