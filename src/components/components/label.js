'use strict';

import React from 'react';

export default class Label extends React.Component {

  render() {
    return (
      <div
        style={{
          width: this.context.style.labelWidth,
          font: this.context.style.font,
          fontWeight: this.context.style.label.fontWeight,
          padding: `${this.context.style.paddingY}px ${this.context.style.paddingX}px`,
          color: this.context.style.label.fontColor,
          cursor: 'default',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
          userSelect: 'none'
        }}
      >
        {this.props.children}
      </div>
    )
  }

}

Label.contextTypes = {
  style: React.PropTypes.object
}
