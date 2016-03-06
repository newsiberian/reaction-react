import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { DragDropContext } from "react-dnd";
import { ReactionCore } from "meteor/reactioncommerce:core";
import HTML5Backend from "react-dnd-html5-backend";
import FontIcon from "material-ui/lib/font-icon";
import Paper from "material-ui/lib/paper";
import { formatPrice } from "../../../../client/helpers/i18n";
import ProductImageGalleryContainer from "../../containers/ProductImageGalleryContainer";
import ProductDetailEdit from "./edit/ProductDetailEdit";
import ProductTagInputForm from "./tags/ProductTagInputForm";
import ProductDetailTags from "./tags/ProductDetailTags";
import ProductMetaFieldForm from "./attributes/ProductMetaFieldForm";
import ProductMetaField from "./attributes/ProductMetaField";
import ProductSocial from "./ProductSocial";
import CartAddButton from "./CartAddButton";
import VariantList from "./variants/VariantList";
//import {
//  titleStyle, pageTitleStyle, descriptionStyle, vendorStyle, priceStyle,
//  inputHoverStyle, inputStyle
//} from "../../styles/productDetail";
import styles, {
  titleStyle, pageTitleStyle, descriptionStyle, vendorStyle, priceStyle,
  inputHoverStyle, inputStyle
} from "../../styles/productDetail";

// TODO babel @deco not supported in 1.3
// @DragDropContext(HTML5Backend)
class ProductDetail extends Component {
  handleProductVisibility(e, doVisible) {
    e.preventDefault();
    const { product, productActions } = this.props;
    productActions.toggleVisibility(product, doVisible);
  }

  renderProductVisibilityAdminBlock() {
    const { product, t } = this.props;
    return(
      <div className="row" /*style={{ flex: "1 1 auto" }}*/>
        <b>
          <FontIcon className="fa fa-exclamation-triangle" style={styles.icon} />
          {`${t("productDetail.productManagement")} `}
          {product.isVisible
            && (<span><a href="#" onClick={(e) => this.handleProductVisibility(e, false)}>
                {t("productDetail.makeInvisible")}
              </a>{" | "}</span>)}
          {ReactionCore.hasAdminAccess() &&
            <a href="#" ref="delete-product-link">{t("app.delete")}</a>}
        </b>
        {!product.isVisible && this.renderIsNotVisibleAlert()}
      </div>
    );
  }

  renderIsNotVisibleAlert() {
    const { t } = this.props;
    return(
      <Paper zDepth={2} style={styles.infoMessage}>
        {t("productDetail.isNotVisible")}
        &nbsp;
        <a href="#" onClick={(e) => this.handleProductVisibility(e, true)}>
          {t("productDetail.makeItVisible")}
        </a>
        &nbsp;
        {t("productDetail.whenYouAreDone")}
      </Paper>
    );
  }

  renderFieldComponent(options, index = 1) {
    const { product, productActions } = this.props;
    if (ReactionCore.hasPermission("createProduct")) {
      return (
        <ProductDetailEdit
          key={index}
          options={options}
          product={product}
          productActions={productActions}
        />);
    }
    // todo add markdown support here:
    return (
      <div
        key={ index }
        className={ options.className && options.className }
        style={ options.styles ? options.styles : {} }
      >
        { options.value }
      </div>
    );
  }

  renderTagsComponent() {
    const { permissions, tagsBundle } = this.props;

    if (permissions.createProduct) {
      return(
        <ProductTagInputForm
          tags={ tagsBundle.tags }
          tagValue={ tagsBundle.tagValue }
          tagsArray={ tagsBundle.tagsToArray() }
          getTagSuggestions={ tagsBundle.getTagSuggestions }
          onTagBlurred={ tagsBundle.onTagBlurred }
          onTagChange={ tagsBundle.onTagChange }
          onNewTagChange={ tagsBundle.onNewTagChange }
          onHashtagClick={ tagsBundle.onHashtagClick }
          onTagGroupRemove={ tagsBundle.onTagGroupRemove }
          moveTag={ tagsBundle.moveTag }
          hashtagMark={ tagsBundle.hashtagMark }
        />
      );
    }
    if (tagsBundle.tags) {
      return (
        <ProductDetailTags tags={ tagsBundle.tagsToArray() } />
      );
    }
    // todo add something like "there is no tags" span
    return false;
  }

  /**
   * @private
   * @function render
   * @description Render the meta block.
   */
  renderMetaComponent() {
    const { metaBundle, permissions } = this.props;
    if (permissions.createProduct) {
      return <ProductMetaFieldForm metaBundle={ metaBundle } />;
    }
    if (metaBundle.metafields) {
      return <ProductMetaField metafields={ metaBundle.metafields } />;
    }
    return false;
  }

  renderProductSocialManage() {
    // todo make this part work
    const { selectedProduct } = this.props;
    const social = [
      {
        name: "facebook", // name goes from Semantic UI icon name
        field: "facebookMsg",
        value: selectedProduct.facebookMsg
      },
      {
        name: "twitter",
        field: "twitterMsg",
        value: selectedProduct.facebookMsg
      },
      {
        name: "pinterest",
        field: "pinterestMsg",
        value: selectedProduct.pinterestMsg
      },
      {
        name: "google-plus",
        field: "googleplusMsg",
        value: selectedProduct.googleplusMsg
      }
    ];
    return (
      <div>
        { social.map((options, index) => {
          return(
            <a href="#" key={ index }>
              <i className={ `large ${options.name} icon` }></i>
            </a>
          );
        }) }
        <div>
          { social.map((options, index) => {
            { /* todo fix this */ }
            return this.renderFieldComponent(options, index);
          }) }
        </div>
      </div>
    );
  }

