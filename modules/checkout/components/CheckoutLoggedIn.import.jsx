import i18n from '{universe:i18n}';

const { Component, PropTypes } = React;
const T = i18n.createComponent('reaction.core.checkoutLogin');

/**
 * @class CheckoutLoggedIn
 * @classdesc
 */
export default class CheckoutLoggedIn extends Component {
  render() {
    console.log('CheckoutLoggedIn...');
    return (
      <div className="">
        <h3 className="ui header" style={{ padding: '1rem' }}><T>welcome</T></h3>
      </div>
    );
  }
}
