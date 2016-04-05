import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { browserHistory } from "react-router";
import FlatButton from "material-ui/lib/flat-button";
import CartSubTotals from "./CartSubTotals.jsx";
import CartDrawerItem from "./CartDrawerItem.jsx";
// fixme
// import Slider from "meteor/universe:carousel";
import { openCartStyles as styles, cardStyles, cartButton } from "../../styles/cartDrawer";

class OpenCartDrawer extends Component {
  componentDidMount() {
    const elem = document.getElementsByClassName("slick-track");
    if (elem[0] instanceof HTMLDivElement) {
      elem[0].classList.add("ui");
      elem[0].classList.add("cards");
    }
  }

  render() {
    const { cart, cartActions,  media, t } = this.props;
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
    return (
     <div>
       <Slider {...settings} style={styles}>
         <CartSubTotals cart={cart} />
         {cart.items.map(item => {
           return (
             <CartDrawerItem
               key={item._id}
               item={item}
               media={media}
               // onRemoveCartItemClick={onRemoveCartItemClick}
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
    toggleCart: PropTypes.func
  }).isRequired,
  media: PropTypes.func.isRequired,
  t: PropTypes.func
};

export default translate("core")(OpenCartDrawer);
