'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

var _components = require('./components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultStyle = {
  labelWidth: 96,
  controlWidth: 192,
  paddingY: 3,
  paddingX: 3,
  highlight: '#0FA',
  lowlight: '#444',
  lowlighterr: '#822',
  font: '11px Arial',
  backgroundColor: '#1A1A1A',
  separator: '1px solid #333',
  label: {
    fontColor: '#FFF',
    fontWeight: 'normal'
  }
};

var GUI = function (_React$PureComponent) {
  _inherits(GUI, _React$PureComponent);

  function GUI(props) {
    _classCallCheck(this, GUI);

    var _this = _possibleConstructorReturn(this, (GUI.__proto__ || Object.getPrototypeOf(GUI)).call(this, props));

    _this.style = (0, _lodash2.default)(JSON.parse(JSON.stringify(defaultStyle)), _this.props.style);
    _this.style.computed = {};
    _this.style.computed.fontHeight = calculateFontHeight(_this.style.font);
    _this.style.computed.itemHeight = _this.style.computed.fontHeight + _this.style.paddingY * 2;
    _this.style.computed.minRowHeight = _this.style.computed.itemHeight + _this.style.paddingY * 2;
    _this.state = {
      expanded: _this.props.expanded
    };
    return _this;
  }

  _createClass(GUI, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.expanded !== this.props.expanded) {
        if (nextProps.expanded !== this.state.expanded) {
          this.setState({ expanded: nextProps.expanded });
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var noSelect = {
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        userSelect: 'none',
        MozAppearance: 'none'
      };
      var style = {
        position: 'fixed'
      };
      if (this.style.right !== undefined) {
        style.right = this.style.right;
      } else if (this.style.left !== undefined) {
        style.left = this.style.left;
      } else {
        style.right = '8px';
      }
      if (this.style.top !== undefined) {
        style.top = this.style.top;
      } else if (this.style.bottom !== undefined) {
        style.bottom = this.style.bottom;
      } else {
        style.top = '0px';
      }
      return _react2.default.createElement(
        'div',
        { style: style, className: this.props.className },
        _react2.default.createElement(
          'div',
          { style: { display: this.state.expanded ? 'block' : 'none' } },
          this.props.children
        ),
        _react2.default.createElement(
          _components.Row,
          null,
          _react2.default.createElement(
            'div',
            {
              onClick: this.handleCloseControls.bind(this),
              style: {
                font: this.style.font,
                color: this.style.label.fontColor,
                textAlign: 'center',
                width: this.style.labelWidth + this.style.controlWidth + 2 * this.style.paddingX,
                cursor: 'pointer'
              }
            },
            this.state.expanded && _react2.default.createElement(
              'span',
              { style: noSelect },
              'Close Controls'
            ),
            !this.state.expanded && _react2.default.createElement(
              'span',
              { style: noSelect },
              'Open Controls'
            )
          )
        )
      );
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        style: this.style
      };
    }
  }, {
    key: 'handleCloseControls',
    value: function handleCloseControls() {
      this.setState({
        expanded: !this.state.expanded
      });
    }
  }]);

  return GUI;
}(_react2.default.PureComponent);

exports.default = GUI;


GUI.propTypes = {
  style: _propTypes2.default.object,
  expanded: _propTypes2.default.bool,
  className: _propTypes2.default.string
};

GUI.defaultProps = {
  expanded: true
};

GUI.childContextTypes = {
  style: _propTypes2.default.object
};

function calculateFontHeight(font) {
  var div = document.createElement('div');
  div.style.font = font;
  div.style.overflow = 'hidden';
  div.style.whiteSpace = 'nowrap';
  div.innerHTML = '~!@#$%^&*()_+`1234567890-=QWERTYUIOP{}|qwertyuiop[]\\ASDFGHJKL:"asdfghjkl;\'ZXCVBNM<>?zxcvbnm,./';
  document.body.appendChild(div);
  var height = div.clientHeight;
  document.body.removeChild(div);
  return height;
}