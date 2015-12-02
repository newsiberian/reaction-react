import { iconStyles } from '../styles/checkoutStep';
const { Component, PropTypes } = React;

/**
 * @class CheckoutStepBadge
 * @classdesc
 */
export default class CheckoutStepBadge extends Component {
  render() {
    const { badgeClass, iconClass } = this.props;
    console.log('CheckoutStepBadge...');
    return (
      <div className="ui top left attached label">
        <i
          className={ `${ badgeClass } ${ iconClass }` }
          style={ iconStyles }
        >
        </i>
      </div>
    );
  }
}

CheckoutStepBadge.propTypes = {
  badgeClass: PropTypes.string.isRequired,
  iconClass: PropTypes.string.isRequired
};
