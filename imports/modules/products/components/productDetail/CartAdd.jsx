import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import FlatButton from "material-ui/lib/flat-button";
import Paper from "material-ui/lib/paper";
import TextField from "material-ui/lib/text-field";
import ContentAdd from "material-ui/lib/svg-icons/content/add";
import ContentRemove from "material-ui/lib/svg-icons/content/remove";
import {
  addToCartStyle, numberPickerButtonsStyle, numberPickerStyle
} from "../../styles/productDetail";

const styles = {
  container: {
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    display: "flex"
  },
  counter: {
    display: "flex", // this is needed for cases when "add to cart" phrase
    alignItems: "center", // displayed in two lines
    fontSize: 20,
    height: "auto",
    width: 40
  },
  counterContainer: { display: "flex", justifyContent: "space-around" },
  input: { textAlign: "right" },
  control: { minWidth: 44 },
  addToCartContainer: { display: "flex" },
  addToCart: { flex: "1 1 auto" },
  addToCartLabel: { color: "#fff", fontSize: "2.5vmin", fontWeight: 600 }
};

class CartAdd extends Component {
  // shouldComponentUpdate(nextProps) {
  //   // return nextProps.addToCartQuantity !== this.props.addToCartQuantity;
  // }

  handleAddToCartQuantityChange(event) {
    const { changeAddToCartQuantity, selectedVariant } = this.props;
    let value = +event.target.value;
    // we are not allow to set quantity lower than 1
    if (+event.target.value > 0 && +event.target.value < 999) {
      if (selectedVariant.inventoryManagement && selectedVariant.inventoryQuantity) {
        // if customer want buy more than have in stock, we give em all
        if (selectedVariant.inventoryQuantity < value) {
          value = selectedVariant.inventoryQuantity;
        }
      }
      // just in case we round a number
      changeAddToCartQuantity(~~value);
    }
  }

  handleAddToCartQuantityIncrement() {
    const { incrementAddToCartQuantity, selectedVariant, addToCartQuantity } = this.props;
    if (addToCartQuantity < 999) {
      if (selectedVariant.inventoryManagement && selectedVariant.inventoryQuantity) {
        // we can increment quantity not more then we have in inventoryQuantity
        if (addToCartQuantity < selectedVariant.inventoryQuantity) {
          incrementAddToCartQuantity();
        }
      } else {
        incrementAddToCartQuantity();
      }
    }
  }

  handleAddToCartQuantityDecrement() {
    if (this.props.addToCartQuantity > 1) {
      this.props.decrementAddToCartQuantity();
    }
  }

  render() {
    const { addToCartQuantity, selectedVariant, t } = this.props;
    console.log("CartAdd: rendering...");
    return (
      <Paper zDepth={1} style={styles.container}>
        <div
          className="col-xs-5 col-sm-4 col-md-4 col-lg-3"
          style={styles.counterContainer}
        >
          <FlatButton
            icon={<ContentRemove color="grey" />}
            style={styles.control}
            onTouchTap={() => this.handleAddToCartQuantityDecrement()}
          />
          <TextField
            id="add-to-cart-quantity"
            value={addToCartQuantity}
            min={1}
            max={999}
            type="number"
            style={styles.counter}
            inputStyle={styles.input}
            underlineShow={false}
            onChange={event => this.handleAddToCartQuantityChange(event)}
          />
          <FlatButton
            icon={<ContentAdd color="grey" />}
            style={styles.control}
            onTouchTap={() => this.handleAddToCartQuantityIncrement()}
          />
        </div>
        <div
          className="col-xs-7 col-sm-8 col-md-8 col-lg-9"
          style={styles.addToCartContainer}
        >
          <FlatButton
            backgroundColor="#449d44"
            hoverColor="#3C8A3C"
            fullWidth={true}
            label={t("productDetail.addToCart")}
            labelStyle={styles.addToCartLabel}
            // title={t("productDetailEdit.editOption")}
            style={styles.addToCart}
            // onTouchTap={() =>
            //        variantsActions.changeVariantFormVisibility(variant._id)}
          />
        </div>
      </Paper>
    );
  }

  // render() {
  //   const {
  //     addToCartQuantity, onAddToCartClick, onAddToCartQuantityChange
  //   } = this.props;
  //   console.log("CartAdd: rendering...");
  //   return (
  //     <div
  //       className="ui fluid big green button"
  //       onClick={ event => onAddToCartClick(event) }
  //       style={ addToCartStyle }
  //     >
  //       <div className="ui olive buttons" style={ numberPickerButtonsStyle }>
  //         <button data-name="minus" className="ui icon button">
  //           <i className="minus icon" data-name="minus"></i>
  //         </button>
  //         <div className="ui input">
  //           <input
  //             type="number"
  //             data-name="numberPicker"
  //             value={ addToCartQuantity }
  //             onChange={ event => onAddToCartQuantityChange(event) }
  //             style={ numberPickerStyle }
  //             min="1"
  //           />
  //         </div>
  //         <button data-name="plus" className="ui icon button">
  //           <i className="plus icon" data-name="plus"></i>
  //         </button>
  //       </div>
  //       <T>addToCart</T>
  //     </div>
  //   );
  // }
}

CartAdd.propTypes = {
  // current addToCart quantity state
  addToCartQuantity: PropTypes.number.isRequired,
  changeAddToCartQuantity: PropTypes.func,
  incrementAddToCartQuantity: PropTypes.func,
  decrementAddToCartQuantity: PropTypes.func,
  selectedVariant: PropTypes.object,
  t: PropTypes.func
};

export default translate("core")(CartAdd);
