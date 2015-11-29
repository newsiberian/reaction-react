/**
 * This is an implementation of Reaction "productGridItems" template which is
 * renamed to "productGridItem"
 */

import Radium from '/myPackages/radium';
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
} from '../../styles/productGridItem';
import GridControls from './GridControls';
import GridContent from './GridContent';
import GridNotice from './GridNotice';
import { getProductPriceRange } from '/common/helpers/products';
import { checkObjectFitSupported } from '/common/helpers/utilities';

const { Component, PropTypes } = React;
const { Link } = ReactRouter;

@Radium
/**
 * @class ProductGridItem
 */
export default class ProductGridItem extends Component {
  constructor(props) {
    super(props);
    this.isSoldOut = this.isSoldOut.bind(this.props.data);
    this.isBackorder = this.isBackorder.bind(this.props.data);
    this.isLowQuantity = this.isLowQuantity.bind(this.props.data);
    this.displayPrice = this.displayPrice.bind(this.props.data);
    this.handlerPublishProductClick = this.handlerPublishProductClick.bind(this.props.data);
    this.handlerShowProductSettings = this.handlerShowProductSettings.bind(this.props.data);
  }

  /*shouldComponentUpdate(nextProps) {
    if (this.props.data.isVisible !== nextProps.data.isVisible) {
      return false
    }
  }*/

  /**
   * @this this.props.data
   */
  media() {
    let defaultImage;
    let variantId;
    let variants = [];
    for (let variant of this.variants) {
      if (!variant.parentId) {
        variants.push(variant);
      }
    }
    if (variants.length > 0) {
      variantId = variants[0]._id;
      defaultImage = ReactionCore.Collections.Media.findOne({
        "metadata.variantId": variantId,
        "metadata.priority": 0
      });
    }
    if (defaultImage) {
      return defaultImage;
    }
    return false;
  }

  /**
   * @this this.props.data
   */
  additionalMedia() {
    let mediaArray;
    let variantId;
    let variants = [];

    for (let variant of this.variants) {
      if (!variant.parentId) {
        variants.push(variant);
      }
    }

    if (variants.length > 0) {
      variantId = variants[0]._id;
      mediaArray = ReactionCore.Collections.Media.find({
        "metadata.variantId": variantId,
        "metadata.priority": {
          $gt: 0
        }
      }, {
        limit: 3
      });
    }
    if (mediaArray.count() > 1) {
      return mediaArray;
    }
    return false;
  }

  /**
   * @this this.props.data
   */
  weightClass() {
    let position = this.position || {};
    let weight = position.weight || 0;
    switch (weight) {
      case 1:
        return productMedium;
      case 2:
        return productLarge;
      default:
        return productSmall;
    }
  }

  /**
   * @this this.props.data
   */
  isMediumWeight() {
    let position = this.position || {};
    let weight = position.weight || 0;

    //if (weight === 1) {
    return weight === 1;
    //}
    //return false;
  }

  /**
   * @this this.props.data
   */
  isSoldOut() {
    let variants = [];
    for (let variant of this.variants) {
      if (!variant.parentId) {
        variants.push(variant);
      }
    }

    if (variants.length > 0) {
      for (let variant of variants) {
        if (!variant.inventoryManagement || variant.inventoryQuantity > 0) {
          return false;
        }
      }
      return true;
    }
  }

  /**
   * @this this.props.data
   */
  isBackorder() {
    let variants = [];
    for (let variant of this.variants) {
      if (!variant.parentId) {
        variants.push(variant);
      }
    }
    if (variants.length > 0) {
      for (let variant of variants) {
        if (!variant.inventoryManagement || variant.inventoryQuantity > 0) {
          return false;
        }
      }
      for (let variant of variants) {
        if (!variant.inventoryPolicy) {
          return true;
        }
      }
      return false;
    }
  }

