/**
 * @classdesc ProductDetail
 */
import i18n from '{universe:i18n}';
import { DragDropContext } from '/myPackages/react-dnd';
import HTML5Backend from '/myPackages/react-dnd-html5-backend';
// import { NumberPicker } from '{universe:react-widgets}';
import { hasAdminAccess } from '/common/helpers/permissions';
import ProductImageGalleryContainer from '../../containers/ProductImageGalleryContainer';
import ProductDetailEdit from './edit/ProductDetailEdit';
import ProductTagInputForm from './tags/ProductTagInputForm';
import ProductDetailTags from './tags/ProductDetailTags';
import ProductMetaFieldForm from './attributes/ProductMetaFieldForm';
import ProductMetaField from './attributes/ProductMetaField';
import ProductSocial from './ProductSocial';
import VariantList from './variants/VariantList';
import { formatPrice } from '/common/helpers/i18n';
import {
  titleStyle, pageTitleStyle, descriptionStyle, vendorStyle, priceStyle,
  inputHoverStyle, inputStyle
} from '../../styles/productDetail';

const { Component, PropTypes } = React;
const T = i18n.createComponent('reaction.core.productDetail');
const T2 = i18n.createComponent('reaction.core.app');

@DragDropContext(HTML5Backend)
export default class ProductDetail extends Component {
  renderProductVisibilityAdminBlock() {
    const { selectedProduct } = this.props;
    return(
      <div className="ui basic segment">
        <b>
          <i className="attention icon"></i>
          <T>productManagement</T>:&nbsp;
          { selectedProduct.isVisible
            ? <span><a href="#" ref="toggle-product-isVisible-link"><T>makeInvisible</T></a>&nbsp;|&nbsp;</span>
            : false
          }
          { hasAdminAccess()
            ? <a href="#" ref="delete-product-link"><T2>delete</T2></a>
            : false
          }
        </b>
        { ! selectedProduct.isVisible ? this.renderIsNotVisibleAlert() : false }
        {/* todo add bootstrapAlerts here */}
      </div>
    );
  }

  renderIsNotVisibleAlert() {
    return(
      <div className="ui floating info message">
        <T>isNotVisible</T>&nbsp;
        <a href="#" ref="toggle-product-isVisible-link"><T>makeItVisible</T></a>
        &nbsp;<T>whenYouAreDone</T>
      </div>
    );
  }

  renderFieldComponent(options) {
    const { selectedProduct, onInputChange, onInputBlur } = this.props;
    if (this.props.permissions.createProduct) {
      return (
        <ProductDetailEdit
          selectedProduct={ selectedProduct }
          onInputChange={ onInputChange }
          onInputBlur={ onInputBlur }
          options={ options }
        />);
    }
    // todo add markdown support here:
    return (
      <div
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
        name: 'facebook', // name goes from Semantic UI icon name
        field: 'facebookMsg',
        value: selectedProduct.facebookMsg
      },
      {
        name: 'twitter',
        field: 'twitterMsg',
        value: selectedProduct.facebookMsg
      },
      {
        name: 'pinterest',
        field: 'pinterestMsg',
        value: selectedProduct.pinterestMsg
      },
      {
        name: 'google-plus',
        field: 'googleplusMsg',
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
          { social.map((options) => {
            // todo fix this
            this.renderFieldComponent(options);
          }) }
        </div>
      </div>
    );
  }

  render() {
    const { selectedProduct, selectedVariant, permissions, actualPrice } = this.props;
    const titleOptions = {
      field: 'title',
      value: selectedProduct.title,
      type: 'input',
      styles: [titleStyle, inputHoverStyle, inputStyle]
    };
    const pageTitleOptions = {
      field: 'pageTitle',
      value: selectedProduct.pageTitle,
      type: 'input',
      styles: [pageTitleStyle, inputHoverStyle, inputStyle]
    };
    const vendorOptions = {
      field: 'vendor',
      value: selectedProduct.vendor,
      type: 'input',
      styles: [vendorStyle, inputHoverStyle]
    };
    const descriptionOptions = {
      field: 'description',
      value: selectedProduct.description,
      type: 'textarea',
      styles: [descriptionStyle, inputHoverStyle],
      className: 'ui basic segment'
    };

    console.log('ProductDetail: rendering...');
    return (
      <section className="ui fluid container basic segment">
        { permissions.createProduct && this.renderProductVisibilityAdminBlock() }
        <div className="ui basic segment" itemScope itemType="http://schema.org/Product">
          <div className="ui basic segment">
            <h1 className="ui centered header" itemProp="name">
              { this.renderFieldComponent(titleOptions) }
            </h1>
            <h2 className="ui centered header">
              { this.renderFieldComponent(pageTitleOptions) }
            </h2>
          </div>
          <div className="ui grid">
            <div className="seven wide column">
              <ProductImageGalleryContainer
                product={ selectedProduct }
                selectedVariant={ selectedVariant }
                permissions={ permissions }
              />
              <h3><T>tags</T></h3>
              { this.renderTagsComponent() }
              <h3><T>details</T></h3>
              { this.renderMetaComponent() }
            </div>
            <div className="nine wide column">

              { /* Price Fixation */ }
              <span itemProp="price" style={ priceStyle }>{ formatPrice(actualPrice()) }</span>
              <div>
                { this.renderFieldComponent(vendorOptions) }
              </div>

              { /* Social Commentary */ }
              { /* todo fix following code */ }
              { permissions.createProduct
                ? this.renderProductSocialManage()
                : <ProductSocial /> }

              { /* Description */ }
              { this.renderFieldComponent(descriptionOptions) }

              { /* Variants & Options */ }
              <div className="ui basic segment">
                <h3 className="ui header"><T>options</T></h3>
                <VariantList />
              </div>

              { /* Cart Add Block */ }
              <div className="ui basic segment">
                <div className="ui fluid big green button">
                  {/*<NumberPicker
                    defaultValue={ 1 }
                    min={ 1 }
                  />*/}
                  <T>addToCart</T>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

ProductDetail.propTypes = {
  selectedProduct: PropTypes.object.isRequired,
  selectedVariant: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool
  ]),
  permissions: PropTypes.object.isRequired,
  actualPrice: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onInputBlur: PropTypes.func.isRequired,
  tagsBundle: PropTypes.shape({
    tags: PropTypes.object,
    tagValue: PropTypes.string,
    tagsToArray: PropTypes.func.isRequired,
    getTagSuggestions: PropTypes.func.isRequired,
    onTagBlurred: PropTypes.func.isRequired,
    onTagChange: PropTypes.func.isRequired,
    onNewTagChange: PropTypes.func.isRequired,
    onHashtagClick: PropTypes.func.isRequired,
    onTagGroupRemove: PropTypes.func.isRequired,
    moveTag: PropTypes.func.isRequired,
    hashtagMark: PropTypes.func.isRequired
  }),
  metaBundle: PropTypes.shape({
    metafields: PropTypes.array,
    newMetafield: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    onRemoveClick: PropTypes.func.isRequired
  })
};
