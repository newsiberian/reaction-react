import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { StyleSheet } from "react-look";
import { DragDropContext } from "react-dnd";
import Helmet from "react-helmet";
import { ReactionCore } from "meteor/reactioncommerce:core";
import HTML5Backend from "react-dnd-html5-backend";
import FontIcon from "material-ui/lib/font-icon";
import Paper from "material-ui/lib/paper";
import { formatPrice } from "../../../../client/helpers/i18n";
import { getVariants, getProductPriceRange } from "../../../../client/helpers/products";
import ProductImageGalleryContainer from "../../containers/ProductImageGalleryContainer";
import CommentsContainer from "../../../comments/containers/CommentsContainer.jsx";
import ProductDetailEdit from "./edit/ProductDetailEdit";
import ProductTagInputForm from "./tags/ProductTagInputForm";
import ProductDetailTags from "./tags/ProductDetailTags";
import ProductMetaFieldForms from "./attributes/ProductMetaFieldForms";
import ProductMetaField from "./attributes/ProductMetaField";
import Description from "./edit/Description.jsx";
import ProductSocial from "./ProductSocial";
import CartAddButton from "./CartAddButton";
import VariantList from "./variants/VariantList";
import styles, { editStyles, priceStyle } from "../../styles/productDetail";

const c = StyleSheet.combineStyles;

const getOptions = (field, product) => {
  const isAdmin = ReactionCore.hasPermission("createProduct");
  switch(field) {
  case "title":
    return {
      field: "title",
      value: product[field],
      className: isAdmin ? c(editStyles.input, editStyles.title, editStyles.hover) :
        editStyles.title
    };
  case "pageTitle":
    return {
      field: "pageTitle",
      value: product[field],
      className: isAdmin ? c(editStyles.pageTitle, editStyles.input, editStyles.hover) :
        editStyles.pageTitle
    };
  case "vendor":
    return {
      field: "vendor",
      value: product[field],
      className: isAdmin ? c(editStyles.input, editStyles.vendor, editStyles.hover) :
        editStyles.vendor
    };
  default:
    return null; // should not fires
  }
};

const social = [
  {
    name: "facebook", // name goes from Semantic UI icon name
    field: "facebookMsg"
  },
  {
    name: "twitter",
    field: "twitterMsg"
  },
  {
    name: "pinterest",
    field: "pinterestMsg"
  },
  {
    name: "google-plus",
    field: "googleplusMsg"
  }
];

const actualPrice = (current, productId) => {
  if (current && typeof current._id === "string") {
    const childVariants = getVariants(current._id);
    if (childVariants.length === 0) {
      return current.price;
    }
    return getProductPriceRange(productId).range;
  }
};

// TODO babel @deco not supported in 1.3
// @DragDropContext(HTML5Backend)
class ProductDetail extends Component {
  handleProductVisibility(e, doVisible) {
    e.preventDefault();
    const { product, productActions } = this.props;
    productActions.validateBeforeToggleVisibility(product, doVisible);
  }