  /**
   * @this this.props.data
   */
  isLowQuantity() {
    let variants = [];
    for (let variant of this.variants) {
      if (!variant.parentId) {
        variants.push(variant);
      }
    }
    if (variants.length > 0) {
      for (let variant of variants) {
        if (variant.inventoryQuantity <= variant.lowInventoryWarningThreshold) {
          return true;
        }
      }
    } else {
      return false;
    }
  }

  // moved to helpers/utilities
  //checkObjectFitSupported() {
  //  return 'objectFit' in document.documentElement.style
  //}

  /**
   * GridContent method
   */
  displayPrice() {
    if (this._id) {
      return getProductPriceRange(this._id);
    }
  }

  /**
   * @this this.props.data
   */
  handlerPublishProductClick() {
    /*let self;
    self = this;*/
    Meteor.call("products/publishProduct", this._id, (error, result) => {
      if (error) {
        Alerts.add(error, "danger", {
          placement: "productGridItem",
          id: this._id
        });
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
    ReactionCore.showActionView({
      label: "Edit Product",
      template: "productSettings",
      type: "product",
      data: this
    });
  }

  renderMedia() {
    let image;
    const { data } = this.props;
    // we use 'call' here because it is important for now to save reaction
    // methods 'as it is' with minimum changes.
    const media = this.media.call(data);
    const isObjectFitSupported = checkObjectFitSupported();

    if (isObjectFitSupported) {
      if (media instanceof FS.File) { // typeof media === 'object'
        // todo looks like this is a wrong way to get media store from FS.File
        image = <img style={ realImage } src={ media.url({ store: 'large' }) } alt={ media.name() } />;
      } else {
        image = <img style={ realImage } src="resources/placeholder.gif" alt="" />;
      }
    } else {
      if (media instanceof FS.File) {
        // todo looks like this is a wrong way to get media store from FS.File
        image = <div style={ [fakeImage, { backgroundImage: `url(${media.url({ store: 'large' })})` }] }></div>;
      } else {
        image = <div style={ [fakeImage, { backgroundImage: 'url(resources/placeholder.gif)' }] }></div>;
      }
    }
    //<a
    //  className="image"
    //  href={ FlowRouter.path('product', { _id: this.props.data.handle }) }
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
        to={ `/shop/product/${ data.handle }` }
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
    const additionalMedia = this.additionalMedia.call(this.props.data);

    // todo проверить эту функцию на работоспособность
    if (additionalMedia) {
      if (this.isMediumWeight.call(this.props.data)) {
        if (isObjectFitSupported) {
          return (
            <div style={ additionalImages }>
              { additionalMedia.fetch().map((media, i) => {
                return (
                  <img
                    key={ i }
                    style={ realAdditionalImage }
                    src={ media.url({ store: 'medium' }) }
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
                      { backgroundImage: `url(${media.url({ store: 'medium' })})` }
                    ] }
                  >
                  </div>);
              }) }
            </div>
          );
        }
      }
    }
    return false
  }

	render() {
    const { data } = this.props;
    let gridControls = false;

    if (ReactionCore.hasPermission("createProduct")) {
      gridControls = <GridControls
        //data={ data }
        isVisible={ data.isVisible }
        onPublishProductClick={ this.handlerPublishProductClick }
        onShowProductSettings={ this.handlerShowProductSettings }
        />
    }

		console.log('ProductGridItem: rendering...');
    // todo do we really need data-tags here?
    // style={ this.weightClass.call(data) }
		return (
			// class="product-grid-item" card
			<div className="card" data-id={ data._id } style={ [styles, this.weightClass.call(data)] }>
        <GridNotice
          isSoldOut={ this.isSoldOut }
          isBackorder={ this.isBackorder }
          isLowQuantity={ this.isLowQuantity }
        />
        {/* todo добавить сюда product-grid-item-alerts */}
        { this.renderMedia() }
        { gridControls }
        <GridContent handle={ data.handle } title={ data.title } displayPrice={ this.displayPrice } />
			</div>
		);
	}
}

ProductGridItem.propTypes = {
  data: PropTypes.object.isRequired
};
