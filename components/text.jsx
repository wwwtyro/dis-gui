'use strict';

import React from 'react';

import {Row, Label, Control} from './components';

export default class Text extends React.Component {

  render() {
    return (
      <Row>
        <Label>{this.props.label}</Label>
        <Control>
          <input
            type='text'
            defaultValue={this.props.value}
            onChange={this.handleChange.bind(this)}
            onBlur={this.onBlur.bind(this)}
            onKeyDown={this.onKeyDown.bind(this)}
            style={{
              color: this.context.style.highlight,
              font: this.context.style.font,
              backgroundColor: this.context.style.lowlight,
              padding: `${this.context.style.paddingY}px ${this.context.style.paddingX}px`,
              width: '100%',
              border: 'none',
              outline: 'none',
            }}>
          </input>
        </Control>
      </Row>
    )
  }

  onKeyDown(e) {
    if(e.which === 13) {
      if (this.props.onFinishChange) {
        this.props.onFinishChange(e.target.value);
      }
    }
  }

  onBlur(e) {
    if (this.props.onFinishChange) {
      this.props.onFinishChange(e.target.value);
    }
  }

  handleChange(e) {
    if (this.props.onChange) {
      this.props.onChange(e.target.value);
    }
  }

}

Text.propTypes = {
  value: React.PropTypes.string,
  label: React.PropTypes.string,
  onChange: React.PropTypes.func,
  onFinishChange: React.PropTypes.func,
}

Text.contextTypes = {
  style: React.PropTypes.object
}
