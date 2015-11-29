import { AutorunMixin, SubscriptionMixin } from '{universe:utilities-react}';
import update from 'react/lib/update';
import CartDrawer from '../components/cartDrawer/CartDrawer';

const { PropTypes } = React;

/**
 *
 */
export default React.createClass({
  displayName: 'CartDrawerContainer',
  propTypes: {
    displayCart: PropTypes.bool.isRequired,
    pathname: PropTypes.string.isRequired,
    onCartIconClick: PropTypes.func.isRequired
  },
  mixins: [SubscriptionMixin, AutorunMixin],
  getInitialState() {
    return {
      cart: Cart.findOne()
    };
  },

  autorun() {
    this.subscribe('Packages');
    this.subscribe('Products');
    this.subscribe('Shipping');
    this.subscribe('AccountOrders');
    // todo do we need this?
    // instead of Loader implementation it's better to make smooth animation I think
    //!this.subscriptionsReady() ?
    //  this.setState({ isLoaded: false }) :
    //  this.setState({ isLoaded: true });
  },

  checkCartIsEmpty() {
    const storedCart = this.state.cart;
    let count = 0;
    if (typeof storedCart === 'object' && storedCart.items) {
      storedCart.items.map(item => count += item.quantity);
    }
    return count;
  },

  media(item) {
    const product = Products.findOne(item.productId);
    let defaultImage = ReactionCore.Collections.Media.findOne({
      "metadata.variantId": item.variants._id
    });

    if (defaultImage) {
      return defaultImage;
    } else if (product) {
      // todo needs update then ancestor will be implemented
      _.any(product.variants, function (variant) {
        defaultImage = ReactionCore.Collections.Media.findOne({
          "metadata.variantId": variant._id
        });
        return !!defaultImage;
      });
    }
    return defaultImage;
  },

  swiperIsInitialized() {},

  handleKeepShoppingClick() {

  },

  render() {
    const swiperOptions = {
      direction: 'horizontal',
      setWrapperSize: true,
      loop: false,
      grabCursor: true,
      slidesPerView: 'auto',
      //wrapperClass: 'cards',
      //slideClass: 'card',
      // slideActiveClass: 'cart-drawer-swiper-slide-active',
      // pagination: '.cart-drawer-pagination',
      // paginationClickable: true
    };
    return (
      <CartDrawer
        checkCartIsEmpty={ this.checkCartIsEmpty }
        { ...this.props }
        cart={ this.state.cart }
        media={ this.media }
        swiperOptions={ swiperOptions }
        swiperIsInitialized={ this.swiperIsInitialized }
      />
    );
  }
});