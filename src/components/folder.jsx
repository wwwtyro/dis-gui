'use strict';

import React from 'react';
import merge from 'lodash.merge';
import cloneDeep from 'lodash.clonedeep';

import Row from './components';

export default class Folder extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: this.props.expanded,
    }
  }

  render() {
    let rightDisplay = this.state.expanded ? 'none' : 'inline-block';
    let downDisplay = this.state.expanded ? 'inline-block' : 'none';
    return (
      <div
        style={{
          backgroundColor: this.context.style.backgroundColor,
        }}
      >
        <div
          style={{
            color: this.context.style.label.fontColor,
            font: this.context.style.font,
            fontWeight: this.context.style.label.fontWeight,
            padding: `${this.context.style.paddingY}px ${this.context.style.paddingX}px`,
            borderBottom: this.context.style.separator,
            cursor: 'pointer',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
            userSelect: 'none',
          }}
          onClick={this.handleClick.bind(this)}
        >
          <div
            style={{
              padding: `${this.context.style.paddingY}px ${this.context.style.paddingX}px`,
              display: 'flex',
              flexFlow: 'row wrap',
              alignItems: 'center',
            }}
          >

            {this.props.label}

            <svg
              width={`${this.context.style.computed.fontHeight * 0.75}`}
              height={`${this.context.style.computed.fontHeight * 0.75}`}
              style={{
                display: rightDisplay,
                marginLeft: this.context.style.paddingX,
              }}
            >
              <g transform={`scale(${this.context.style.computed.fontHeight * 0.75/100})`}>
                <polygon className='shape' points='25,0 75,50 25,100' fill={this.context.style.label.fontColor}></polygon>
              </g>
            </svg>

            <svg
              width={`${this.context.style.computed.fontHeight * 0.75}`}
              height={`${this.context.style.computed.fontHeight * 0.75}`}
              style={{
                display: downDisplay,
                marginLeft: this.context.style.paddingX,
              }}
            >
              <g transform={`scale(${this.context.style.computed.fontHeight * 0.75/100})`}>
                <polygon className='shape' points='0,25 50,75 100,25' fill={this.context.style.label.fontColor}></polygon>
              </g>
            </svg>

          </div>
        </div>
        <div
          style={{
            borderLeft: `4px solid ${this.context.style.lowlight}`,
            display: `${this.state.expanded ? 'block' : 'none'}`
          }}
        >
          {this.props.children}
        </div>
      </div>
    )
  }

  getChildContext() {
    return merge(cloneDeep(this.context), {
      style: {
        labelWidth: this.context.style.labelWidth - 4,
      }
    });
  }

  handleClick(e) {
    this.setState({
      expanded: !this.state.expanded
    }, function() {
      if (this.props.onChange) {
        this.props.onChange(this.state.expanded);
      }
      if (this.props.onFinishChange) {
        this.props.onFinishChange(this.state.expanded);
      }
    });
  }

}

Folder.propTypes = {
  expanded: React.PropTypes.bool,
  label: React.PropTypes.string,
  onChange: React.PropTypes.func,
  onFinishChange: React.PropTypes.func,
};

Folder.defaultProps = {
  expanded: false,
};

Folder.childContextTypes = {
  style: React.PropTypes.object
};

Folder.contextTypes = {
  style: React.PropTypes.object
};