  renderProductVisibilityAdminBlock() {
    const { product, t } = this.props;
    return(
      <div className="row" /*style={{ flex: "1 1 auto" }}*/>
        <b style={{ flex: "1 1 100%" }}>
          <FontIcon className="fa fa-exclamation-triangle" style={styles.icon} />
          {`${t("productDetail.productManagement")} `}
          {product.isVisible
            && (<span><a href="#" onClick={(e) => this.handleProductVisibility(e, false)}>
                {t("productDetail.makeInvisible")}
              </a>{" • "}</span>)}
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
    const { product, productActions, productState } = this.props;
    if (ReactionCore.hasPermission("createProduct")) {
      return (
        <ProductDetailEdit
          key={index}
          // field={field}
          options={options}
          product={product}
          productActions={productActions}
          productState={productState}
        />);
    }

    // todo add markdown support here:
    return (
      <div className={options.className}>
        {options.value}
      </div>
    );
  }

  renderTagsComponent() {
    const { product, tags, tagActions, tagsIdsArray, newTag } = this.props;

    if (ReactionCore.hasPermission("createProduct")) {
      return(
        <ProductTagInputForm
          productId={product._id}
          tags={tags}
          tagActions={tagActions}
          tagsIdsArray={tagsIdsArray}
          newTag={newTag}
        />
      );
    }
    return (
      <ProductDetailTags tags={tags} />
    );
  }

  renderMetaComponent() {
    const { product, metafieldActions, newMetafield } = this.props;
    if (ReactionCore.hasPermission("createProduct")) {
      return (
        <ProductMetaFieldForms
          product={product}
          metafieldActions={metafieldActions}
          newMetafield={newMetafield}
        />
      );
    }
    if (product.metafields.length) {
      return <ProductMetaField metafields={product.metafields} />;
    }
  }

  renderProductSocialManage() {
    // todo make this part work
    const { selectedProduct } = this.props;

    return (
      <div>
        {social.map((options, index) => {
          return(
            <a href="#" key={index}>
              <i className={`large ${options.name} icon`} />
            </a>
          );
        })}
        <div>
          {social.map((options, index) => {
            {/* todo fix this */}
            return this.renderFieldComponent(options, index);
          })}
        </div>
      </div>
    );
  }

  render() {
    const {
      locale, product, productActions, productState, selectedVariant, t
    } = this.props;

    // caching permission check
    const isAdmin = ReactionCore.hasPermission("createProduct");
    console.log("ProductDetail: rendering...");
    return (
      <section className="container-fluid" style={styles.container}>
        {/* Headers */}
        <Helmet
          title={product.title}
          titleTemplate={`${ReactionCore.getShopName()} • ${product.pageTitle}`}
          meta={[
            {charset: "utf-8"}
          ]}
        />

        {isAdmin && this.renderProductVisibilityAdminBlock()}

        {/* Product Detail Page: BEGIN */}
        <div className="row" itemScope itemType="http://schema.org/Product">
          {/* Titles */}
          <header className="col-xs-12">
            <h1 itemProp="name" style={styles.titleHeader}>
              {this.renderFieldComponent(getOptions("title", product))}
            </h1>
            <h2 itemProp="alternateName" style={styles.pageTitleHeader}>
              {this.renderFieldComponent(getOptions("pageTitle", product))}
            </h2>
          </header>
          {/* Product Details */}
          <section className="col-xs-12">
            <div className="row">
              <div className="col-xs-12 col-sm-5">
                {/* Image Gallery */}
                <ProductImageGalleryContainer
                  product={product}
                  selectedVariant={selectedVariant}
                />
                <h3>{t("productDetail.tags")}</h3>
                {this.renderTagsComponent()}
                {(product.metafields.length || // display header for admin or if
                  isAdmin) && // array not empty
                  <h3>{t("productDetail.details")}</h3>}
                {this.renderMetaComponent()}
              </div>
              <div className="col-xs-12 col-sm-7">
                <div>
                  {/* Price Fixation */}
                  <span itemProp="price" className={priceStyle}>
                    {formatPrice(actualPrice(selectedVariant, product._id), locale)}
                  </span>

                  {/* Vendor */}
                  <div itemProp="manufacturer">
                    {product.vendor && `${t("productDetailEdit.vendor")}: `}
                    {this.renderFieldComponent(getOptions("vendor", product))}
                  </div>

                 {/* Social Commentary */}
                 {/* TODO fix following code */}
                 {/*isAdmin ? this.renderProductSocialManage() :
                   <ProductSocial />
                 */}
                </div>

                {/* Main product information */}
                <div>
                  {/* Description */}
                  <div
                    className={isAdmin ? // styles from Editor
                      c(editStyles.input, editStyles.description, editStyles.hover) :
                      editStyles.description}
                    itemProp="description"
                  >
                    <Description
                      productId={product._id}
                      description={product.description}
                      descriptionState={productState.description}
                      rollbackFieldState={productActions.rollbackFieldState}
                      updateProductField={productActions.updateProductField}
                    />
                  </div>

                  {/* Variants & Options */}
                  <div>
                    <h3>{t("productDetail.options")}</h3>
                    <VariantList
                      locale={locale}
                      productId={product._id}
                      selectedVariant={selectedVariant}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* Product Detail Page: END */}
        {/* Comments Section */}
        <CommentsContainer sourceId={product._id} />
      </section>
    );

    // return (
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
    // );
  }
}

ProductDetail.propTypes = {
  locale: PropTypes.shape({
    currency: PropTypes.object,
    language: PropTypes.string,
    locale: PropTypes.object,
    shopCurrency: PropTypes.object
  }).isRequired,
  product: PropTypes.object.isRequired,
  selectedVariant: PropTypes.object,
  productActions: PropTypes.shape({
    setProductId: PropTypes.func,
    setVariantId: PropTypes.func,
    publishProduct: PropTypes.func,
    changeProductField: PropTypes.func,
    updateProductField: PropTypes.func,
    rollbackFieldState: PropTypes.func,
    validateBeforeToggleVisibility: PropTypes.func
  }).isRequired,
  productState: PropTypes.shape({ // product state from `store`
    title: PropTypes.object,
    pageTitle: PropTypes.object,
    vendor: PropTypes.object,
    description: PropTypes.object,
    productId: PropTypes.string,
    variantId: PropTypes.string
  }),
  tags: PropTypes.arrayOf(PropTypes.object),
  tagActions: PropTypes.shape({
    changeTag: PropTypes.func,
    changeNewTag: PropTypes.func,
    clearNewTagName: PropTypes.func,
    removeTag: PropTypes.func,
    updateTag: PropTypes.func,
    syncTags: PropTypes.func,
    moveTag: PropTypes.func,
    dropTag: PropTypes.func,
    clearSuggestions: PropTypes.func,
    updateSuggestions: PropTypes.func
  }).isRequired,
  tagsIdsArray: PropTypes.arrayOf(PropTypes.string),
  newTag: PropTypes.object,
  metafieldActions: PropTypes.shape({
    changeMetafield: PropTypes.func,
    updateMetafield: PropTypes.func,
    removeMetafields: PropTypes.func
  }).isRequired,
  newMetafield: PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string
  }),
  t: PropTypes.func
};

export default translate("core")(DragDropContext(HTML5Backend)(ProductDetail));
