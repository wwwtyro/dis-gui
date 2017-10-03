'use strict';

import React from 'react';

import {Row, Label, Control, ColorRange} from './components';

export default class Color extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      red: this.props.red,
      green: this.props.green,
      blue: this.props.blue,
      expanded: this.props.expanded,
    }
  }

  render() {
    return (
        <Row>
          <Label>{this.props.label}</Label>
          <Control>
            <div
              onClick={this.handleColorClick.bind(this)}
              style={{
                font: this.context.style.font,
                backgroundColor: `rgb(${this.state.red}, ${this.state.green}, ${this.state.blue})`,
                height: `${this.context.style.computed.itemHeight}px`,
                lineHeight: `${this.context.style.computed.itemHeight}px`,
                width: '100%',
                textAlign: 'center',
                color: 'white',
                fontWeight: 'bold',
                textShadow: 'black 0 0 4px, black 0 0 4px, black 0 0 4px, black 0 0 4px, black 0 0 4px',
                cursor: 'default',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none',
                userSelect: 'none',
                cursor: 'pointer',
              }}
            >
              {this.state.red}, {this.state.green}, {this.state.blue}
            </div>
            {this.state.expanded &&
              <div>
                <ColorRange
                  label='Red'
                  value={this.state.red}
                  onChange={this.handleChangeRed.bind(this)}
                  onFinishChange={this.handleFinishChange.bind(this)}
                />
                <ColorRange
                  label='Green'
                  value={this.state.green}
                  onChange={this.handleChangeGreen.bind(this)}
                  onFinishChange={this.handleFinishChange.bind(this)}
                />
                <ColorRange
                  label='Blue'
                  value={this.state.blue}
                  onChange={this.handleChangeBlue.bind(this)}
                  onFinishChange={this.handleFinishChange.bind(this)}
                />
              </div>
            }
          </Control>
        </Row>
    )
  }

  handleColorClick(e) {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  handleChangeRed(value) {
    this.setState({
      red: value
    }, this.handleChange);
  }

  handleChangeGreen(value) {
    this.setState({
      green: value
    }, this.handleChange);
  }

  handleChangeBlue(value) {
    this.setState({
      blue: value
    }, this.handleChange);
  }

  handleChange() {
    if (this.props.onChange) {
      this.props.onChange({
        red: this.state.red,
        green: this.state.green,
        blue: this.state.blue
      });
    }
  }

  handleFinishChange() {
    if (this.props.onFinishChange) {
      setTimeout(() => {
        this.props.onFinishChange({
          red: this.state.red,
          green: this.state.green,
          blue: this.state.blue
        });
      }, 0);
    }
  }

}

Color.propTypes = {
  red: React.PropTypes.number,
  green: React.PropTypes.number,
  blue: React.PropTypes.number,
  expanded: React.PropTypes.bool,
  label: React.PropTypes.string,
  onChange: React.PropTypes.func,
  onFinishChange: React.PropTypes.func,
};

Color.defaultProps = {
  red: 0,
  green: 0,
  blue: 0,
  expanded: false,
};

Color.contextTypes = {
  style: React.PropTypes.object
};
