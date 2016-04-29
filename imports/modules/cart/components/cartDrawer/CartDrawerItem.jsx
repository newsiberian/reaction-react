import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
// import { ReactionCore } from "meteor/reactioncommerce:core";
import { browserHistory } from "react-router";
import IconButton from "material-ui/IconButton";
import GridTile from "material-ui/GridList/GridTile";
import ContentClear from "material-ui/svg-icons/content/clear";
import { checkObjectFitSupported } from "../../../../client/helpers/utilities";
import { getMedia } from "../../../../client/helpers/cart";
// import {
//   fakeImage, primaryImage, realImage, titleStyles, removeButtonStyle,
//   removeButtonIconStyle
// } from "../../styles/cartDrawerItem";
import { cardStyles } from "../../styles/cartDrawer";

class CartDrawerItem extends Component {
  render() {
    let image;
    const { cartActions, item, t } = this.props;
    const media = getMedia(item);
    const isObjectFitSupported = checkObjectFitSupported();

    // if (isObjectFitSupported) {
    if (media instanceof FS.File) {
      image = (
        <img
          // style={realImage}
          src={media.url({ store: "small" })}
          alt={item.variants.title}
        />
      );
    } else {
      image = (
        <img /*style={realImage}*/ src="/resources/placeholder.gif" alt="" />
      );
    }
    // TODO test this in IE
    // } else {
    //   if (media instanceof FS.File) {
    //     // todo looks like this is a wrong way to get media store from FS.File
    //     image = <div className={c(fakeImage, StyleSheet.create({ backgroundImage: `url(${media.url({ store: "small" })})`}))}></div>;
    //   } else {
    //     image = <div className={c(fakeImage, StyleSheet.create({ backgroundImage: "url(resources/placeholder.gif)" }))}></div>;
    //   }
    // }

    console.log("CartDrawerItem rendering...");
    return (
      <GridTile
        className="slick-slide"
        title={
          <span
            onClick={() =>
              browserHistory.push(`/shop/product/${item.productId}/${item.variants._id}`)}
            style={{cursor: "pointer", whiteSpace: "pre-wrap", fontSize: 15}}
            title={`${item.title} ${item.variants.title}`}
          >
            {item.title}
            {" "}
            <small>{item.variants.title}</small>
          </span>
        }
        subtitle={<span style={{fontSize: 15}}><b>{item.quantity}</b> {t("cart.pieces")}</span>}
        actionIcon={
          <IconButton
            onTouchTap={() => cartActions.removeCartItem(item._id)}
          >
            <ContentClear color="white" />
          </IconButton>
        }
        style={cardStyles}
        // titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
      >
        {image}
      </GridTile>
    );
    // return (
    //   <div className="slick-slide" style={cardStyles}>
    //     <div style={primaryImage}>
    //       {image}
    //     </div>
    //     <IconButton
    //       style={removeButtonStyle}
    //       // onClick={() => this.handleRemoveClick(media._id)}
    //     >
    //       <FontIcon className="fa fa-close" />
    //     </IconButton>
    //     {/*<button
    //       // className=""
    //       onClick={() => onRemoveCartItemClick(item._id)}
    //       style={removeButtonStyle}
    //     >
    //       <i className="big remove icon" style={removeButtonIconStyle} />
    //     </button>*/}
    //     <div /*className="center aligned content"*/ style={titleStyles}>
    //       <Link to={`/shop/product/${item.productId}/${item.variants._id}`}>
    //         <span className="ui grey circular label">{item.quantity}</span>
    //         <span>{item.variants.title}</span>
    //       </Link>
    //     </div>
    //   </div>
    // );
  }
}

CartDrawerItem.propTypes = {
  cartActions: PropTypes.shape({
    removeCartItem: PropTypes.func
  }).isRequired,
  item: PropTypes.object.isRequired,
  t: PropTypes.func
};

export default translate("reaction-react")(CartDrawerItem);
