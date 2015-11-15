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
// import { formatPrice } from '/common/helpers/';
import {
  titleStyle, pageTitleStyle, descriptionStyle, vendorStyle
} from '../../styles/productDetail';

const { Component, PropTypes } = React;
const T = i18n.createComponent('reaction.core.productDetail');
const T2 = i18n.createComponent('reaction.core.app');

@DragDropContext(HTML5Backend)
export default class ProductDetail extends Component {
  renderProductVisibilityAdminBlock() {
    const { product } = this.props;
    return(
      <div className="ui basic segment">
        <b>
          <i className="attention icon"></i>
          <T>productManagement</T>:&nbsp;
          { product.isVisible
            ? <span><a href="#" ref="toggle-product-isVisible-link"><T>makeInvisible</T></a>&nbsp;|&nbsp;</span>
            : false
          }
          { hasAdminAccess()
            ? <a href="#" ref="delete-product-link"><T2>delete</T2></a>
            : false
          }
        </b>
        { ! product.isVisible ? this.renderIsNotVisibleAlert() : false }
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
    if (this.props.permissions.createProduct) {
      return <ProductDetailEdit options={ options } />;
    }
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
    const { product } = this.props;
    const social = [
      {
        name: 'facebook', // name goes from Semantic UI icon name
        field: 'facebookMsg',
        value: product.facebookMsg
      },
      {
        name: 'twitter',
        field: 'twitterMsg',
        value: product.facebookMsg
      },
      {
        name: 'pinterest',
        field: 'pinterestMsg',
        value: product.pinterestMsg
      },
      {
        name: 'google-plus',
        field: 'googleplusMsg',
        value: product.googleplusMsg
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
    const { product, selectedVariant, permissions } = this.props;
    const titleOptions = {
      field: 'title',
      value: product.title,
      type: 'input',
      styles: titleStyle
    };
    const pageTitleOptions = {
      field: 'pageTitle',
      value: product.pageTitle,
      type: 'input',
      styles: pageTitleStyle
    };
    const vendorOptions = {
      field: 'vendor',
      value: product.vendor,
      type: 'input',
      styles: vendorStyle
    };
    const descriptionOptions = {
      field: 'description',
      value: product.description,
      type: 'textarea',
      styles: descriptionStyle,
      className: 'ui basic segment'
    };

    console.log('ProductDetail: rendering...');
    return (
      <section className="ui fluid container basic segment">
        { permissions.createProduct ? this.renderProductVisibilityAdminBlock() : false }
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
                product={ product }
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
              <span itemProp="price"></span>
              { this.renderFieldComponent(vendorOptions) }

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
  product: PropTypes.object.isRequired,
  selectedVariant: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool
  ]),
  permissions: PropTypes.object.isRequired,
  actualPrice: PropTypes.func.isRequired,
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