  render() {
    const { product } = this.props;
    //const {
    //  selectedProduct, selectedVariant, permissions, actualPrice,
    //  addToCartQuantity, onAddToCartClick, onAddToCartQuantityChange
    //} = this.props;
    const titleOptions = {
      field: "title",
      value: product.title,
      type: "input",
      styles: Object.assign({}, titleStyle, inputHoverStyle, inputStyle)
    };
    const pageTitleOptions = {
      field: "pageTitle",
      value: product.pageTitle,
      type: "input",
      styles: Object.assign({}, pageTitleStyle, inputHoverStyle, inputStyle)
    };
    const vendorOptions = {
      field: "vendor",
      value: product.vendor,
      type: "input",
      styles: Object.assign({}, vendorStyle, inputHoverStyle)
    };
    const descriptionOptions = {
      field: "description",
      value: product.description,
      type: "textarea",
      styles: Object.assign({}, descriptionStyle, inputHoverStyle),
      // className: "ui basic segment"
    };

    console.log("ProductDetail: rendering...");
    return (
      <section style={styles.container}>
        {ReactionCore.hasPermission("createProduct") &&
          this.renderProductVisibilityAdminBlock()}

        { /* Product Detail Page: BEGIN */ }
        <div className="row" itemScope itemType="http://schema.org/Product">
          <header style={styles.headerContainer}>
            <h1 itemProp="name">
              {this.renderFieldComponent(titleOptions)}
            </h1>
            <h2 itemProp="alternateName">
              {this.renderFieldComponent(pageTitleOptions)}
            </h2>
          </header>
        </div>
        { /* Product Detail Page: END */ }
      </section>
    );

    //return (
    //  <section className="ui fluid container basic segment">
    //    { permissions.createProduct && this.renderProductVisibilityAdminBlock() }
    //    <div className="ui basic segment" itemScope itemType="http://schema.org/Product">
    //      <div className="ui basic segment">
    //        <h1 className="ui centered header" itemProp="name">
    //          { this.renderFieldComponent(titleOptions) }
    //        </h1>
    //        <h2 className="ui centered header">
    //          { this.renderFieldComponent(pageTitleOptions) }
    //        </h2>
    //      </div>
    //      <div className="ui stackable grid">
    //        <div className="seven wide column">
    //          <ProductImageGalleryContainer
    //            product={ selectedProduct }
    //            selectedVariant={ selectedVariant }
    //            permissions={ permissions }
    //          />
    //          <h3><T>tags</T></h3>
    //          { this.renderTagsComponent() }
    //          <h3><T>details</T></h3>
    //          { this.renderMetaComponent() }
    //        </div>
    //        <div className="nine wide column">
    //
    //          { /* Price Fixation */ }
    //          <span itemProp="price" style={ priceStyle }>{ formatPrice(actualPrice()) }</span>
    //          <div>
    //            { this.renderFieldComponent(vendorOptions) }
    //          </div>
    //
    //          { /* Social Commentary */ }
    //          { /* todo fix following code */ }
    //          { permissions.createProduct
    //            ? this.renderProductSocialManage()
    //            : <ProductSocial /> }
    //
    //          { /* Description */ }
    //          { this.renderFieldComponent(descriptionOptions) }
    //
    //          { /* Variants & Options */ }
    //          <div className="ui basic segment">
    //            <h3 className="ui header"><T>options</T></h3>
    //            <VariantList />
    //          </div>
    //
    //          { /* Cart Add Block */ }
    //          <div className="ui basic segment">
    //            <CartAddButton
    //              addToCartQuantity={ addToCartQuantity }
    //              onAddToCartClick={ onAddToCartClick }
    //              onAddToCartQuantityChange={ onAddToCartQuantityChange }
    //            />
    //          </div>
    //        </div>
    //      </div>
    //    </div>
    //  </section>
    //);
  }
}

ProductDetail.propTypes = {
  product: PropTypes.object.isRequired,
  productActions: PropTypes.shape({
    setProductId: PropTypes.func,
    setVariantId: PropTypes.func,
    toggleVisibility: PropTypes.func
  }).isRequired,
  t: PropTypes.func.isRequired
  //selectedProduct: PropTypes.object.isRequired,
  //selectedVariant: PropTypes.oneOfType([
  //  PropTypes.object,
  //  PropTypes.bool
  //]),
  //permissions: PropTypes.object.isRequired,
  //actualPrice: PropTypes.func.isRequired,
  //onInputChange: PropTypes.func.isRequired,
  //onInputBlur: PropTypes.func.isRequired,
  //addToCartQuantity: PropTypes.number.isRequired,
  //onAddToCartClick: PropTypes.func.isRequired,
  //onAddToCartQuantityChange: PropTypes.func.isRequired,
  //tagsBundle: PropTypes.shape({
  //  tags: PropTypes.object,
  //  tagValue: PropTypes.string,
  //  tagsToArray: PropTypes.func.isRequired,
  //  getTagSuggestions: PropTypes.func.isRequired,
  //  onTagBlurred: PropTypes.func.isRequired,
  //  onTagChange: PropTypes.func.isRequired,
  //  onNewTagChange: PropTypes.func.isRequired,
  //  onHashtagClick: PropTypes.func.isRequired,
  //  onTagGroupRemove: PropTypes.func.isRequired,
  //  moveTag: PropTypes.func.isRequired,
  //  hashtagMark: PropTypes.func.isRequired
  //}),
  //metaBundle: PropTypes.shape({
  //  metafields: PropTypes.array,
  //  newMetafield: PropTypes.object,
  //  onChange: PropTypes.func.isRequired,
  //  onBlur: PropTypes.func.isRequired,
  //  onRemoveClick: PropTypes.func.isRequired
  //})
};

export default translate("core")(ProductDetail);
