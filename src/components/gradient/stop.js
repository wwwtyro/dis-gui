'use strict';

import PropTypes from 'prop-types';

import React from 'react';

export default class Stop extends React.PureComponent {
  render() {
    let selectScale = this.props.selected ? 1.25 : 1;
    let s = this.context.style.computed.fontHeight/58 * selectScale;
    let border = this.context.style.label.fontColor;
    return (
      <svg
        ref={(ref) => this.stopRef = ref}
        width={`${58 * s}px`}
        height={`${87 * s}px`}
        onMouseDown={this.handleMouseDown.bind(this)}
        style={{
          left: `${this.props.stop * (this.context.style.controlWidth) - selectScale * this.context.style.computed.fontHeight/2}px`,
          position: 'absolute',
          cursor: 'pointer',
        }}
      >
        <g transform={`scale(${s})`}>
          <g transform='translate(4, 9)'>
            <path
              d='M0 25 L0 75 L50 75 L50 25 L25 0 Z'
              fill={`rgb(${this.props.red}, ${this.props.green}, ${this.props.blue})`}
              stroke={border}
              strokeWidth='4'
            />
          </g>
        </g>
      </svg>
    )
  }

  handleMouseDown(e) {
    e.preventDefault();
    let field = this.stopRef.parentNode;
    let fieldRect = field.getBoundingClientRect();
    let onMouseMove = function(e) {
      let x = e.pageX - fieldRect.left;
      let stop = x/fieldRect.width;
      stop = Math.max(0, Math.min(1, stop));
      this.props.onChange({
        index: this.props.index,
        stop: stop
      });
    }.bind(this);
    let onMouseUp = function() {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      this.props.onFinishChange();
    }.bind(this)
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    this.props.onClick({
      index: this.props.index,
    });
  }

}

Stop.propTypes = {
  selected: PropTypes.bool,
  stop: PropTypes.number,
  red: PropTypes.number,
  green: PropTypes.number,
  blue: PropTypes.number,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  OnFinishChange: PropTypes.func,
  onClick: PropTypes.func,
};

Stop.defaultProps = {
  selected: false,
  stop: 0,
  red: 0,
  green: 0,
  blue: 0,
};

Stop.contextTypes = {
  style: PropTypes.object,
};
