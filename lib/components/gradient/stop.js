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

var Stop = function (_React$PureComponent) {
  _inherits(Stop, _React$PureComponent);

  function Stop() {
    _classCallCheck(this, Stop);

    return _possibleConstructorReturn(this, (Stop.__proto__ || Object.getPrototypeOf(Stop)).apply(this, arguments));
  }

  _createClass(Stop, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var selectScale = this.props.selected ? 1.25 : 1;
      var s = this.context.style.computed.fontHeight / 58 * selectScale;
      var border = this.context.style.label.fontColor;
      return _react2.default.createElement(
        'svg',
        {
          ref: function ref(_ref) {
            return _this2.stopRef = _ref;
          },
          width: 58 * s + 'px',
          height: 87 * s + 'px',
          onMouseDown: this.handleMouseDown.bind(this),
          style: {
            left: this.props.stop * this.context.style.controlWidth - selectScale * this.context.style.computed.fontHeight / 2 + 'px',
            position: 'absolute',
            cursor: 'pointer'
          }
        },
        _react2.default.createElement(
          'g',
          { transform: 'scale(' + s + ')' },
          _react2.default.createElement(
            'g',
            { transform: 'translate(4, 9)' },
            _react2.default.createElement('path', {
              d: 'M0 25 L0 75 L50 75 L50 25 L25 0 Z',
              fill: 'rgb(' + this.props.red + ', ' + this.props.green + ', ' + this.props.blue + ')',
              stroke: border,
              strokeWidth: '4'
            })
          )
        )
      );
    }
  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown(e) {
      e.preventDefault();
      var field = this.stopRef.parentNode;
      var fieldRect = field.getBoundingClientRect();
      var onMouseMove = function (e) {
        var x = e.pageX - fieldRect.left;
        var stop = x / fieldRect.width;
        stop = Math.max(0, Math.min(1, stop));
        this.props.onChange({
          index: this.props.index,
          stop: stop
        });
      }.bind(this);
      var onMouseUp = function () {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
        this.props.onFinishChange();
      }.bind(this);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      this.props.onClick({
        index: this.props.index
      });
    }
  }]);

  return Stop;
}(_react2.default.PureComponent);

exports.default = Stop;


Stop.propTypes = {
  selected: _propTypes2.default.bool,
  stop: _propTypes2.default.number,
  red: _propTypes2.default.number,
  green: _propTypes2.default.number,
  blue: _propTypes2.default.number,
  index: _propTypes2.default.number.isRequired,
  onChange: _propTypes2.default.func,
  OnFinishChange: _propTypes2.default.func,
  onClick: _propTypes2.default.func
};

Stop.defaultProps = {
  selected: false,
  stop: 0,
  red: 0,
  green: 0,
  blue: 0
};

Stop.contextTypes = {
  style: _propTypes2.default.object
};