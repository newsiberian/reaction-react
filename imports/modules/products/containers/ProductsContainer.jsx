import React, { PropTypes } from "react";
import { styles } from "../styles/products";
import ProductGrid from "../components/productGrid/ProductGrid";
import Loading from "../../layout/components/Loading";



// mixins: [AutorunMixin],
// @Radium
// @ReactMixin.decorate(ReactMeteorData)
// @ReactMixin.decorate(AutorunMixin)
// @ReactMixin.decorate(SubscriptionMixin)
// export default class ProductsMain extends Component {
const ProductsContainer = React.createClass({
  displayName: "ProductsContainer",
  propTypes: {
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
  },
  mixins: [SubscriptionMixin, AutorunMixin],

  getInitialState() {
    return {
      windowWidth: window.innerWidth,
      isSubscribed: false
    };
  },
	/*constructor(props, context) {
		super(props, context);

		/!*
		* 1024 -- wide screen
		* 496 -- min screen
		*
		* *!/
		this.state = { windowWidth: window.innerWidth };
	}*/

  /**
   * This should do the same as waitOn() does in Reaction
   *
   */
  autorun() {
    this.subscribe("Shops");
    this.subscribe("Packages");
    this.subscribe("Products", Session.get("productScrollLimit"));

    if (this.subscriptionsReady()) {
      this.setState({ isSubscribed: true });
    }
  },

	componentDidMount() {
		window.addEventListener("resize", this.handleResize/*.bind(this)*/);
	},

  /*shouldComponentUpdate(nextProps, nextState) {
    if (nextState.isSubscribed !== this.state.isSubscribed) {
      return true;
    }
    if (nextState.windowWidth !== this.state.windowWidth) {
      return true;
    }
    return false;
  },*/

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },

  handleResize(e) {
    this.setState({ windowWidth: window.innerWidth });
  },

  renderSidebar() {
    if (this.state.windowWidth < 1024) {
      return;
    }
    return (
      <aside className="four wide column">

      </aside>
    );
  },

  render() {
    if (!this.state.isSubscribed) {
    // if (!this.subscriptionsReady()) {
      return (
        <Loading />
      );
    }

    let columns;

    // for the wide-screens we split viewport on two parts. This part is not
    // coming from Reaction. It"s our own.
    if (this.state.windowWidth < 1024) {
      columns = "sixteen wide column";
    } else {
      columns = "twelve wide column";
    }
    // todo do we need container class here?
    const { location, params } = this.props;
    const props = { location, params };

    console.log("ProductsContainer: rendering...");
    return (
      <div className="ui celled grid" style={ styles }>
        <section className={ columns }>
          <ProductGrid { ...props } />
        </section>
        { this.renderSidebar() }
      </div>
    );
  }
});

export default Radium(ProductsContainer);
