import i18n from '{universe:i18n}';
import {
  numberPickerButtonsStyle, numberPickerStyle
} from '../../styles/productDetail';

const { Component, PropTypes } = React;
const T = i18n.createComponent('reaction.core.productDetail');

/**
 * @class CartAddButton
 * @classdesc
 */
export default class CartAddButton extends Component {
  render() {
    const {
      addToCartQuantity, onAddToCartClick, onAddToCartQuantityChange
    } = this.props;
    console.log('CartAddButton: rendering...');
    return (
      <div
        className="ui fluid big green button"
        onClick={ event => onAddToCartClick(event) }
      >
        <div className="ui olive buttons" style={ numberPickerButtonsStyle }>
          <button data-name="minus" className="ui icon button">
            <i className="minus icon" data-name="minus"></i>
          </button>
          <div className="ui input">
            <input
              type="number"
              data-name="numberPicker"
              value={ addToCartQuantity }
              onChange={ event => onAddToCartQuantityChange(event) }
              style={ numberPickerStyle }
              min="1"
            />
          </div>
          <button data-name="plus" className="ui icon button">
            <i className="plus icon" data-name="plus"></i>
          </button>
        </div>
        <T>addToCart</T>
      </div>
    );
  }
}

CartAddButton.propTypes = {
  addToCartQuantity: PropTypes.number.isRequired,
  onAddToCartClick: PropTypes.func.isRequired,
  onAddToCartQuantityChange: PropTypes.func.isRequired
};
