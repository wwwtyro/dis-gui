'use strict';

import React from 'react';

export default class Row extends React.PureComponent {

  render() {
    return (
      <div style={{
             borderBottom: this.context.style.separator,
             backgroundColor: this.context.style.backgroundColor,
             minHeight: this.context.style.computed.minRowHeight,
             padding: `${this.context.style.paddingY}px ${this.context.style.paddingX}px`,
             boxSizing: 'border-box',
             display: 'flex',
             flexFlow: 'row wrap',
             alignItems: 'center',
           }}>
        {this.props.children}
      </div>
    )
  }

}

Row.contextTypes = {
  style: React.PropTypes.object
}
