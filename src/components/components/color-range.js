import React from 'react';

import NumberRange from './number-range.js';

export default class ColorRange extends React.PureComponent {

  render() {
    return (
      <div
        style={{
          padding: `${this.context.style.paddingY}px 0px`,
          paddingBottom: '0px',
          display: 'flex',
          flexFlow: 'row wrap',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <span
          style={{
            font: this.context.style.font,
            color: this.context.style.highlight,
            width: '20%',
            display: 'inline-block',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
            userSelect: 'none',
          }}
        >
          {this.props.label}
        </span>
        <NumberRange
          width='80%'
          min={0}
          max={255}
          step={1}
          value={this.props.value}
          onChange={this.handleChange.bind(this)}
          onFinishChange={this.handleFinishChange.bind(this)}
        />
      </div>
    )
  }

  handleFinishChange(value) {
    if (this.props.onFinishChange) {
      this.props.onFinishChange(value);
    }
  }

  handleChange(value) {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }
}

ColorRange.propTypes = {
  label: React.PropTypes.string,
  value: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func,
  onFinishChange: React.PropTypes.func,
};

ColorRange.contextTypes = {
  style: React.PropTypes.object
};
