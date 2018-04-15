'use strict';

import PropTypes from 'prop-types';

import React from 'react';

import {Row, Label, Control} from './components';

export default class Select extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      options: this.props.options
    }
    this.handleChange = this.handleChange.bind(this)
    this._mapOption = this._mapOption.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.options !== this.props.options) {
      if (nextProps.options !== this.state.options) {
        this.setState({options: nextProps.options});
      }
    }
  }

  _mapOption(opt,index) {
    return (
      <option
        value={opt}
        key={opt + index}
        style={{
          backgroundColor: this.context.style.font,
        }}
      >
        {opt}
      </option>
    )
  }

  render() {
    return (
      <Row>
        <Label>{this.props.label}</Label>
        <Control>
          <select
            onChange={this.handleChange}
            value={this.props.value}
            style={{
              backgroundColor: this.context.style.lowlight,
              color: this.context.style.highlight,
              font: this.context.style.font,
              height: this.context.style.computed.itemHeight,
              lineHeight: this.context.style.computed.itemHeight,
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none',
              userSelect: 'none',
              MozAppearance: 'none',
              border: 'none',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            {this.state.options.map(this._mapOption)}
          </select>
        </Control>
      </Row>
    )
  }

  handleChange(e) {
    if (this.props.onChange) {
      this.props.onChange(e.target.value);
    }
    if (this.props.onFinishChange) {
      this.props.onFinishChange(e.target.value);
    }
  }

}

Select.propTypes = {
  options: PropTypes.array.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onFinishChange: PropTypes.func,
};

Select.contextTypes = {
  style: PropTypes.object
};
