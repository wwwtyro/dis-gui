'use strict';

import React from 'react';
import sprintf from 'sprintf';

export default class Number extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      invalid: false,
      value: this.props.value
    }
  }

  render() {
    return (
      <input
        style={{
          width: this.props.width,
          color: this.context.style.highlight,
          font: this.context.style.font,
          padding: `${this.context.style.paddingY}px ${this.context.style.paddingX}px`,
          backgroundColor: this.state.invalid ? this.context.style.lowlighterr : this.context.style.lowlight,
          border: 'none',
          outline: 'none',
        }}
        type='text'
        value={this.state.value}
        onChange={this.onChange.bind(this)}
        onKeyDown={this.onKeyDown.bind(this)}
        onBlur={this.onBlur.bind(this)}
      >
      </input>
    )
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      invalid: !this.isNumber(nextProps.value),
      value: this.truncate(nextProps.value),
    });
  }

  truncate(value) {
    if (this.props.decimals !== undefined) {
      return sprintf(`%.${this.props.decimals}f`, parseFloat(value));
    }
    return value;
  }

  onKeyDown(e) {
    if(e.which === 13) {
      this.handleChange(this.truncate(e.target.value));
    }
  }

  onBlur(e) {
    this.handleChange(this.truncate(e.target.value));
  }

  isNumber(value) {
    return !isNaN(value) && value !== '';
  }

  onChange(e) {
    if (!this.isNumber(e.target.value)) {
      this.setState({
        invalid: true,
        value: e.target.value
      })
      return;
    }
    this.setState({
      invalid: false,
      value: e.target.value
    });
  }

  handleChange(value) {
    if (!this.state.invalid && this.props.onChange) {
      this.props.onChange(parseFloat(value));
    }
    if (!this.state.invalid && this.props.onFinishChange) {
      this.props.onFinishChange(parseFloat(value));
    }
  }

}

Number.propTypes = {
  value: React.PropTypes.number.isRequired,
  width: React.PropTypes.string,
  onChange: React.PropTypes.func,
  OnFinishChange: React.PropTypes.func,
}

Number.defaultProps = {
  width: '100%',
}

Number.contextTypes = {
  style: React.PropTypes.object,
}
