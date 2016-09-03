'use strict';

import React from 'react';
import update from 'react-addons-update';

import * as dg from '../index';

import * as gradient from './gradient';

export default class Demo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      gradient: this.props.gradient,
    };
  }

  render() {
    return (
      <dg.GUI>
        <dg.Folder label='Text' expanded={true}>
          <dg.Text
            label='Text'
            value={this.props.text}
            onChange={this.props.onChangeText}
          />
          <dg.Color
            label='Color'
            red={this.props.textColor.red}
            green={this.props.textColor.green}
            blue={this.props.textColor.blue}
            onChange={this.props.onChangeTextColor}
          />
        </dg.Folder>
        <dg.Folder label='Background' expanded={true}>
          <dg.Select
            label='Noise'
            options={['Smooth', 'Fractal']}
            value={this.props.noise}
            onChange={this.props.onChangeNoise}
          />
          <dg.Number
            label='Scale'
            min={1}
            max={20}
            value={this.props.scale}
            decimals={3}
            onChange={this.props.onChangeScale}
          />
          <dg.Gradient
            label='Gradient'
            stops={this.state.gradient}
            onChange={this.props.onChangeGradient}
          />
          <dg.Button
            label='Randomize Gradient'
            onClick={this.onClickRandomGradient.bind(this)}
          />
          <dg.Folder label='Animation' expanded={true}>
            <dg.Number
              label='Speed'
              min={0}
              max={0.01}
              step={0.001}
              decimals={3}
              value={this.props.speed}
              onChange={this.props.onChangeSpeed}
            />
            <dg.Checkbox
              label='Translate'
              checked={this.props.translate}
              onChange={this.props.onChangeTranslate}
            />
          </dg.Folder>
        </dg.Folder>
      </dg.GUI>
    )
  }

  onClickRandomGradient() {
    let stops = gradient.random();
    let newState = update(this.state, {
      $set: {
        gradient: stops,
      }
    });
    this.setState(newState);
  }

}
