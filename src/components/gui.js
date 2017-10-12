'use strict';

import PropTypes from 'prop-types';

import React from 'react';
import merge from 'lodash.merge';

import {Row, Control} from './components';

let defaultStyle = {
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
    fontWeight: 'normal',
  },
};

export default class GUI extends React.PureComponent {

  constructor(props) {
    super(props);
    this.style = merge(JSON.parse(JSON.stringify(defaultStyle)), this.props.style);
    this.style.computed = {};
    this.style.computed.fontHeight = calculateFontHeight(this.style.font);
    this.style.computed.itemHeight = this.style.computed.fontHeight + this.style.paddingY * 2;
    this.style.computed.minRowHeight = this.style.computed.itemHeight + this.style.paddingY * 2;
    this.state = {
      expanded: this.props.expanded
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.expanded !== this.props.expanded) {
      if (nextProps.expanded !== this.state.expanded) {
        this.setState({expanded: nextProps.expanded});
      }
    }
  }

  render() {
    let noSelect = {
      WebkitUserSelect: 'none',
      MozUserSelect: 'none',
      msUserSelect: 'none',
      userSelect: 'none',
      MozAppearance: 'none',
    }
    let style = {
      position: 'fixed',
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
    return (
      <div style={style} className={this.props.className}>
        <div style={{display: this.state.expanded ? 'block' : 'none'}}>
          {this.props.children}
        </div>
        <Row>
            <div
              onClick={this.handleCloseControls.bind(this)}
              style={{
                font: this.style.font,
                color: this.style.label.fontColor,
                textAlign: 'center',
                width: this.style.labelWidth + this.style.controlWidth + 2 * this.style.paddingX,
                cursor: 'pointer',
              }}
            >
              {this.state.expanded && <span style={noSelect}>Close Controls</span>}
              {!this.state.expanded && <span style={noSelect}>Open Controls</span>}
            </div>
        </Row>
      </div>
    )
  }

  getChildContext() {
    return {
      style: this.style,
    }
  }

  handleCloseControls() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

}

GUI.propTypes = {
  style: PropTypes.object,
  expanded: PropTypes.bool,
  className: PropTypes.string
};

GUI.defaultProps = {
  expanded: true,
}

GUI.childContextTypes = {
  style: PropTypes.object,
};

function calculateFontHeight(font) {
  let div = document.createElement('div');
  div.style.font = font;
  div.style.overflow = 'hidden';
  div.style.whiteSpace = 'nowrap';
  div.innerHTML = '~!@#$%^&*()_+`1234567890-=QWERTYUIOP{}|qwertyuiop[]\\ASDFGHJKL:"asdfghjkl;\'ZXCVBNM<>?zxcvbnm,./';
  document.body.appendChild(div);
  let height = div.clientHeight;
  document.body.removeChild(div);
  return height;
}
