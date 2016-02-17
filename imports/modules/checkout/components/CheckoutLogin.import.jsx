import { _i18n } from "meteor/universe:i18n";
import { InlineLoginBox } from '{universe:accounts-ui}';
import CheckoutStepBadge from './CheckoutStepBadge';
import CheckoutLoggedIn from './CheckoutLoggedIn';

import React, { Component, PropTypes } from "react";
const T = _i18n.createComponent('reaction.core.checkoutLogin');
const T2 = _i18n.createComponent('reaction.core.accountsUI');

/**
 * @class CheckoutLogin
 * @classdesc
 */
export default class CheckoutLogin extends Component {
  render() {
    const {
      checkoutStepCompleted, checkoutStep, badgeClass, iconClass,
      onClickContinueGuest
    } = this.props;
    const isLoginCompleted = checkoutStepCompleted(checkoutStep);
    const iconClassName = isLoginCompleted ? 'green checkmark icon' :
      `${ badgeClass } ${ iconClass }`;

    console.log('CheckoutLogin...');
    return (
      <div className="ui segments">
        <div className="ui top attached header">
          <i className={ iconClassName }></i>
          <div className="content">
            { isLoginCompleted ? <T>loginCompleted</T> : <T>guestOrLogin</T> }
          </div>
        </div>
        { isLoginCompleted ? <CheckoutLoggedIn /> :
          <div className="ui attached segment">
            <div className="ui two column very relaxed grid">
              <div className="column">
                <div className="ui basic segment">
                  <div style={{ textAlign: 'justify' }}>
                    <T>guestMessage</T>
                  </div>
                  <button
                    className="ui fluid primary button"
                    onClick={ () => onClickContinueGuest() }
                  >
                    <T>continueAsGuest</T>
                  </button>
                </div>
              </div>
              <div className="ui vertical divider">
                <T2>or</T2>
              </div>
              <div className="column">
                <InlineLoginBox />
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

CheckoutLogin.propTypes = {
  checkoutStepCompleted: PropTypes.func.isRequired,
  checkoutStep: PropTypes.object.isRequired,
  badgeClass: PropTypes.string.isRequired,
  iconClass: PropTypes.string.isRequired,
  onClickContinueGuest: PropTypes.func.isRequired
};
