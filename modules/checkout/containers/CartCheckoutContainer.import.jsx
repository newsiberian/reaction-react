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

  getCheckoutStepBadgeClass(workflowStep) {
    if (workflowStep.status === true ||
      workflowStep.status === workflowStep.template) {
      return 'active';
    }
    return '';
  },

  setStepIcon(label) {
    switch (label) {
      case 'login':
        return 'big user icon';
      case 'shippingBilling':
        return 'big mail icon';
      case 'shippingOptions':
        return 'big shipping icon';
      case 'reviewPayment':
        return 'big payment icon';
      default:
        return 'big smile icon';
    }
  },

  /**
   * @method checkoutLoginCompleted
   * @description check whether the user is logged in
   * @param {Object} workflowStep - summary about current step
   * @returns {boolean} true if we've already past this stage,
   * or if the user is a guest but not anonymous
   */
  checkoutLoginCompleted(workflowStep) {
    const guestUser = ReactionCore.hasPermission('guest', Meteor.user());
    const currentStatus = this.state.cart.workflow.status;
    const anonUser = Roles.userIsInRole('anonymous', Meteor.user(),
      ReactionCore.getShopId());

    return currentStatus !== workflowStep.template && guestUser && !anonUser;
  },

  render() {
    const { cart } = this.state;

    return (
      <CartCheckout
        cart={ cart }
        checkoutLoginCompleted={ this.checkoutLoginCompleted }
        checkoutStepBadgeClass={ this.getCheckoutStepBadgeClass }
        progressbarStatus={ this.getProgressbarStatus }
        setStepIcon={ this.setStepIcon }
      />
    );
  }
});
