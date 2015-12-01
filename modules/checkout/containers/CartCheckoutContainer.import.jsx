import { AutorunMixin, SubscriptionMixin } from '{universe:utilities-react}';
// import update from 'react/lib/update';
// import Loading from '../../layout/components/Loading';
import CartCheckout from '../components/CartCheckout';
import { reactionTemplate } from '/common/helpers/layout';

/**
 *
 */
export default React.createClass({
  displayName: 'CartCheckoutContainer',
  propTypes: {},
  mixins: [SubscriptionMixin, AutorunMixin],

  getInitialState() {
    return {
      cart: ReactionCore.Collections.Cart.findOne()
    };
  },

  autorun() {
    this.subscribe('Packages');
    this.subscribe('Products');
    this.subscribe('Shipping');
    this.subscribe('AccountOrders');
  },

  componentWillMount() {
    // todo close cart

    // init cart workflow
    if (!ReactionCore.Collections.Cart.findOne().workflow.workflow) {
      Meteor.call('workflow/pushCartWorkflow', 'coreCartWorkflow',
        'checkoutLogin');
    }
  },

  getProgressbarStatus(template) {
    const cartWorkflow = this.state.cart.workflow;
    const thisStep = (cartWorkflow.status === template); // active
    const previouslyVisited = _.contains(cartWorkflow.workflow, template);

    if (previouslyVisited && !thisStep) {
      return 'completed step';
    }
    if (thisStep) {
      return 'active step';
    }
    return 'step';
  },

  render() {
    const { cart } = this.state;
    const options = {
      hash: {
        id: cart._id,
        shopId: cart.shopId,
        workflow: 'coreCartWorkflow'
      }
    };
    // let coreCartWorkflow = [];

    //if (this.subscriptionsReady()) {
    const coreCartWorkflow = reactionTemplate(options);
    //}

    return (
      <CartCheckout
        cart={ cart }
        coreCartWorkflow={ coreCartWorkflow }
        progressbarStatus={ this.getProgressbarStatus }
      />
    );
  }
});
