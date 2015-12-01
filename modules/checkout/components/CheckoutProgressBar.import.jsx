import i18n from '{universe:i18n}';
import { reactionTemplate } from '/common/helpers/layout';

const T = i18n.createComponent('reaction.core.checkoutProgressBar');
const { Component, PropTypes } = React;

/**
 * @class CheckoutProgressBar
 * @classdesc
 */
export default class CheckoutProgressBar extends Component {
  render() {
    const { coreCartWorkflow, progressbarStatus } = this.props;

    console.log('CheckoutProgressBar...');
    return (
      <div className="ui tablet stackable small steps">
        { coreCartWorkflow.map(workflow => {
          const label = workflow.label.toCamelCase();
          const statusClass = progressbarStatus(workflow.template);
          let icon;
          switch (label) {
            case 'login':
              icon = 'user icon';
              break;
            case 'shippingBilling':
              icon = 'mail icon';
              break;
            case 'shippingOptions':
              icon = 'shipping icon';
              break;
            case 'reviewPayment':
              icon = 'payment icon';
              break;
            default:
              icon = 'smile icon';
          }
          // { /* <div className="description">Choose your shipping options</div> */ }
          return (
            <div className={ statusClass } key={ workflow.position }>
              <i className={ icon }></i>
              <div className="content">
                <div className="title"><T>{ label }</T></div>
              </div>
            </div>
          );
        }) }
      </div>
    );
  }
}

CheckoutProgressBar.propTypes = {
  coreCartWorkflow: PropTypes.array.isRequired,
  progressbarStatus: PropTypes.func.isRequired
};
