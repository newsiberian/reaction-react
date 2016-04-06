import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { browserHistory } from "react-router";
import Slider from "react-slick";
import FlatButton from "material-ui/lib/flat-button";
import CartSubTotals from "./CartSubTotals.jsx";
import CartDrawerItem from "./CartDrawerItem.jsx";
import { openCartStyles, cardStyles, cartButton } from "../../styles/cartDrawer";
import "../../styles/slick.css";

class OpenCartDrawer extends Component {
  componentDidMount() {
    // const elem = document.getElementsByClassName("slick-track");
    // if (elem[0] instanceof HTMLDivElement) {
    //   elem[0].classList.add("ui");
    //   elem[0].classList.add("cards");
    // }
  }

  render() {
    const { cart, cartActions, locale, t } = this.props;
    const slidesToShow = Math.floor(window.innerWidth / cardStyles.width);
    const settings = {
      adaptiveHeight: false,
      arrows: false,
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: slidesToShow,
      slidesToScroll: 1,
      swipe: true,
      swipeToSlide: true,
      vertical: false
    };
    console.log("OpenCartDrawer rendering...");
    return (
     <div style={openCartStyles}>
       <Slider {...settings}>
         <CartSubTotals cart={cart} locale={locale} />
         {cart.items.map(item => {
           return (
             <CartDrawerItem
               key={item._id}
               item={item}
               cartActions={cartActions}
             />
           );
         })}
       </Slider>
       <FlatButton
         backgroundColor="#f0ad4e"
         hoverColor="#DEA048"
         label={t("cartDrawer.checkout")}
         onTouchTap={() => browserHistory.push("/checkout")}
         style={cartButton}
         labelStyle={{ color: "#fff" }}
       />
     </div>
    );
  }
}

OpenCartDrawer.propTypes = {
  cart: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    items: PropTypes.array,
    cartCount: PropTypes.func
  }),
  cartActions: PropTypes.shape({
    removeCartItem: PropTypes.func,
    toggleCart: PropTypes.func
  }).isRequired,
  locale: PropTypes.shape({
    currency: PropTypes.object,
    language: PropTypes.string,
    locale: PropTypes.object,
    shopCurrency: PropTypes.object
  }).isRequired,
  t: PropTypes.func
};

export default translate("core")(OpenCartDrawer);
