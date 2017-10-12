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

var _lodash3 = require('lodash.clonedeep');

var _lodash4 = _interopRequireDefault(_lodash3);

var _components = require('./components');

var _components2 = _interopRequireDefault(_components);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Folder = function (_React$PureComponent) {
  _inherits(Folder, _React$PureComponent);

  function Folder(props) {
    _classCallCheck(this, Folder);

    var _this = _possibleConstructorReturn(this, (Folder.__proto__ || Object.getPrototypeOf(Folder)).call(this, props));

    _this.subscriptions = [];
    _this.state = {
      expanded: _this.props.expanded
    };
    return _this;
  }

  _createClass(Folder, [{
    key: 'subscribe',
    value: function subscribe(fn) {
      this.subscriptions.push(fn);
    }
  }, {
    key: 'unsubscribe',
    value: function unsubscribe(fn) {
      this.subscriptions.splice(this.subscriptions.indexOf(fn), 1);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.expanded !== this.props.expanded) {
        if (nextProps.expanded !== this.state.expanded) {
          this.setState({ expanded: nextProps.expanded });
        }
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _this2 = this;

      if (prevState.expanded !== this.state.expanded) {
        this.subscriptions.forEach(function (fn) {
          return fn(_this2.state.expanded);
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var rightDisplay = this.state.expanded ? 'none' : 'inline-block';
      var downDisplay = this.state.expanded ? 'inline-block' : 'none';
      return _react2.default.createElement(
        'div',
        {
          style: {
            backgroundColor: this.context.style.backgroundColor
          }
        },
        _react2.default.createElement(
          'div',
          {
            style: {
              color: this.context.style.label.fontColor,
              font: this.context.style.font,
              fontWeight: this.context.style.label.fontWeight,
              padding: this.context.style.paddingY + 'px ' + this.context.style.paddingX + 'px',
              borderBottom: this.context.style.separator,
              cursor: 'pointer',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none',
              userSelect: 'none'
            },
            onClick: this.handleClick.bind(this)
          },
          _react2.default.createElement(
            'div',
            {
              style: {
                padding: this.context.style.paddingY + 'px ' + this.context.style.paddingX + 'px',
                display: 'flex',
                flexFlow: 'row wrap',
                alignItems: 'center'
              }
            },
            this.props.label,
            _react2.default.createElement(
              'svg',
              {
                width: '' + this.context.style.computed.fontHeight * 0.75,
                height: '' + this.context.style.computed.fontHeight * 0.75,
                style: {
                  display: rightDisplay,
                  marginLeft: this.context.style.paddingX
                }
              },
              _react2.default.createElement(
                'g',
                { transform: 'scale(' + this.context.style.computed.fontHeight * 0.75 / 100 + ')' },
                _react2.default.createElement('polygon', { className: 'shape', points: '25,0 75,50 25,100', fill: this.context.style.label.fontColor })
              )
            ),
            _react2.default.createElement(
              'svg',
              {
                width: '' + this.context.style.computed.fontHeight * 0.75,
                height: '' + this.context.style.computed.fontHeight * 0.75,
                style: {
                  display: downDisplay,
                  marginLeft: this.context.style.paddingX
                }
              },
              _react2.default.createElement(
                'g',
                { transform: 'scale(' + this.context.style.computed.fontHeight * 0.75 / 100 + ')' },
                _react2.default.createElement('polygon', { className: 'shape', points: '0,25 50,75 100,25', fill: this.context.style.label.fontColor })
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          {
            style: {
              borderLeft: '4px solid ' + this.context.style.lowlight,
              display: '' + (this.state.expanded ? 'block' : 'none')
            }
          },
          this.props.children
        )
      );
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      var _this3 = this;

      return (0, _lodash2.default)((0, _lodash4.default)(this.context), {
        style: {
          labelWidth: this.context.style.labelWidth - 4
        },
        folder: {
          subscribe: function subscribe(fn) {
            _this3.subscribe(fn);
            return function () {
              return _this3.unsubscribe(fn);
            };
          }
        }
      });
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      this.setState({
        expanded: !this.state.expanded
      }, function () {
        if (this.props.onChange) {
          this.props.onChange(this.state.expanded);
        }
        if (this.props.onFinishChange) {
          this.props.onFinishChange(this.state.expanded);
        }
      });
    }
  }]);

  return Folder;
}(_react2.default.PureComponent);

exports.default = Folder;


Folder.propTypes = {
  expanded: _propTypes2.default.bool,
  label: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  onFinishChange: _propTypes2.default.func
};

Folder.defaultProps = {
  expanded: false
};

Folder.childContextTypes = {
  style: _propTypes2.default.object,
  folder: _propTypes2.default.shape({
    subscribe: _propTypes2.default.func
  })
};

Folder.contextTypes = {
  style: _propTypes2.default.object
};