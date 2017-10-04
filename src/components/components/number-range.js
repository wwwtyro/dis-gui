'use strict';

import PropTypes from 'prop-types';

import React from 'react';

import Number from './number.js';
import Range from './range.js';

export default class NumberRange extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    }
  }

  render() {
    return (
      <div
        style={{
          width: this.props.width,
          display: 'flex',
          flexFlow: 'row wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Range
          value={this.state.value}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          width={this.props.rangeWidth}
          onChange={this.handleChange.bind(this)}
          onFinishChange={this.handleFinishChange.bind(this)}
        />
        <Number
          decimals={this.props.decimals}
          value={this.state.value}
          width={this.props.numberWidth}
          onChange={this.handleChange.bind(this)}
          onFinishChange={this.handleFinishChange.bind(this)}
        />
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value
    });
  }

  handleChange(value) {
    value = Math.min(this.props.max, Math.max(this.props.min, value));
    this.setState({
      value: value
    }, function() {
      if (this.props.onChange) {
        this.props.onChange(this.state.value);
      }
    });
  }

  handleFinishChange(value) {
    value = Math.min(this.props.max, Math.max(this.props.min, value));
    this.setState({
      value: value
    }, function() {
      if (this.props.onFinishChange) {
        this.props.onFinishChange(this.state.value);
      }
    });
  }

}

NumberRange.propTypes = {
  value: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number,
  width: PropTypes.string,
  rangeWidth: PropTypes.string,
  numberWidth: PropTypes.string,
  onChange: PropTypes.func,
  OnFinishChange: PropTypes.func,
}

NumberRange.defaultProps = {
  rangeWidth: '65%',
  numberWidth: '30%',
  width: '100%',
};
