import React, { Component, PropTypes } from "react";
import { composeWithTracker } from "react-komposer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { getTag } from "../../../client/helpers/products";
import * as productActions from "../actions/product";
import * as layoutSettingsActions from "../../layout/actions/settings";
import ProductsGrid from "../components/productsGrid/ProductsGrid.jsx";
import Loading from "../../layout/components/Loading.jsx";
//import { styles } from "../styles/products";

// export default class ProductsMain extends Component {
//const ProductsContainer = React.createClass({
//  displayName: "ProductsContainer",
//  propTypes: {
//    location: PropTypes.object.isRequired,
//    params: PropTypes.object.isRequired
//  },
//  mixins: [SubscriptionMixin, AutorunMixin],
//
//  getInitialState() {
//    return {
//      windowWidth: window.innerWidth,
//      isSubscribed: false
//    };
//  },
//	/*constructor(props, context) {
//		super(props, context);
//
//		/!*
//		* 1024 -- wide screen
//		* 496 -- min screen
//		*
//		* *!/
//		this.state = { windowWidth: window.innerWidth };
//	}*/
//
//  /**
//   * This should do the same as waitOn() does in Reaction
//   *
//   */
//  autorun() {
//    this.subscribe("Shops");
//    this.subscribe("Packages");
//    this.subscribe("Products", Session.get("productScrollLimit"));
//
//    if (this.subscriptionsReady()) {
//      this.setState({ isSubscribed: true });
//    }
//  },
//
//	componentDidMount() {
//		window.addEventListener("resize", this.handleResize/*.bind(this)*/);
//	},
//
//  /*shouldComponentUpdate(nextProps, nextState) {
//    if (nextState.isSubscribed !== this.state.isSubscribed) {
//      return true;
//    }
//    if (nextState.windowWidth !== this.state.windowWidth) {
//      return true;
//    }
//    return false;
//  },*/
//
//  componentWillUnmount() {
//    window.removeEventListener("resize", this.handleResize);
//  },
//
//  handleResize(e) {
//    this.setState({ windowWidth: window.innerWidth });
//  },
//
//  renderSidebar() {
//    if (this.state.windowWidth < 1024) {
//      return;
//    }
//    return (
//      <aside className="four wide column">
//
//      </aside>
//    );
//  },
//
//  render() {
//    if (!this.state.isSubscribed) {
//    // if (!this.subscriptionsReady()) {
//      return (
//        <Loading />
//      );
//    }
//
//    let columns;
//
//    // for the wide-screens we split viewport on two parts. This part is not
//    // coming from Reaction. It"s our own.
//    if (this.state.windowWidth < 1024) {
//      columns = "sixteen wide column";
//    } else {
//      columns = "twelve wide column";
//    }
//    // todo do we need container class here?
//    const { location, params } = this.props;
//    const props = { location, params };
//
//    console.log("ProductsContainer: rendering...");
//    return (
//      <div className="ui celled grid" style={styles}>
//        <section className={columns}>
//          <ProductGrid {...props} />
//        </section>
//        {this.renderSidebar()}
//      </div>
//    );
//  }
//});

//const getTag = (location, params) => {
//  // this should be in a beginning of `pathname`
//  if (location.pathname.indexOf("/shop/tag/") === 0) {
//    // it could be without slug I suppose
//    return params.slug || ReactionCore.getShopName().toLowerCase();
//  }
//  return ReactionCore.getShopName().toLowerCase();
//};

const loadProducts = (location, params) => {
  /*
   * take natural sort, sorting by updatedAt
   * then resort using positions[currentTag].position for this tag
   * retaining natural sort of untouched items
   */

  // we are caching `currentTag` or if we are not inside tag route, we will
  // use shop name as `base` name for `positions` object
  const currentTag = getTag(location, params);

  // function to compare and sort position
  function compare(a, b) {
    // we need to check that fields exists
    // todo we could remove part of this checks of `positions` and `base`
    // settings will be required fields
    if (a.positions && a.positions[currentTag] &&
      b.positions && b.positions[currentTag]) {
      if (a.positions[currentTag].position === b.positions[currentTag].position) {
        const x = a.positions[currentTag].createdAt;
        const y = b.positions[currentTag].createdAt;

        if (x > y) {
          return -1;
        } else if (x < y) {
          return 1;
        }

        return 0;
      }
      return a.positions[currentTag].position - b.positions[currentTag].position;
    } // if some of them not exist, we need to comprare products `updatedAt`
    const x = a.createdAt;
    const y = b.createdAt;

    if (x > y) {
      return -1;
    } else if (x < y) {
      return 1;
    }
    return 0;
  }

  // we are passing `ancestors: []`, because in case when we turn back from PDP
  // for a moment we still subscribed to variants too, and we will get an error
  // because of it, because our `productGrid` component can't work with variants
  // objects.
  //
  // Also, we it is possible to change this selector to the following:
  // `type: { $in: ["simple"] }`, but I found this way is not kind to package
  // creators, because to specify they new product type, they will need to change
  // this file, which broke another piece of compatibility with `reaction`
  let gridProducts = ReactionCore.Collections.Products.find({
    ancestors: []
    // keep this, as an example
    // type: { $in: ["simple"] }
  }).fetch();

  return gridProducts.sort(compare);
};

// const ProductsGridContainer = props => <ProductsGrid {...props} />;
class ProductsGridContainer extends Component {
  componentWillUnmount() {
    // cleanup
    this.props.productActions.flushProductsList();
  }

  render() {
    return <ProductsGrid {...this.props} />;
  }
}

ProductsGridContainer.propTypes = {
  layoutSettingsActions: PropTypes.shape({
    openSettings: PropTypes.func,
    closeSettings: PropTypes.func
  }).isRequired,
  locale: PropTypes.shape({
    currency: PropTypes.object,
    language: PropTypes.string,
    locale: PropTypes.object,
    shopCurrency: PropTypes.object
  }).isRequired,
  location: PropTypes.object.isRequired,
  products: PropTypes.array,
  productActions: PropTypes.shape({
    publishProduct: PropTypes.func,
    selectProduct: PropTypes.func,
    unselectProduct: PropTypes.func,
    flushProductsList: PropTypes.func
  }).isRequired,
  productsScrollLimit: PropTypes.number.isRequired,
  selectedProducts: PropTypes.arrayOf(PropTypes.string)
};

function mapStateToProps(state) {
  return {
    locale: state.layout.locale,
    productsScrollLimit: state.shop.productsGrid.gridSettings.productsScrollLimit,
    selectedProducts: state.shop.productsGrid.selectedProducts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    layoutSettingsActions: bindActionCreators(layoutSettingsActions, dispatch),
    productActions: bindActionCreators(productActions, dispatch)
  };
}

function composer(props, onData) {
  //Meteor.subscribe("Media");
  const { location, params, productsScrollLimit } = props;
  const { Shops, Packages } = ReactionCore.Subscriptions;
  const handle = Meteor.subscribe("Products", productsScrollLimit);

  if (Shops.ready() && Packages.ready() && handle.ready()) {
    const products = loadProducts(location, params);
    onData(null, { products: products });
  }
}

const ProductsGridContainerWithData = composeWithTracker(
  composer,
  Loading
)(ProductsGridContainer);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsGridContainerWithData);
