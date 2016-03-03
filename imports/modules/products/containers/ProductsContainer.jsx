import React, { Component, PropTypes } from "react";
import { composeWithTracker } from "react-komposer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReactionCore } from "meteor/reactioncommerce:core";
import * as alertActions from "../../layout/actions/alert";
import ProductsGrid from "../components/productsGrid/ProductsGrid.jsx";
import Loading from "../../layout/components/Loading.jsx";
import { styles } from "../styles/products";

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

const loadProducts = limit => {

};

const ProductsContainer = props => (
  <section></section>
);

ProductsContainer.propTypes = {
  //alert: PropTypes.object,
  alertActions: PropTypes.shape({
    displayAlert: PropTypes.func,
    closeAlert: PropTypes.func
  }).isRequired,
  products: PropTypes.array,
  productsScrollLimit: PropTypes.number.isRequired,
  location: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    //alert: state.layout.alert,
    productsScrollLimit: state.shop.productsGrid.productsScrollLimit
  };
}

function mapDispatchToProps(dispatch) {
  return {
    alertActions: bindActionCreators(alertActions, dispatch)
  };
}

function composer(props, onData) {
  debugger;
  const { Shops, Packages } = ReactionCore.Subscriptions;
  const { productsScrollLimit } = props;
  const handle = Meteor.subscribe("Products", productsScrollLimit);
  if (Shops.ready() && Packages.ready() && handle.ready()) {
    const products = loadProducts(productsScrollLimit);
    onData(null, { products: products });
  }
}

const ProductsContainerWithData = composeWithTracker(
  composer,
  Loading
)(ProductsContainer);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsContainerWithData);
