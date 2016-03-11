import React, { Component, PropTypes } from "react";
import { composeWithTracker } from "react-komposer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReactionCore } from "meteor/reactioncommerce:core";
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

const loadProducts = location => {
  /*
   * take natural sort, sorting by updatedAt
   * then resort using positions.position for this tag
   * retaining natural sort of untouched items
   */

  // function to compare and sort position
  function compare(a, b) {
    if (a.position.position === b.position.position) {
      let x = a.position.updatedAt;
      let y = b.position.updatedAt;

      if (x > y) {
        return -1;
      } else if (x < y) {
        return 1;
      }

      return 0;
    }
    return a.position.position - b.position.position;
  }

  let gridProducts = ReactionCore.Collections.Products.find({}).fetch();
  // performance test: http://jsperf.com/caching-array-length/112
  for (let index = 0, length = gridProducts.length; index < length; index++) {
    let gridProduct = gridProducts[index];
    if (gridProduct.positions) {
      let _results = [];
      for (let position of gridProduct.positions) {
        if (location.pathname === "/shop/product/tag") {
          // fixme: need to rewrite getCurrentTag() for react-router
          //if (position.tag === location.params._id) {
          //  _results.push(position);
          //}
        }
        gridProducts[index].position = _results[0];
      }
    }
    if (!gridProduct.position) {
      gridProducts[index].position = {
        position: 0,
        weight: 0,
        pinned: false,
        updatedAt: gridProduct.updatedAt
      };
    }
  }

  return gridProducts.sort(compare);
};

const ProductsGridContainer = props => <ProductsGrid {...props} />;

ProductsGridContainer.propTypes = {
  layoutSettingsActions: PropTypes.shape({
    openSettings: PropTypes.func,
    closeSettings: PropTypes.func
  }).isRequired,
  location: PropTypes.object.isRequired,
  products: PropTypes.array,
  productActions: PropTypes.shape({
    setProductId: PropTypes.func,
    setVariantId: PropTypes.func,
    publishProduct: PropTypes.func,
    changeProductField: PropTypes.func,
    updateProductField: PropTypes.func
  }).isRequired,
  productsScrollLimit: PropTypes.number.isRequired
};

function mapStateToProps(state) {
  return {
    productsScrollLimit: state.shop.productsGrid.productsScrollLimit
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
  const { location, productsScrollLimit } = props;
  const { Shops, Packages } = ReactionCore.Subscriptions;
  const handle = Meteor.subscribe("Products", productsScrollLimit);

  if (Shops.ready() && Packages.ready() && handle.ready()) {
    const products = loadProducts(location);
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
