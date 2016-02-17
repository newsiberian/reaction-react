// import { _i18n } from "meteor/universe:i18n";
//import { _i18n } from "meteor/universe:i18n";
import CartSubTotals from "./CartSubTotals.jsx";
import CartDrawerItem from "./CartDrawerItem.jsx";
// fixme
// import Slider from "meteor/universe:carousel";
import { openCartStyles as styles, cardStyles } from "../../styles/cartDrawer";

//const T = _i18n.createComponent("reaction.core.cartDrawer");
import React, { Component, PropTypes } from "react";
import { Link } from "react-router";

/**
 * @class OpenCartDrawer
 * @classdesc
 */
export default class OpenCartDrawer extends Component {
  componentDidMount() {
    const elem = document.getElementsByClassName("slick-track");
    if (elem[0] instanceof HTMLDivElement) {
      elem[0].classList.add("ui");
      elem[0].classList.add("cards");
    }
  }

  render() {
    //const { cart, media, onRemoveCartItemClick } = this.props;
    //const slidesToShow = Math.floor(window.innerWidth / cardStyles.width);
    //const settings = {
    //  adaptiveHeight: false,
    //  arrows: false,
    //  dots: false,
    //  infinite: false,
    //  speed: 500,
    //  slidesToShow: slidesToShow,
    //  slidesToScroll: 1,
    //  swipe: true,
    //  swipeToSlide: true,
    //  vertical: false
    //};
    console.log("OpenCartDrawer rendering...");
    return <div></div>;
    //return (
    //  <div>
    //    <Slider { ...settings } style={ styles }>
    //      <CartSubTotals cart={ cart }/>
    //      { cart.items.map(item => {
    //        return (
    //          <CartDrawerItem
    //            key={ item._id }
    //            item={ item }
    //            media={ media }
    //            onRemoveCartItemClick={ onRemoveCartItemClick }
    //          />
    //        );
    //      }) }
    //    </Slider>
    //    <Link to="/checkout" className="ui green fluid large button">
    //      <T>checkout</T>
    //    </Link>
    //  </div>
    //);
  }
}

OpenCartDrawer.propTypes = {
  cart: PropTypes.object.isRequired,
  media: PropTypes.func.isRequired,
  onRemoveCartItemClick: PropTypes.func.isRequired
};
