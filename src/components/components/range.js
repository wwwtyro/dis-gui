'use strict';

import PropTypes from 'prop-types';

import React from 'react';

export default class Range extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
    };

    this.containerRef = React.createRef();
    this.trackRef = React.createRef();
    this.thumbRef = React.createRef();
  }

  render() {
    return (
      <div
        ref={this.containerRef}
        onMouseDown={this.onMouseDown.bind(this)}
        style={{
          width: this.props.width,
          height: `${this.context.style.computed.itemHeight}px`,
          position: 'relative',
        }}
      >
        <div
          ref={this.trackRef}
          style={{
            position: 'absolute',
            width: '100%',
            height: '1px',
            left: '0px',
            backgroundColor: this.context.style.lowlight,
          }}
        ></div>
        <div
          ref={this.thumbRef}
          style={{
            position: 'absolute',
            backgroundColor: this.context.style.lowlight,
            border: `1px solid ${this.context.style.highlight}`,
            boxSizing: 'border-box',
            borderRadius: '0px',
            cursor: 'pointer',
          }}
        ></div>
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  componentDidUpdate() {
    this.updateLayout();
  }

  componentDidMount() {
    this.updateLayout();
    if (this.context.folder) {
      this.unsubscribeFolder = this.context.folder.subscribe((expanded) => {
        if (expanded) this.forceUpdate();
      })
    }
  }
  componentWillUnmount() {
    if (this.unsubscribeFolder) this.unsubscribeFolder();
  }

  updateLayout() {
    let container = this.containerRef.current;
    let cHeight = container.clientHeight;
    let cWidth = container.clientWidth;
    let track = this.trackRef.current;
    track.style.top = `${cHeight/2 - 0.5}px`;
    let thumb = this.thumbRef.current;
    let thumbSize = this.context.style.computed.fontHeight * 0.9;
    thumb.style.top = `${this.context.style.computed.itemHeight/2 - thumbSize/2}px`;
    let frac = (this.state.value - this.props.min)/(this.props.max - this.props.min);
    let left = frac * cWidth - thumbSize/2;
    left = Math.max(left, 0);
    left = Math.min(left, cWidth - thumbSize);
    thumb.style.left = `${left}px`;
    thumb.style.width = `${thumbSize}px`;
    thumb.style.height = `${thumbSize}px`;
  }

  moveThumb(pageX) {
    let container = this.containerRef.current;
    let cWidth = container.clientWidth;
    let thumbSize = this.context.style.computed.fontHeight * 0.9;
    let x = pageX - container.getBoundingClientRect().left;
    let frac = 0;
    if (x < thumbSize/2) {
      frac = 0;
    } else if (x > cWidth - thumbSize/2) {
      frac = 1;
    } else {
      frac = (x - thumbSize/2)/(cWidth-thumbSize);
    }
    let value = frac * (this.props.max - this.props.min) + this.props.min;
    if (this.props.step !== undefined) {
      let stops = [];
      let x = this.props.min;
      while(x < this.props.max) {
        stops.push(x);
        x += this.props.step;
      }
      stops.push(this.props.max);
      let min = stops[0];
      for (let i = 0; i < stops.length; i++) {
        let stop = stops[i];
        let dmin = Math.abs(min - value);
        let dstop = Math.abs(stop - value);
        if (dstop < dmin) {
          min = stop;
        }
      }
      value = min;
    }
    this.setState({
      value: value,
    });
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  onMouseDown(e) {
    e.preventDefault();
    this.moveThumb(e.pageX);
    let onMouseMove = function(e) {
      this.moveThumb(e.pageX);
    }.bind(this);
    let onMouseUp = function() {
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);
      if (this.props.onFinishChange) {
        this.props.onFinishChange(this.state.value);
      }
    }.bind(this);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }

}

Range.propTypes = {
  value: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number,
  width: PropTypes.string,
  onChange: PropTypes.func,
  OnFinishChange: PropTypes.func,
}

Range.defaultProps = {
  width: '100%',
};

Range.contextTypes = {
  style: PropTypes.object,
  folder: PropTypes.shape({
    subscribe: PropTypes.func
  }),
}
