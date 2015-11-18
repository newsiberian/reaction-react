/* global getSlug, Tags, ReactionCore, selectedProduct */
import { AutorunMixin, SubscriptionMixin } from '{universe:utilities-react}';
import update from 'react/lib/update';
import Loading from '../../layout/components/Loading';
import ProductDetail from '../components/productDetail/ProductDetail';
import {
  // selectedProduct as selectedProductReact,
  // selectedVariant,
  getProductPriceRange
} from '/common/helpers/products';
import Unauthorized from '../../layout/components/notice/Unauthorized';
import ProductNotFound from '../../layout/components/ProductNotFound';

export default React.createClass({
  displayName: 'ProductDetailContainer',
  propTypes: {
    params: React.PropTypes.object.isRequired
  },
  mixins: [SubscriptionMixin, AutorunMixin],
  getInitialState() {
    return {
      selectedProduct: false,
      selectedVariant: false,
      tags: {},
      metafields: [],
      newTagValue: '',  // https://github.com/moroshko/react-autosuggest#valueOption
      newMetafield: {   // this one for handling a new metafield inputs
        key: '',
        value: ''
      }//,
      //title : '',
      //pageTitle: '',
      //vendor: '',
      //description: ''
    };
  },

  autorun() {
    this.subscribe('Product', this.props.params._id);
  },

  autorunProduct() {
    // todo тут пришлось использовать глобальную функцию selectedProduct(),
    // что желательно переделать
    let product = selectedProduct();
    this.setState(update(this.state, {
      selectedProduct: { $set: product }
    })); // todo pass only needed fields to state
    // this.dualLink().setRemote('product', selectedProduct());

    if (typeof product === 'object') {
      const { selectedProduct } = this.state;
      // todo add selectedVariant here
      this.setState(update(this.state, {
        selectedVariant: { $set: selectedVariant() }
      }));
      if (selectedProduct.hashtags) {
        let tags = {};
        selectedProduct.hashtags.map((id) => {
          let tag = Tags.findOne(id);
          tags[tag._id] = { _id: tag._id, name: tag.name, slug: tag.slug };
        });
        this.setState({ tags: tags });
      }
      if (selectedProduct.metafields) {
        this.setState({ metafields: selectedProduct.metafields });
      }
    }
  },

  autorunVariant() {
    if (this.subscriptionsReady()) {
      const { variant, _id } = this.props.params;
      // we run this here because seems this only way we could get product cursor
      ReactionCore.setProduct(_id, variant);
    }
  },

  actualPrice() {
    // todo understand for what purchasable needed for
    /*let childVariants;
    //let purchasable;
    // todo should we use global methods here or exported functions?
    let current = this.state.selectedVariant; //selectedVariant();
    let product = this.state.selectedProduct;
    if (product && current) {
      childVariants = (function () {
        let _results = [];
        for (let variant of product.variants) {
          if ((typeof variant === 'object' && variant.parentId) === current._id) {
            _results.push(variant);
          }
        }
        return _results;
      })();
      // purchasable = childVariants.length > 0 ? false : true;
    }*/
    /* if (purchasable) {
      return current.price;
    } */
    return getProductPriceRange(this.state.selectedProduct._id);
  },

  // this method was taken from example:
  // https://github.com/gaearon/react-dnd/blob/master/examples/04%20Sortable/Simple/Container.js
  moveTag(dragIndex, hoverIndex) {
    let tags = this.state.selectedProduct.hashtags;
    const dragTags = tags[dragIndex];

    tags.splice(dragIndex, 1);
    tags.splice(hoverIndex, 0, dragTags);

    Meteor.call('products/updateProductField',
      this.state.selectedProduct._id, 'hashtags', _.uniq(tags));
  },

  // method for autocomplete
  getTagSuggestions(input, callback) {
    let suggestions = [];
    const slug = getSlug(input);
    Tags.find({
      slug: new RegExp(slug, 'i')
    }).forEach(function (tag) {
      return suggestions.push(tag.name);
    });

    callback(null, suggestions);
  },

  /**
   * @function tagsToArray
   * @description Tags object transform to an array for mapping
   * @return {Array} Tags cursor array representation
   */
  tagsToArray() {
    const tags = this.state.tags;
    let tagsArray = [];
    for (let tag in tags) {
      if ({}.hasOwnProperty.call(tags, tag)) {
        tagsArray.push(tags[tag]);
      }
    }

    return tagsArray;
  },

  currentHashTag() {
    let product = this.state.selectedProduct;
    if (product) {
      if (product.handle) {
        if (product.handle === product.handle.toLowerCase()) {
          return true;
        }
      }
    }
  },

  hashtagMark(tag) {
    const product = this.state.selectedProduct;
    if (product) {
      if (product.handle) {
        if (tag.handle === product.handle.toLowerCase()
          || getSlug(product.handle) === tag.slug) {
          return 'bookmark';
        }
      }
      return 'remove bookmark';
    }
  },

  /**
   * @function clearField
   * @description Clear the value of the element.
   * @todo don't know how to make this work... We can't get access to ref from
   * another component to clear it value. Maybe we can extend the lib and add
   * clean method to it later
   */
  clearField(state) {
    //this.setState({ state: '' });
    this.setState(state);
  },

  /**
   * @function handleInputChange
   * @description onChange handler for title, titlePage, description, vendor, etc
   * @param {Object|String} event - SyntheticEvent or markdown value
   * @param {String} field - name of property
   * @fires context#setState
   */
  handleInputChange(event, field) {
    const text = typeof event === 'string' ? event : event.target.value;

    this.setState(update(this.state, {
      selectedProduct: {
        [field]: { $set: text }
      }
    }));
  },

  /**
   * @function handleInputBlur
   * @description onBlur handler for title, titlePage, description, vendor, etc
   * @param {Object|String} event - SyntheticEvent or markdown value
   * @param {String} field - name of property
   * @fires context#setState
   */
  handleInputBlur(event, field) {
    const product = this.state.selectedProduct;
    const text = typeof event === 'string' ? event : event.target.value;

    Meteor.call('products/updateProductField', product._id, field,
      text, error => {
        if (error) {
          // todo update on Semantic Alert
          alert(error.reason);
          /*return Alerts.add(error.reason, "danger", {
            placement: "productManagement",
            i18nKey: "productDetail.errorMsg",
            id: this._id
          });*/
        }
        if (field === 'title') {
          Meteor.call('products/setHandle', product._id, (error, result) => {
            if (result) {
              return FlowRouter.go('product', {
                _id: result
              });
            }
          });
        }
      });
  },

  /**
   * @function handleTagChange
   * @description OnChange handler for a tags input field
   * @param {object} event - SyntheticEvent
   * @param {string} _id - tag cursor _id
   * @fires context#setState
   */
  handleTagChange(event, _id) {
    const { tags } = this.state;
    this.setState(update(this.state, {
      tags: { [_id]: { name: { $set: event.target.value }}}
    }));
  },

  /**
   * @function handleNewTagChange
   * @description OnChange handler for a new tag input field
   * @param {string|int} value - input value attribute
   * @fires context#setState
   */
  handleNewTagChange(value) {
    this.setState({ newTagValue: value });
  },

  /**
   * @function handleTagBlurred
   * @description save changes to Tags collection on input field blur
   * @param {object} event - SyntheticEvent
   * @param {string} _id - tag cursor _id
   * @return {object|boolean} Meteor.call#products/updateProductTags
   */
  handleTagBlurred(event, _id) {
    if (event.target.value) {
      const clear = this.clearField;
      Meteor.call('products/updateProductTags', this.state.selectedProduct._id,
        event.target.value, typeof _id === 'string' ? _id : null,
        (error) => {
          // todo надо очищать input value после удачного или неудачного ответа
          if (event.target.id === 'tags-submit-new') {
            clear({ newTagValue: '' });
          }

          if (error) {
            // todo add alert here
            //Alerts.add("Tag already exists, or is empty.",
            //  "danger", {
            //    autoHide: true
            //  });
            return false;
          }
        }
      );
    }
  },

  // todo поставить флаг можно, а вот убрать не получается. Нужно подебажить на сервере.
  // todo пока-что этот метод непонятно куда ведёт. разобраться в этом потом.
  /**
   * @function handleHashtagClick
   * @description Set product handle tag and redirect to new url
   * @param {string} _id - tag _id
   * @return {function} Meteor Method "products/setHandleTag"
   */
  handleHashtagClick(_id) {
    Meteor.call('products/setHandleTag', this.state.selectedProduct._id, _id,
      function (error, result) {
        if (result) {
          return FlowRouter.go('product', {
            _id: result
          });
        }
      }
    );
  },

  /**
   * @function handleTagGroupRemove
   * @description Removing of tag from current product
   * @param {string} _id - tag _id
   * @return {function} Meteor Method "products/removeProductTag"
   */
  handleTagGroupRemove(_id) {
    return Meteor.call('products/removeProductTag',
      this.state.selectedProduct._id, _id);
  },

  /**
   * @function handleMetaChange
   * @description Meta field change handler
   * @param {object} event - SyntheticEvent
   * @param {string|int} id - metafield DOM element id
   * @param {string} type - key|value
   * @fires context#setState
   */
  handleMetaChange(event, id, type) {
    if (id !== 'new') {
      const { metafields } = this.state;
      this.setState(update(this.state, {
        metafields: { [id]: { [type]: { $set: event.target.value }}}
      }));
    } else {
      const { newMetafield } = this.state;
      this.setState(update(this.state, {
        newMetafield: { [type]: { $set: event.target.value }}}
      ));
    }
  },

  /**
   * @function handleMetaBlurred
   * @description onBlur event handler for meta input fields
   * @param {string|int} id - metafield DOM element id
   * @fires Meteor.call#products/updateMetaFields
   */
  handleMetaBlurred(/*event, */id, type) {
    // we will take latest changes of meta from selectedProduct state, not from
    // event.target.value, because I don't know how to get value from second field
    const { selectedProduct } = this.state;
    const productId = selectedProduct._id;
    let updateMeta;

    if (id !== 'new') {
      const { metafields } = this.state;
      updateMeta = {
        key: metafields[id].key,
        value: metafields[id].value
      };
      const meta = selectedProduct.metafields[id];

      Meteor.call('products/updateMetaFields', productId, updateMeta, meta);

      return Tracker.flush();
    }

    const { newMetafield } = this.state;

    if (newMetafield.value && !newMetafield.key) {
      // todo add validation here
    }

    if (newMetafield.value && newMetafield.key) {
      updateMeta = {
        key: newMetafield.key,
        value: newMetafield.value
      };
      Meteor.call('products/updateMetaFields', productId, updateMeta);
      Tracker.flush();
      this.clearField(update(this.state, { newMetafield: {
        key: { $set: '' },
        value: { $set: '' }
      }}));
    }
  },

  /**
   * @function handleMetaRemoveClick
   * @description Meta remove button onClick handler
   * @param {int} id - metafield id in metafields array
   * @fires Production.update
   */
  handleMetaRemoveClick(event, id) {
    event.preventDefault();
    const { selectedProduct } = this.state;
    const productId = selectedProduct._id;
    const meta = selectedProduct.metafields[id];

    Products.update(productId, {
      $pull: {
        metafields: meta
      }
    });
  },

  /**
   * @private
   * @function render
   * @description Render the ProductDetail dump-component.
   * @return {*} ProductDetail "stateless" component.
   */
  render() {
    const selectedProduct = this.state.selectedProduct;

    // const { variant, _id } = this.props.params;

    // todo check permissions
    if (! this.subscriptionsReady()) {
      return <Loading />;
    }

    if (this.subscriptionsReady() && !selectedProduct) {
      return <ProductNotFound />;
    }

    // we need to send permission down to children, so we put one in object
    let permissions = { createProduct: ReactionCore.hasPermission('createProduct') };

    if (selectedProduct && ! selectedProduct.isVisible) {
      // todo постестить реактивность с парой браузеров на этом участке
      if (! permissions) {
        // todo redirect back to product page after successfully authorization
        return <Unauthorized />;
      }
    }

    const tagsBundle = {
      tags: this.state.tags,
      tagValue: this.state.newTagValue,
      tagsToArray: this.tagsToArray,
      getTagSuggestions: this.getTagSuggestions,
      onTagBlurred: this.handleTagBlurred,
      onTagChange: this.handleTagChange,
      onNewTagChange: this.handleNewTagChange,
      onHashtagClick: this.handleHashtagClick,
      onTagGroupRemove: this.handleTagGroupRemove,
      moveTag: this.moveTag,
      hashtagMark: this.hashtagMark
    };
    const metaBundle = {
      metafields: this.state.metafields,
      newMetafield: this.state.newMetafield,
      onChange: this.handleMetaChange,
      onBlur: this.handleMetaBlurred,
      onRemoveClick: this.handleMetaRemoveClick
    };

    // for the first loading we can have selectedProduct undefined and because
    // of that selectedVariant still will be false, so we could check here for
    // selectedProduct exists or make PropType of selectedVariant object or bool.
    // I don't know how to handle better in this case.
    const selectedVariant = this.state.selectedVariant;

    console.log('ProductDetailContainer: rendering...');
    // we can't pass permissions down to children, I think... because of reactivity
    return (
      <ProductDetail
        selectedProduct={ selectedProduct }
        selectedVariant={ selectedVariant }
        permissions={ permissions }
        actualPrice={ this.actualPrice }
        onInputChange={ this.handleInputChange }
        onInputBlur={ this.handleInputBlur }
        tagsBundle={ tagsBundle }
        metaBundle={ metaBundle }
      />
    );
  }
});
