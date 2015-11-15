/**
 * @classdesc This is "cartIcon" Reaction template ported to React
 */

import { showCartIconWarning } from '/common/helpers/cart'

export default class CartIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cartCount: 0 };
  }

  render() {
    return (
      <a className="item">
        <i className="cart large icon"></i>
        <div className="floating ui red label" style={{ left: 0 }}>!</div>
        <div className="floating ui teal label">{ this.state.cartCount }</div>
      </a>
    );
  }
}

CartIcon.propTypes = {};
