import { _i18n } from "meteor/universe:i18n";
import { emptyCartStyles as styles } from "../../styles/cartDrawer";
import React, { Component, PropTypes } from "react";
import { Link } from "react-router";

const T = _i18n.createComponent("reaction.core.cartDrawer");

/**
 * @class EmptyCartDrawer
 * @classdesc
 */
export default class EmptyCartDrawer extends Component {
  render() {
    const { displayCart, pathname, onCartIconClick } = this.props;
    console.log("EmptyCartDrawer rendering...");
    return (
      <div>
        <div style={ styles }>
          <h1 className="ui center aligned icon header">
            <i className="small frown icon" style={{ fontSize: "2em" }}></i>
            <T>empty</T>
          </h1>
        </div>
        <Link
          to={ pathname }
          query={ !displayCart ? { cart: !displayCart } : {} }
          className="ui teal fluid large button"
          onClick={ onCartIconClick }
        >
          <T>keepShopping</T>
        </Link>
      </div>
    );
  }
}

EmptyCartDrawer.propTypes = {
  displayCart: PropTypes.bool.isRequired,
  pathname: PropTypes.string.isRequired,
  onCartIconClick: PropTypes.func.isRequired
};
