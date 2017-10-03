'use strict';

import React from 'react';

import {Row, Label, Control, Number as NumberInput, NumberRange} from './components';

export default class Number extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      if (nextProps.value !== this.state.value) {
        this.setState({value: nextProps.value});
      }
    }
  }

  render() {
    if (this.props.min !== undefined && this.props.max !== undefined) {
      return (
        <Row>
          <Label>{this.props.label}</Label>
          <Control>
              <NumberRange
                decimals={this.props.decimals}
                value={this.state.value}
                min={this.props.min}
                max={this.props.max}
                step={this.props.step}
                onChange={this.handleChange.bind(this)}
                onFinishChange={this.handleFinishChange.bind(this)}
              />
          </Control>
        </Row>
      )
    } else {
      return (
        <Row>
          <Label>{this.props.label}</Label>
          <Control>
            <NumberInput
              decimals={this.props.decimals}
              value={this.state.value}
              onChange={this.handleChange.bind(this)}
              onFinishChange={this.handleFinishChange.bind(this)}
              width='100%'
            />
          </Control>
        </Row>
      )
    }
  }

  handleFinishChange(value) {
    this.setState({
      value: value
    });
    if (this.props.onFinishChange) {
      this.props.onFinishChange(value);
    }
  }

  handleChange(value) {
    this.setState({
      value: value
    })
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

}

Number.propTypes = {
  value: React.PropTypes.number,
  min: React.PropTypes.number,
  max: React.PropTypes.number,
  step: React.PropTypes.number,
  label: React.PropTypes.string,
  onChange: React.PropTypes.func,
  onFinishChange: React.PropTypes.func,
};

Number.defaultProps = {
  value: 0,
};

Number.contextTypes = {
  style: React.PropTypes.object
};
