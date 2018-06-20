'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Range = function (_React$PureComponent) {
  _inherits(Range, _React$PureComponent);

  function Range(props) {
    _classCallCheck(this, Range);

    var _this = _possibleConstructorReturn(this, (Range.__proto__ || Object.getPrototypeOf(Range)).call(this, props));

    _this.state = {
      value: _this.props.value
    };

    _this.containerRef = _react2.default.createRef();
    _this.trackRef = _react2.default.createRef();
    _this.thumbRef = _react2.default.createRef();
    return _this;
  }

  _createClass(Range, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        {
          ref: this.containerRef,
          onMouseDown: this.onMouseDown.bind(this),
          style: {
            width: this.props.width,
            height: this.context.style.computed.itemHeight + 'px',
            position: 'relative'
          }
        },
        _react2.default.createElement('div', {
          ref: this.trackRef,
          style: {
            position: 'absolute',
            width: '100%',
            height: '1px',
            left: '0px',
            backgroundColor: this.context.style.lowlight
          }
        }),
        _react2.default.createElement('div', {
          ref: this.thumbRef,
          style: {
            position: 'absolute',
            backgroundColor: this.context.style.lowlight,
            border: '1px solid ' + this.context.style.highlight,
            boxSizing: 'border-box',
            borderRadius: '0px',
            cursor: 'pointer'
          }
        })
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
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.updateLayout();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.updateLayout();
      if (this.context.folder) {
        this.unsubscribeFolder = this.context.folder.subscribe(function (expanded) {
          if (expanded) _this2.forceUpdate();
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.unsubscribeFolder) this.unsubscribeFolder();
    }
  }, {
    key: 'updateLayout',
    value: function updateLayout() {
      var container = this.containerRef.current;
      var cHeight = container.clientHeight;
      var cWidth = container.clientWidth;
      var track = this.trackRef.current;
      track.style.top = cHeight / 2 - 0.5 + 'px';
      var thumb = this.thumbRef.current;
      var thumbSize = this.context.style.computed.fontHeight * 0.9;
      thumb.style.top = this.context.style.computed.itemHeight / 2 - thumbSize / 2 + 'px';
      var frac = (this.state.value - this.props.min) / (this.props.max - this.props.min);
      var left = frac * cWidth - thumbSize / 2;
      left = Math.max(left, 0);
      left = Math.min(left, cWidth - thumbSize);
      thumb.style.left = left + 'px';
      thumb.style.width = thumbSize + 'px';
      thumb.style.height = thumbSize + 'px';
    }
  }, {
    key: 'moveThumb',
    value: function moveThumb(pageX) {
      var container = this.containerRef.current;
      var cWidth = container.clientWidth;
      var thumbSize = this.context.style.computed.fontHeight * 0.9;
      var x = pageX - container.getBoundingClientRect().left;
      var frac = 0;
      if (x < thumbSize / 2) {
        frac = 0;
      } else if (x > cWidth - thumbSize / 2) {
        frac = 1;
      } else {
        frac = (x - thumbSize / 2) / (cWidth - thumbSize);
      }
      var value = frac * (this.props.max - this.props.min) + this.props.min;
      if (this.props.step !== undefined) {
        var stops = [];
        var _x = this.props.min;
        while (_x < this.props.max) {
          stops.push(_x);
          _x += this.props.step;
        }
        stops.push(this.props.max);
        var min = stops[0];
        for (var i = 0; i < stops.length; i++) {
          var stop = stops[i];
          var dmin = Math.abs(min - value);
          var dstop = Math.abs(stop - value);
          if (dstop < dmin) {
            min = stop;
          }
        }
        value = min;
      }
      this.setState({
        value: value
      });
      if (this.props.onChange) {
        this.props.onChange(value);
      }
    }
  }, {
    key: 'onMouseDown',
    value: function onMouseDown(e) {
      e.preventDefault();
      this.moveThumb(e.pageX);
      var onMouseMove = function (e) {
        this.moveThumb(e.pageX);
      }.bind(this);
      var onMouseUp = function () {
        window.removeEventListener('mouseup', onMouseUp);
        window.removeEventListener('mousemove', onMouseMove);
        if (this.props.onFinishChange) {
          this.props.onFinishChange(this.state.value);
        }
      }.bind(this);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }
  }]);

  return Range;
}(_react2.default.PureComponent);

exports.default = Range;


Range.propTypes = {
  value: _propTypes2.default.number.isRequired,
  min: _propTypes2.default.number.isRequired,
  max: _propTypes2.default.number.isRequired,
  step: _propTypes2.default.number,
  width: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  OnFinishChange: _propTypes2.default.func
};

Range.defaultProps = {
  width: '100%'
};

Range.contextTypes = {
  style: _propTypes2.default.object,
  folder: _propTypes2.default.shape({
    subscribe: _propTypes2.default.func
  })
};