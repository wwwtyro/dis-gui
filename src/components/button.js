'use strict';

import PropTypes from 'prop-types';

import React from 'react';

import {Row, Label, Control} from './components';

export default class Button extends React.PureComponent {

  render() {
    return (
      <Row>
        <Label></Label>
        <Control>
          <div
            onClick={this.handleClick.bind(this)}
            style={{
              backgroundColor: this.context.style.lowlight,
              color: this.context.style.highlight,
              font: this.context.style.font,
              padding: `${this.context.style.paddingY}px ${this.context.style.paddingX}px`,
              textAlign: 'center',
              cursor: 'pointer',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none',
              userSelect: 'none'
            }}
          >
            {this.props.label}
          </div>
        </Control>
      </Row>
    )
  }

  handleClick(e) {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

Button.contextTypes = {
  style: PropTypes.object
}
