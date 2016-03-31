import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { reduxForm } from "redux-form";
// import look, { StyleSheet } from "react-look";
import i18next from "i18next";
import { getChildVariants } from "../../../../../client/helpers/products";
import FlatButton from "material-ui/lib/flat-button";
import Paper from "material-ui/lib/paper";
import TextField from "material-ui/lib/text-field";
import CheckboxWrapper from "../../../../layout/components/CheckboxWrapper.jsx";
export const fields = [
  "title",
  "weight",
  "inventoryQuantity",
  "price",
  "lowInventoryWarningThreshold",
  "taxable",
  "inventoryManagement",
  "inventoryPolicy"
];

// const c = StyleSheet.combineStyles;
const styles = {
  variantEditForm: {
    margin: "0px 10px 0 10px",
    // backgroundColor: "#ededed",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    cursor: "default",
    padding: "0px 8px 1px 8px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    fontSize: 12
  },
  fieldset: {
    padding: 0,
    margin: 0,
    border: 0,
    minWidth: 0
  },
  variantControls: {
    marginTop: "1rem",
    marginBottom: ".5rem"
  }
};

const validate = (values, props) => {
  const errors = {};
  const { variant, childVariantsCount } = props;

  if (!values.title) {
    errors.title = i18next.t("error.isRequired", {
      field: i18next.t("productVariant.title")
    });
  }
  // we are validating quantity only in case when management enabled and variant
  // doesn't have child variants
  if (variant.inventoryManagement && !childVariantsCount) {
    if (!values.inventoryQuantity) {
      errors.inventoryQuantity = i18next.t("error.isRequired", {
        field: i18next.t("productVariant.inventoryQuantity")
      });
    }
  }
  if (variant.inventoryManagement && !childVariantsCount) {
    if (!values.price) {
      errors.price = i18next.t("error.isRequired", {
        field: i18next.t("productVariant.price")
      });
    }
  }

  return errors;
};

class VariantForm extends Component {
  componentWillReceiveProps(nextProps) {
    // @link https://github.com/erikras/redux-form/issues/362#issuecomment-164013479
    if (nextProps.dirty && nextProps.valid) {
      let doubleDirty = false;
      Object.keys(nextProps.fields).forEach(key => {
        if (nextProps.fields[key].value !== this.props.fields[key].value) {
          doubleDirty = true;
        }
      });
      if (doubleDirty) {
        nextProps.handleSubmit();
      }
    }
  }

  render() {
    const {
      fields: { title, weight, inventoryQuantity, price, lowInventoryWarningThreshold,
      taxable, inventoryManagement, inventoryPolicy }, handleSubmit, productId,
      selectedVariant, variant, variantsActions, t, childVariantsCount
    } = this.props;
    // const childVariants = getChildVariants(productId, variant);
    return (
      <Paper zDepth={2} style={styles.variantEditForm}>
        <form onSubmit={handleSubmit}>
          <fieldset style={styles.fieldset}>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-9">
                <div className="col-sm-12">
                  <TextField
                    {...title}
                    floatingLabelText={t("productVariant.title")}
                    fullWidth={true}
                    errorText={title.touched && title.error}
                  />
                </div>
                <div className="row">
                  <div className="col-xs">
                    <TextField
                      {...weight}
                      floatingLabelText={t("productVariant.weight")}
                      fullWidth={true}
                      type="number"
                      min={0}
                      // errorText={weight.touched && weight.error}
                    />
                  </div>
                  <div className="col-xs">
                    <TextField
                      {...inventoryQuantity}
                      floatingLabelText={t("productVariant.inventoryQuantity")}
                      fullWidth={true}
                      type="number"
                      min={0}
                      // we are not listen `inventoryQuantity.touched` because of
                      // hack we using to submit this form
                      errorText={/*inventoryQuantity.touched && */inventoryQuantity.error}
                      disabled={Boolean(childVariantsCount)}
                    />
                  </div>
                  <div className="col-xs">
                    <TextField
                      {...price}
                      floatingLabelText={t("productVariant.price")}
                      fullWidth={true}
                      type="number"
                      min={0}
                      errorText={/*price.touched && */price.error}
                      disabled={Boolean(childVariantsCount)}
                    />
                  </div>
                  {variant.inventoryManagement &&
                    <div className="col-xs">
                      <TextField
                        {...lowInventoryWarningThreshold}
                        floatingLabelText={t("productVariant.lowInventoryWarningThreshold")}
                        fullWidth={true}
                        type="number"
                        min={0}
                        title={t("productVariant.lowInventoryWarningThresholdLabel")}
                      />
                    </div>
                  }
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-3">
                <CheckboxWrapper
                  {...taxable}
                  label={t("productVariant.taxable")}
                />
                <CheckboxWrapper
                  {...inventoryManagement}
                  label={t("productVariant.inventoryManagement")}
                  title={t("productVariant.inventoryManagementLabel")}
                />
                {variant.inventoryManagement &&
                  <CheckboxWrapper
                    {...inventoryPolicy}
                    label={t("productVariant.inventoryPolicy")}
                    title={t("productVariant.inventoryPolicyLabel")}
                  />
                }
              </div>
            </div>
          </fieldset>
        </form>

        <div className="col-sm-12" style={styles.variantControls}>
          <FlatButton
            label={t("productDetailEdit.addVariantOption")}
            onTouchTap={() => variantsActions.createChildVariant(variant._id)}
          />
          <FlatButton
            label={t("productDetailEdit.duplicateVariant")}
            onTouchTap={() => variantsActions.cloneVariant(productId, variant._id)}
          />
          <FlatButton
            label={t("productDetailEdit.removeVariant")}
            onTouchTap={() => variantsActions.deleteVariant(variant, selectedVariant)}
          />
        </div>
      </Paper>
    );
  }
}

VariantForm.propTypes = {
  childVariantsCount: PropTypes.number.isRequired,
  productId: PropTypes.string.isRequired,
  productActions: PropTypes.shape({
    updateProductField: PropTypes.func
  }).isRequired,
  selectedVariant: PropTypes.object,
  t: PropTypes.func,
  variant: PropTypes.object.isRequired,
  variantsActions: PropTypes.shape({
    changeVariantFormVisibility: PropTypes.func,
    createChildVariant: PropTypes.func,
    cloneVariant: PropTypes.func,
    deleteVariant: PropTypes.func,
    getTopVariants: PropTypes.func
  }).isRequired,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func
};

export default translate("core")(reduxForm({
  form: "shopProductTopVariantForm",
  fields,
  validate
})(VariantForm));
