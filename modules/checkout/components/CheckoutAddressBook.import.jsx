import i18n from '{universe:i18n}';
import { iconStyles } from '../styles/checkoutStep';
import AddressBookContainer from '/modules/accounts/containers/AddressBookContainer';

const { Component, PropTypes } = React;
const T = i18n.createComponent('reaction.core.addressBookGrid');

/**
 * @class CheckoutAddressBook
 * @classdesc
 */
export default class CheckoutAddressBook extends Component {
  render() {
    const { checkoutStep, badgeClass, iconClass } = this.props;
    const iconClassName = checkoutStep.status === true ? 'green checkmark icon' :
      `${ badgeClass } ${ iconClass }`;
    console.log('CheckoutAddressBook...');
    return (
      <div className="ui segment">
        <div className="ui top attached label">
          <h4 className="ui header">
            <i className={ iconClassName }></i>
            <div className="content">
              <T>chooseAddress</T>
            </div>
          </h4>
        </div>
        <AddressBookContainer />
      </div>
    );
  }
}

CheckoutAddressBook.propTypes = {
  // checkoutStepCompleted: PropTypes.func.isRequired,
  checkoutStep: PropTypes.object.isRequired,
  badgeClass: PropTypes.string.isRequired,
  iconClass: PropTypes.string.isRequired
};
