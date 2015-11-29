import { AutorunMixin, SubscriptionMixin } from '{universe:utilities-react}';
import update from 'react/lib/update';
import LayoutHeader from '../components/header/LayoutHeader';

const { PropTypes } = React;

export default React.createClass({
  displayName: 'LayoutHeaderContainer',
  propTypes: {
    location: PropTypes.object.isRequired
  },
  mixins: [SubscriptionMixin, AutorunMixin],
  getInitialState() {
    return {
      languages: [],
      cart: {},
      cartCount: 0,
      displayCart: false
    };
  },

  autorunLanguages() {
    let languages = [];
    // this.subscribe('Shops');
    // subscription to 'Shops' moved to ProductsMain container
    // todo Придумать что-нибудь по этому моменту. Подписываемся в другом
    // контроллере, тут нужно знать подписаны ли мы.
    if (this.subscriptionReady('Shops')) {
      const shop = ReactionCore.Collections.Shops.findOne();
      if (typeof shop === 'object' && shop.languages) {
        for (let language of shop.languages) {
          if (language.enabled === true) {
            language.translation = 'languages.' + language.label.toLowercase;
            languages.push(language);
          }
        }
        this.setState({ languages: languages });
        // return languages;
      }
    }
  },

  autorunCart() {
    const { cart, cartCount } = this.state;
    const cartCollection = ReactionCore.Collections.Cart.findOne();
    if (typeof cartCollection === 'object') {
      this.setState(update(this.state, {
        cart: { $set: cartCollection },
        cartCount: { $set: cartCollection.cartCount() }
      }));
    }
  },

  handleCartIconClick() {
    const { displayCart } = this.state;
    this.setState(update(this.state, {
      displayCart: { $set: !displayCart }
    }));

  },

  render() {
    const { languages, cart, cartCount, displayCart } = this.state;
    console.log('LayoutHeaderContainer rendering...');
    return (
      <LayoutHeader
        languages={ languages }
        pathname={ this.props.location.pathname }
        cart={ cart }
        cartCount={ cartCount }
        displayCart={ displayCart }
        onCartIconClick={ this.handleCartIconClick }
      />
    );
  }
});
