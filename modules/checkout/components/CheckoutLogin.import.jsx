import i18n from '{universe:i18n}';
import CheckoutStepBadge from './CheckoutStepBadge';
import CheckoutLoggedIn from './CheckoutLoggedIn';

const { Component, PropTypes } = React;
const T = i18n.createComponent('reaction.core.checkoutLogin');

/**
 * @class CheckoutLogin
 * @classdesc
 */
export default class CheckoutLogin extends Component {
  render() {
    const {
      checkoutLoginCompleted, checkoutStep, badgeClass, iconClass
    } = this.props;
    const isLoginCompleted = checkoutLoginCompleted(checkoutStep);

    //if (isLoginCompleted) {
    //  return ;
    //}

    console.log('CheckoutLogin...');
    return (
      <div className="ui segment">
        <div className="ui top attached label">
          <h3 className="ui header">
            <i className={ `${ badgeClass } ${ iconClass }` } style={{ /*float: 'right'*/ }}></i>
            <div className="content">
              <T>loginCompleted</T>
            </div>
          </h3>
        </div>
        { isLoginCompleted ? <CheckoutLoggedIn /> :
          <div>
          </div>
        }
      </div>
    );
  }
}

CheckoutLogin.propTypes = {
  checkoutLoginCompleted: PropTypes.func.isRequired,
  checkoutStep: PropTypes.object.isRequired,
  badgeClass: PropTypes.string.isRequired,
  iconClass: PropTypes.string.isRequired
};
