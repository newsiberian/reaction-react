import React, { Component, PropTypes } from "react";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { FS } from "meteor/cfs:base-package";
import GridControls from "./GridControls.jsx";
import GridContent from "./GridContent.jsx";
import GridNotice from "./GridNotice.jsx";
import { formatPrice } from "../../../../client/helpers/i18n";
import { checkObjectFitSupported } from "../../../../client/helpers/utilities";
import { Link } from "react-router";
import {
  styles,
  linkStyles,
  fakeImage,
  primatyImage,
  additionalImages,
  additianalImage,
  realImage,
  realAdditionalImage,
  productMedium,
  productLarge,
  productSmall
} from "../../styles/productsGridItem";

const getMedia = _id => {
  const media = ReactionCore.Collections.Media.findOne({
    "metadata.productId": _id,
    "metadata.priority": 0,
    "metadata.toGrid": 1
  }, { sort: { uploadedAt: 1 } });

  return media instanceof FS.File ? media : false;
};

const getAdditionalMedia = _id => {
  const mediaArray = ReactionCore.Collections.Media.find({
    "metadata.productId": _id,
    "metadata.priority": {
      $gt: 0
    },
    "metadata.toGrid": 1
  }, { limit: 3 });

  if (mediaArray.count() > 1) {
    return mediaArray;
  }

  return false;
};

class ProductsGridItem extends Component {
  constructor(props) {
    super(props);
    //this.handlerPublishProductClick =
    //  this.handlerPublishProductClick.bind(this.props.product);
    //this.handlerShowProductSettings =
    //  this.handlerShowProductSettings.bind(this.props.product);
  }
  /*
  shouldComponentUpdate(nextProps) {
    if (this.props.product.isVisible !== nextProps.product.isVisible) {
      return false
    }
  }*/

  //media() {
  //  const media = ReactionCore.Collections.Media.findOne({
  //    "metadata.productId": this.props.product._id,
  //    "metadata.priority": 0,
  //    "metadata.toGrid": 1
  //  }, { sort: { uploadedAt: 1 } });
  //
  //  //return media instanceof FS.File ? media : false;
  //}

  //additionalMedia() {
  //  const mediaArray = ReactionCore.Collections.Media.find({
  //    "metadata.productId": this.props.product._id,
  //    "metadata.priority": {
  //      $gt: 0
  //    },
  //    "metadata.toGrid": 1
  //  }, { limit: 3 });
  //
  //  if (mediaArray.count() > 1) {
  //    return mediaArray;
  //  }
  //
  //  return false;
  //}

  weightClass() {
    const position = this.props.product.position || {};
    const weight = position.weight || 0;
    switch (weight) {
    case 1:
      return productMedium;
    case 2:
      return productLarge;
    default:
      return productSmall;
    }
  }

  isMediumWeight() {
    const position = this.props.product.position || {};
    const weight = position.weight || 0;

    return weight === 1;
  }

  //isSoldOut() {
  //  return this.props.product.isSoldOut;
  //}
  //
  //isBackorder() {
  //  return this.props.product.isBackorder;
  //}
  //
  //isLowQuantity() {
  //  return this.props.product.isLowQuantity;
  //}
  //
  //displayPrice() {
  //  // I don't think we need a check here
  //  return getProductPriceRange(this.props.product.price);
  //}

  handlerPublishProductClick() {
    /*let self;
    self = this;*/
    Meteor.call("products/publishProduct", this._id, (error, result) => {
      if (error) {
        //Alerts.add(error, "danger", {
        //  placement: "productGridItem",
        //  id: this._id
        //});
        return {};
      }
      // todo у нас нет алертов пока что.
      /*if (result === true) {
        return Alerts.add(self.title + " is now visible", "success", {
          placement: "productGridItem",
          type: self._id,
          id: self._id,
          i18nKey: "productDetail.publishProductVisible",
          autoHide: true,
          dismissable: false
        });
      }
      return Alerts.add(self.title + " is hidden", "warning", {
        placement: "productGridItem",
        type: self._id,
        id: self._id,
        i18nKey: "productDetail.publishProductHidden",
        autoHide: true,
        dismissable: false
      });*/
    });
  }

