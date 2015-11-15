/**
 *
 */

// import { Component } from '{react}'
// we're using own autorun mixin instead of those provided by MDG but you can
// use whatever is more convenient for you
// import {AutorunMixin} from '{universe:utilities-react}';
// import ReactMixin from '/myPackages/react-mixin'
// import ReactMeteorData from 'react-meteor-data'meteor
// import { ReactMeteorData } from '{react-meteor-data}!exports'
import { AutorunMixin, SubscriptionMixin } from '{universe:utilities-react}';
import Radium from '/myPackages/radium';
import { styles } from '../styles/products';
import ProductGrid from '../components/productGrid/ProductGrid';
import Loading from '../../layout/components/Loading';

// mixins: [AutorunMixin],
// @Radium
// @ReactMixin.decorate(ReactMeteorData)
// @ReactMixin.decorate(AutorunMixin)
// @ReactMixin.decorate(SubscriptionMixin)
// export default class ProductsMain extends Component {
let Products = React.createClass({
  displayName: 'Products',
  propTypes: {

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
    this.subscribe('Shops');
    this.subscribe('Packages');
    this.subscribe('Products', Session.get('productScrollLimit'));

    if (this.subscriptionsReady()) {
      this.setState({ isSubscribed: true });
    }
  },

	componentWillMount() {
		// require('./../styles/main.import.css');
	},

	componentDidMount() {
		window.addEventListener('resize', this.handleResize/*.bind(this)*/);
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
		window.removeEventListener('resize', this.handleResize);
	},

	handleResize(e) {
		this.setState({windowWidth: window.innerWidth});
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
    // coming from Reaction. It's our own.
		if (this.state.windowWidth < 1024) {
			columns = 'sixteen wide column';
		} else {
			columns = 'twelve wide column';
		}
    // todo do we need container class here?

		console.log('Products: rendering...');
		return (
			<div className="ui celled grid" style={ styles }>
				<section className={ columns }>
					<ProductGrid />
				</section>
				{ this.renderSidebar() }
			</div>
		);
	}
});

export default Radium(Products);
