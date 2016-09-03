'use strict';

import React from 'react';
import update from 'react-addons-update';

import {Row, Label, Control, ColorRange} from '../components';
import Stop from './stop.jsx';

export default class Gradient extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: this.props.expanded,
      stops: this.props.stops,
      selectedStop: 0
    }
  }

  render() {
    let stopSide = this.context.style.computed.fontHeight;
    return (
      <Row>
        <Label>{this.props.label}</Label>
        <Control>
          <canvas
            ref='canvas'
            onClick={this.handleCanvasClick.bind(this)}
            style={{
              width: `${this.context.style.controlWidth}px`,
              position: 'relative',
              height: `${this.context.style.computed.itemHeight}px`,
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none',
              userSelect: 'none',
              cursor: 'pointer',
            }}
          ></canvas>
          {this.state.expanded &&
            <div>
              <div
                ref='stopfield'
                onMouseDown={this.handleStopFieldMouseDown.bind(this)}
                style={{
                  width: `${this.context.style.controlWidth}px`,
                  height: `${stopSide*1.875}px`,
                  boxSizing: 'border-box',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
              >
                {this.state.stops.map(function(stop, index) {
                  return (
                    <Stop
                      key={'stop' + index}
                      index={index}
                      stop={stop.stop}
                      red={stop.red}
                      green={stop.green}
                      blue={stop.blue}
                      selected={index === this.state.selectedStop}
                      onClick={this.handleStopClick.bind(this)}
                      onChange={this.handleStopChange.bind(this)}
                      onFinishChange={this.handleFinishChange.bind(this)}
                    />
                  )
                }.bind(this))}
              </div>
              <ColorRange
                label='Red'
                value={this.state.stops[this.state.selectedStop].red}
                onChange={this.handleChangeRed.bind(this)}
                onFinishChange={this.handleFinishChange.bind(this)}
              />
              <ColorRange
                label='Green'
                value={this.state.stops[this.state.selectedStop].green}
                onChange={this.handleChangeGreen.bind(this)}
                onFinishChange={this.handleFinishChange.bind(this)}
              />
              <ColorRange
                label='Blue'
                value={this.state.stops[this.state.selectedStop].blue}
                onChange={this.handleChangeBlue.bind(this)}
                onFinishChange={this.handleFinishChange.bind(this)}
              />
              { this.state.stops.length > 1 &&
                <div
                  onClick={this.handleRemoveStop.bind(this)}
                  style={{
                    backgroundColor: this.context.style.lowlight,
                    color: this.context.style.highlight,
                    font: this.context.style.font,
                    padding: `${this.context.style.paddingY}px 0px`,
                    marginTop: `${this.context.style.paddingY}px`,
                    textAlign: 'center',
                    cursor: 'pointer',
                    width: '100%',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    msUserSelect: 'none',
                    userSelect: 'none',
                  }}
                >
                  Remove Stop
                </div>
              }
            </div>
          }
        </Control>
      </Row>
    )
  }

  handleStopFieldMouseDown(e) {
    if (e.target !== this.refs.stopfield) return;
    let stops = this.state.stops.slice();
    let rect = e.target.getBoundingClientRect();
    let stop = (e.pageX - rect.left)/rect.width;
    let c = this.getGradientValue(this.getCleanStops(), stop);
    stops.push({
      stop: stop,
      red: c.red,
      green: c.green,
      blue: c.blue
    });
    let newState = update(this.state, {
      $set: {
        stops: stops,
        selectedStop: stops.length - 1
      }
    })
    this.setState(newState, () => {
      this.handleChange();
      this.handleFinishChange()
    });
  }

  handleRemoveStop() {
    let stops = this.state.stops.slice();
    stops.splice(this.state.selectedStop, 1);
    let newState = update(this.state, {
      $set: {
        stops: stops,
        selectedStop: 0
      }
    })
    this.setState(newState, () => {
      this.handleChange();
      this.handleFinishChange()
    });
  }

  handleChangeRed(value) {
    let stops = this.state.stops.slice();
    stops[this.state.selectedStop].red = parseInt(value);
    let newState = update(this.state, {
      $set: {
        stops: stops
      }
    })
    this.setState(newState, this.handleChange);
  }

  handleChangeGreen(value) {
    let stops = this.state.stops.slice();
    stops[this.state.selectedStop].green = parseInt(value);
    let newState = update(this.state, {
      $set: {
        stops: stops
      }
    })
    this.setState(newState, this.handleChange);
  }

  handleChangeBlue(value) {
    let stops = this.state.stops.slice();
    stops[this.state.selectedStop].blue = parseInt(value);
    let newState = update(this.state, {
      $set: {
        stops: stops
      }
    })
    this.setState(newState, this.handleChange);
  }

  handleChange() {
    if (this.props.onChange) {
      this.props.onChange(this.getCleanStops());
    }
  }

  handleFinishChange() {
    if (this.props.onFinishChange) {
      this.props.onFinishChange(this.getCleanStops());
    }
  }

  componentDidMount() {
    this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  componentWillReceiveProps(nextProps) {
    let newState = update(this.state, {
      $set: {
        stops: nextProps.stops,
      }
    })
    this.setState(newState, () => {
      this.handleChange();
      this.handleFinishChange();
    });
  }

  handleCanvasClick() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  handleStopChange(e) {
    let stops = this.state.stops.slice();
    stops[e.index].stop = e.stop;
    let newState = update(this.state, {
      $set: {
        stops: stops,
      }
    });
    this.setState(newState, this.handleChange);
  }

  handleStopClick(e) {
    this.setState({
      selectedStop: e.index,
    });
  }

  getCleanStops() {
    // Returns this.state.stops, bounded to [0..1] and sorted.
    let stops = this.state.stops.slice();
    stops.sort(function(a, b) {
      return a.stop - b.stop;
    });
    if (stops[0].stop > 0) {
        stops.unshift({
          stop: 0,
          red: stops[0].red,
          green: stops[0].green,
          blue: stops[0].blue
        });
    }
    let lastStop = stops[stops.length - 1];
    if (lastStop.stop < 1) {
      stops.push({
        stop: 1,
        red: lastStop.red,
        green: lastStop.green,
        blue: lastStop.blue
      });
    }
    return stops;
  }

  getGradientValue(cleanStops, frac) {
    for (let i = 0; i < cleanStops.length - 1; i++) {
      if (frac >= cleanStops[i].stop && frac <= cleanStops[i + 1].stop) {
        let left = cleanStops[i];
        let right = cleanStops[i + 1];
        let ifrac = (frac - left.stop)/(right.stop - left.stop);
        return {
          red: Math.round(left.red + ifrac * (right.red - left.red)),
          green: Math.round(left.green + ifrac * (right.green - left.green)),
          blue: Math.round(left.blue + ifrac * (right.blue - left.blue)),
        }
      }
    }
    throw ('Error calculating gradient value.');
  }

  updateCanvas() {
    let stops = this.getCleanStops()
    let canvas = this.refs.canvas;
    canvas.width = 512;
    canvas.height = 1;
    let ctx = canvas.getContext('2d');
    for (var x = 0; x < canvas.width; x++) {
      let frac = x/(canvas.width - 1);
      let c = this.getGradientValue(stops, frac);
      ctx.fillStyle = `rgb(${c.red}, ${c.green}, ${c.blue})`;
      ctx.fillRect(x, 0, 1, 1);
    }
  }

}

Gradient.propTypes = {
  expanded: React.PropTypes.bool,
  stops: React.PropTypes.array,
  label: React.PropTypes.string,
  onChange: React.PropTypes.func,
  onFinishChange: React.PropTypes.func,
};

Gradient.defaultProps = {
  expanded: false,
  stops: [
    {red: 255, green: 0, blue: 0, stop: 0.125},
    {red: 255, green: 255, blue: 0, stop: 0.5},
    {red: 255, green: 255, blue: 255, stop: 0.875},
  ],
};

Gradient.contextTypes = {
  style: React.PropTypes.object,
};
