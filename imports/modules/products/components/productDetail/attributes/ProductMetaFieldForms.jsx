import React, { Component, PropTypes } from "react";
import Paper from "material-ui/Paper";
import ProductMetaFieldForm from "./ProductMetaFieldForm.jsx";

const styles = {
  container: {
    maxWidth: "30rem",
    marginBottom: "1rem"
  }
};

/**
 * @class ProductMetaFieldForms
 * @classdesc
 */
class ProductMetaFieldForms extends Component {
  render() {
    const { product, metafieldActions } = this.props;
    console.log("ProductMetaFieldForm: rendering...");
    return (
      <Paper zDepth={1} style={styles.container}>
        {product.metafields && product.metafields.map((metafield, index) => (
          <ProductMetaFieldForm
            key={index}
            formKey={index.toString()} // formKey should be a string
            initialValues={metafield}
            removeMetafields={metafieldActions.removeMetafields}
            productId={product._id} // for remove
            onSubmit={values =>
             metafieldActions.updateMetafield(product, index, values)}
          />
        ))}
        <ProductMetaFieldForm
          formKey={"new"}
          initialValues={{
            key: "",
            value: ""
          }}
          removeMetafields={metafieldActions.removeMetafields}
          onSubmit={values =>
           metafieldActions.updateMetafield(product, "new", values)}
        />
      </Paper>
    );
  }
}

ProductMetaFieldForms.propTypes = {
  metafieldActions: PropTypes.shape({
    changeMetafield: PropTypes.func,
    updateMetafield: PropTypes.func,
    removeMetafields: PropTypes.func
  }).isRequired,
  newMetafield: PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string
  })
};

export default ProductMetaFieldForms;
