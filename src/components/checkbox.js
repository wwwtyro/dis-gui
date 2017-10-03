'use strict';

import React from 'react';

import {Row, Label, Control} from './components';

export default class Checkbox extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.checked,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== this.props.checked) {
      if (nextProps.checked !== this.state.checked) {
        this.setState({checked: nextProps.checked});
      }
    }
  }

  render() {
    return (
      <Row>
        <Label>{this.props.label}</Label>
        <Control>
          <svg
            width={`${this.context.style.computed.fontHeight}`}
            height={`${this.context.style.computed.fontHeight}`}
            onClick={this.handleClick.bind(this)}
            style={{
              cursor: 'pointer',
            }}
          >
            <g transform={`scale(${this.context.style.computed.fontHeight/100})`}>
              <rect className="shape" x="0" y="0" width="100" height="100" fill={this.context.style.lowlight}></rect>
              {this.state.checked && <path
                transform='translate(18.75 50)'
                d="M0 0 L25 25 L62.5 -32.5"
                stroke={this.context.style.highlight}
                strokeWidth='15'
                fill='none'
              />}
            </g>
          </svg>
        </Control>
      </Row>
    )
  }

  handleClick(e) {
    this.setState({
      checked: !this.state.checked,
    });
    if (this.props.onChange) {
      this.props.onChange(!this.state.checked);
    }
    if (this.props.onFinishChange) {
      this.props.onFinishChange(!this.state.checked);
    }
  }

}

Checkbox.propTypes = {
  checked: React.PropTypes.bool,
  label: React.PropTypes.string,
  onChange: React.PropTypes.func,
  onFinishChange: React.PropTypes.func,
};

Checkbox.defaultProps = {
  checked: false,
}

Checkbox.contextTypes = {
  style: React.PropTypes.object
};
