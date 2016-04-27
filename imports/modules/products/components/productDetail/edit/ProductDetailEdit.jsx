import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
// import shallowCompare from "react-addons-shallow-compare";
import look, { StyleSheet } from "react-look";

const c = StyleSheet.combineStyles;
const styles = StyleSheet.create({
  onChange: {
    backgroundColor: props => {
      if (props.fields[props.options.field].isChanged) {
        // fires effect rollback
        setTimeout(() => {
          props.productActions.rollbackFieldState(props.options.field);
        }, 400);
        return "#e2f2e2";
      }
      return "#fff";
    }
  }
});

class ProductDetailEdit extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.product[this.props.options.field] !==
      this.props.product[this.props.options.field] ||
      nextProps.fields[this.props.options.field] !==
      this.props.fields[this.props.options.field];
  }

  handleChange(event, field) {
    const { product, productActions } = this.props;
    productActions.changeProductField(product._id, field, event.target.value);
  }

  handleBlur(event, field) {
    const { product, productActions } = this.props;
    // ignore fake interactions
    if (product[field] !== event.target.value) {
      productActions.updateProductField(product._id, field, event.target.value);
    }
  }

  render() {
    const { product, options, t } = this.props;
    const { field, className } = options;

    console.log("ProductDetailEdit: rendering...");
    return (
      <input
        type="text"
        className={c(className, styles.onChange)}
        defaultValue={product[field]}
        onChange={event => this.handleChange(event, field)}
        onBlur={event => this.handleBlur(event, field)}
        placeholder={t(`productDetailEdit.${field}`)}
      />
    );
  }
}

ProductDetailEdit.propTypes = {
  options: PropTypes.shape({
    field: PropTypes.string.isRequired,
    value: PropTypes.string, // this field is not Required because in case
    // of social messages we could not have them.
    className: PropTypes.string
  }).isRequired,
  product: PropTypes.object.isRequired,
  productActions: PropTypes.shape({
    changeProductField: PropTypes.func,
    updateProductField: PropTypes.func,
    rollbackFieldState: PropTypes.func
  }).isRequired,
  fields: PropTypes.shape({ // product state from `store`
    title: PropTypes.object,
    pageTitle: PropTypes.object,
    vendor: PropTypes.object,
    description: PropTypes.object
  }),
  t: PropTypes.func
};

export default translate("core")(look(ProductDetailEdit));
