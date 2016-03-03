/**
 * @classdesc GridControls
 */

import { styles, leftButton, rightButton } from "../../styles/gridControls";
import React, { Component, PropTypes } from "react";

export default class GridControls extends Component {
  // todo do we really need this check here?
  shouldComponentUpdate(nextProps) {
    return this.props.isVisible !== nextProps.isVisible;
  }
  render() {
    const { isVisible, onPublishProductClick, onShowProductSettings } = this.props;
    const className = isVisible ? "unhide icon" : "hide icon";

    console.log("GridControls: rendering...");
    // todo добавить недостающие свойства кнопкам
    return (
      <div className="ui small grey icon buttons" style={ styles }>
        <button
          className="ui button"
          style={ leftButton }
          onClick={ onPublishProductClick }
        >
          <i className={ className }></i>
        </button>
        <button
          className="ui button"
          style={ rightButton }
          onClick={ onShowProductSettings }
        >
          <i className="setting icon"></i>
        </button>
      </div>
    );
  }
}

GridControls.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onPublishProductClick: PropTypes.func.isRequired,
  onShowProductSettings: PropTypes.func.isRequired
};
