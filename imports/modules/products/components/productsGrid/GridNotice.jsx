import React, { Component, PropTypes } from "react";
import { styles } from "../../styles/gridNotice";

// todo prevent to rerendering from GridControl changes?

export default class GridNotice extends Component {
  render() {
    const { isSoldOut, isBackorder, isLowQuantity } = this.props;

    // todo add styles
    if (isSoldOut) {
      if (isBackorder) {
        console.log("GridNotice rendering...");
        return <span style={styles}>Backorder</span>;
      }
      console.log("GridNotice rendering...");
      return <span style={styles}>Sold Out!</span>;
    } else {
      if (isLowQuantity) {
        console.log("GridNotice rendering...");
        return <span style={styles}>Limited Supply</span>;
      }
    }
    console.log("GridNotice rendering...");
    return false;
  }
}

GridNotice.propTypes = {
  isSoldOut: PropTypes.bool.isRequired,
  isBackorder: PropTypes.bool.isRequired,
  isLowQuantity: PropTypes.bool.isRequired
};
