import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import look, { StyleSheet } from "react-look";
import { DragDropContext } from "react-dnd";
import { ReactionCore } from "meteor/reactioncommerce:core";
import HTML5Backend from "react-dnd-html5-backend";
import FontIcon from "material-ui/lib/font-icon";
import Paper from "material-ui/lib/paper";
//import { formatPrice } from "../../../../client/helpers/i18n";
import ProductImageGalleryContainer from "../../containers/ProductImageGalleryContainer";
import ProductDetailEdit from "./edit/ProductDetailEdit";
import ProductTagInputForm from "./tags/ProductTagInputForm";
import ProductDetailTags from "./tags/ProductDetailTags";
import ProductMetaFieldForm from "./attributes/ProductMetaFieldForm";
import ProductMetaField from "./attributes/ProductMetaField";
import ProductSocial from "./ProductSocial";
import CartAddButton from "./CartAddButton";
import VariantList from "./variants/VariantList";
import styles, { editStyles, priceStyle
  /*titleStyle, pageTitleStyle, descriptionStyle, vendorStyle,*/
  /*inputHoverStyle, inputStyle*/
} from "../../styles/productDetail";

const c = StyleSheet.combineStyles;

const getOptions = (field, product) => {
  const isAdmin = ReactionCore.hasPermission("createProduct");
  switch(field) {
  case "title":
    return {
      field: "title",
      type: "input",
      value: product[field],
      className: isAdmin ? c(editStyles.input, editStyles.title, editStyles.hover) :
        c(editStyles.title)
    };
  case "pageTitle":
    return {
      field: "pageTitle",
      type: "input",
      value: product[field],
      className: isAdmin ? c(editStyles.pageTitle, editStyles.input, editStyles.hover) :
        c(editStyles.pageTitle)
    };
  case "vendor":
    return {
      field: "vendor",
      type: "input",
      value: product[field],
      className: c(editStyles.vendor, editStyles.hover)
    };
    case "description":
      return {
        field: "description",
        type: "textarea",
        value: product[field],
        className: c(editStyles.description, editStyles.hover)
      };
  default:
    return {}; // should not fires
  }
};
//
//const titleOptions = {
//  field: "title",
//  type: "input",
//  //className: c(styles.input, styles.title, styles.hover)
//  className: c(titleStyle, inputHoverStyle, inputStyle)
//};
//const pageTitleOptions = {
//  field: "pageTitle",
//  type: "input",
//  className: c(pageTitleStyle, inputHoverStyle, inputStyle)
//};
//const vendorOptions = {
//  field: "vendor",
//  type: "input",
//  className: c(vendorStyle, inputHoverStyle)
//};
//const descriptionOptions = {
//  field: "description",
//  type: "textarea",
//  className: c(descriptionStyle, inputHoverStyle)
//};

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
    const { product, productActions, productState } = this.props;
    if (ReactionCore.hasPermission("createProduct")) {
      return (
        <ProductDetailEdit
          key={index}
          //field={field}
          options={options}
          product={product}
          productActions={productActions}
          productState={productState}
        />);
    }

    // todo add markdown support here:
    return (
      <div
        key={index}
        className={options.className}
        //style={options.styles ? options.styles : {}}
      >
        {options.value}
      </div>
    );
  }

  renderTagsComponent() {
    const { tags } = this.props;

    if (ReactionCore.hasPermission("createProduct")) {
      return(
        <ProductTagInputForm
          tags={tags}
          //tagValue={ tagsBundle.tagValue }
          //tagsArray={ tagsBundle.tagsToArray() }
          //getTagSuggestions={ tagsBundle.getTagSuggestions }
          //onTagBlurred={ tagsBundle.onTagBlurred }
          //onTagChange={ tagsBundle.onTagChange }
          //onNewTagChange={ tagsBundle.onNewTagChange }
          //onHashtagClick={ tagsBundle.onHashtagClick }
          //onTagGroupRemove={ tagsBundle.onTagGroupRemove }
          //moveTag={ tagsBundle.moveTag }
          //hashtagMark={ tagsBundle.hashtagMark }
        />
      );
    }
    // tags should be an array
    if (Array.isArray(tags)) {
      return (
        <ProductDetailTags tags={tags} />
      );
    }
    // todo add something like "there is no tags" span
    //return false;
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
    const { product, selectedVariant, t } = this.props;
    //const {
    //  selectedProduct, selectedVariant, permissions, actualPrice,
    //  addToCartQuantity, onAddToCartClick, onAddToCartQuantityChange
    //} = this.props;


    console.log("ProductDetail: rendering...");
    return (
      <section className="container-fluid" style={styles.container}>
        {ReactionCore.hasPermission("createProduct") &&
          this.renderProductVisibilityAdminBlock()}

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
                <h3>{t("productDetail.details")}</h3>
                {/* this.renderMetaComponent() */}
              </div>
              <div className="col-xs-12 col-sm-7">
                {/* Price Fixation */}
              </div>
            </div>
          </section>
        </div>
        {/* Product Detail Page: END */}
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
  //tags: PropTypes.arrayOf(PropTypes.object),
  tags: PropTypes.oneOfType([
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      slug: PropTypes.string
    }),
    PropTypes.arrayOf(PropTypes.object)
  ]),
  t: PropTypes.func.isRequired
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

export default translate("core")(DragDropContext(HTML5Backend)(look(ProductDetail)));
