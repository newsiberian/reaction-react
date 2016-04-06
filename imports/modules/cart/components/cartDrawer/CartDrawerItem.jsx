import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { StyleSheet } from "react-look";
import { Link } from "react-router";
import IconButton from "material-ui/lib/icon-button";
import GridTile from "material-ui/lib/grid-list/grid-tile";
import ContentClear from "material-ui/lib/svg-icons/content/clear";
import { checkObjectFitSupported } from "../../../../client/helpers/utilities";
import {
  fakeImage, primaryImage, realImage, titleStyles, removeButtonStyle,
  removeButtonIconStyle
} from "../../styles/cartDrawerItem";
import { cardStyles } from "../../styles/cartDrawer";

const c = StyleSheet.combineStyles;

const getMedia = (item) => {
  // const product = ReactionCore.Collections.Products.findOne(item.productId);
  const defaultImage = ReactionCore.Collections.Media.findOne({
    "metadata.variantId": item.variants._id
  });

  if (defaultImage) {
    return defaultImage;
    // if this variant doesn't have a photo, it could mean that his photo could
    // be found in upper level inside top level variant
  } else if (item.variants.ancestors.length > 1) {
    const topVariant = ReactionCore.Collections.Products.findOne({
      _id: item.variants.ancestors[1]
    });
    return ReactionCore.Collections.Media.findOne({
      "metadata.variantId": topVariant._id
    });
  }
};

class CartDrawerItem extends Component {
  render() {
    let image;
    const { cartActions, item, t } = this.props;
    const media = getMedia(item);
    const isObjectFitSupported = checkObjectFitSupported();

    if (isObjectFitSupported) {
      if (media instanceof FS.File) {
        image = (
          <img
            style={realImage}
            src={media.url({ store: "small" })}
            alt={media.name()}
          />
        );
      } else {
        image = (
          <img style={realImage} src="/resources/placeholder.gif" alt="" />
        );
      }
    } else {
      if (media instanceof FS.File) {
        // todo looks like this is a wrong way to get media store from FS.File
        image = <div className={c(fakeImage, StyleSheet.create({ backgroundImage: `url(${media.url({ store: "small" })})`}))}></div>;
      } else {
        image = <div className={c(fakeImage, StyleSheet.create({ backgroundImage: "url(resources/placeholder.gif)" }))}></div>;
      }
    }

    console.log("CartDrawerItem rendering...");
    return (
      <GridTile
        className="slick-slide"
        title={
          <Link
            to={`/shop/product/${item.productId}/${item.variants._id}`}
            style={{ textDecoration: "none", color: "#fff" }}
          >
            <span>{item.variants.title}</span>
          </Link>
        }
        subtitle={<span><b>{item.quantity}</b> {t("cart.pieces")}</span>}
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
