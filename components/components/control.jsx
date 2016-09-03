'use strict';

import React from 'react';

export default class Control extends React.Component {

  render() {
    return (
      <div
        style={{
          width: `${this.context.style.controlWidth}px`,
        }}
      >
        {this.props.children}
      </div>
    )
  }

}

Control.contextTypes = {
  style: React.PropTypes.object
}