  handlerShowProductSettings(/*event*/) {
    //event.preventDefault();

    // todo Переделать этот код.
    //ReactionCore.showActionView({
    //  label: "Edit Product",
    //  template: "productSettings",
    //  type: "product",
    //  data: this
    //});
  }

  renderMedia() {
    let image;
    const { product } = this.props;
    // we use "call" here because it is important for now to save reaction
    // methods "as it is" with minimum changes.
    const media = getMedia(product._id);
    const isObjectFitSupported = checkObjectFitSupported();

    if (isObjectFitSupported) {
      if (media instanceof FS.File) { // typeof media === "object"
        // todo looks like this is a wrong way to get media store from FS.File
        image = <img style={ realImage } src={ media.url({ store: "large" }) } alt={ media.name() } />;
      } else {
        image = <img style={ realImage } src="resources/placeholder.gif" alt="" />;
      }
    } else {
      if (media instanceof FS.File) {
        // todo looks like this is a wrong way to get media store from FS.File
        image = <div style={ [fakeImage, { backgroundImage: `url(${media.url({ store: "large" })})` }] }></div>;
      } else {
        image = <div style={ [fakeImage, { backgroundImage: "url(resources/placeholder.gif)" }] }></div>;
      }
    }
    //<a
    //  className="image"
    //  href={ FlowRouter.path("product", { _id: this.props.product.handle }) }
    //  style={ linkStyles }
    //  >
    //  <div style={ primatyImage }>
    //    { image }
    //  </div>
    //  { this.renderAdditionalMedia(isObjectFitSupported) }
    //</a>
    return (
      <Link
        className="image"
        to={ `/shop/product/${ product.handle }` }
        style={ linkStyles }
      >
        <div style={ primatyImage }>
          { image }
        </div>
        { this.renderAdditionalMedia(isObjectFitSupported) }
      </Link>
    );
  }

  renderAdditionalMedia(isObjectFitSupported) {
    const additionalMedia = getAdditionalMedia(this.props.product._id);

    // todo проверить эту функцию на работоспособность
    if (additionalMedia) {
      if (this.isMediumWeight()) {
        if (isObjectFitSupported) {
          return (
            <div style={ additionalImages }>
              { additionalMedia.fetch().map((media, i) => {
                return (
                  <img
                    key={ i }
                    style={ realAdditionalImage }
                    src={ media.url({ store: "medium" }) }
                    alt={ media.name() }
                    />
                )
              }) }
            </div>
          );
        } else {
          return (
            <div style={ additionalImages }>
              { additionalMedia.fetch().map((media, i) => {
                return (
                  <div
                    key={ i }
                    style={ [additianalImage, fakeImage,
                      { backgroundImage: `url(${media.url({ store: "medium" })})` }
                    ] }
                  >
                  </div>);
              }) }
            </div>
          );
        }
      }
    }
    return false;
  }

  render() {
    const {
      _id, handle, title, isSoldOut, isBackorder, isLowQuantity, price
    } = this.props.product;
    let gridControls = false;
    const formatedPrice = formatPrice(price);

    if (ReactionCore.hasPermission("createProduct")) {
      gridControls = (<GridControls
        product={this.props.product}
        isVisible={this.props.product.isVisible}
        onPublishProductClick={() => this.handlerPublishProductClick()}
        onShowProductSettings={() => this.handlerShowProductSettings()}
      />);
    }

    console.log("ProductGridItem: rendering...");
    // todo do we really need data-tags here?
    // style={ this.weightClass.call(product) }
    return (
      // class="product-grid-item" card
      <div
        className="col-xs-12
                col-sm-6
                col-md-4
                col-lg-3"
        //data-id={_id}
        //style={Object.assign({}, styles, this.weightClass())}
        style={styles}
      >
        <GridNotice
          isSoldOut={isSoldOut}
          isBackorder={isBackorder}
          isLowQuantity={isLowQuantity}
        />
        {/* todo добавить сюда product-grid-item-alerts */}
        { this.renderMedia() }
        { gridControls }
        <GridContent
          handle={handle}
          title={title}
          price={formatedPrice}
        />
      </div>
    );
  }
}

ProductsGridItem.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductsGridItem;
