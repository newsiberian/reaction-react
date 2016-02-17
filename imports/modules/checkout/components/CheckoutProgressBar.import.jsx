import { _i18n } from "meteor/universe:i18n";
import { reactionTemplate } from '/common/helpers/layout';

const T = _i18n.createComponent('reaction.core.checkoutProgressBar');
import React, { Component, PropTypes } from "react";

/**
 * @class CheckoutProgressBar
 * @classdesc
 */
export default class CheckoutProgressBar extends Component {
  render() {
    const { cartId, shopId, progressbarStatus, setStepIcon } = this.props;
    const options = {
      hash: {
        id: cartId,
        shopId: shopId,
        workflow: 'coreCartWorkflow'
      }
    };
    const coreCartWorkflow = reactionTemplate(options);

    console.log('CheckoutProgressBar...');
    return (
      <div className="ui tablet stackable small steps">
        { coreCartWorkflow.map(workflow => {
          const label = workflow.label.toCamelCase();
          const statusClass = progressbarStatus(workflow.template);
          const icon = setStepIcon(label);
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
  cartId: PropTypes.string.isRequired,
  shopId: PropTypes.string.isRequired,
  progressbarStatus: PropTypes.func.isRequired,
  setStepIcon: PropTypes.func.isRequired
};
