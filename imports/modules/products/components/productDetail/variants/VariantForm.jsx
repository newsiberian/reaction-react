import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import ContentClear from "material-ui/svg-icons/content/clear";
import Divider from "material-ui/Divider";
import IconButton from "material-ui/IconButton";
import FlatButton from "material-ui/FlatButton";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import Checkbox from "material-ui/Checkbox";
import Subheader from "material-ui/Subheader";

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
  },
  divider: {
    marginBottom: ".5rem",
    marginLeft: "-8px",
    marginRight: "-8px",
    height: 2
  },
  table: {
    table: {
      width: "100%"
    },
    title: {
      minWidth: 200
    }
  }
};

class VariantForm extends Component {
  /**
   * handleBlur
   * @summary onBlur input fields handler
   * @param event
   * @param {String} variantId - object with variant or option data
   * @param {String} field - field name
   * @param {String} type - could be "variant" or "option"
   */
  handleBlur(event, variantId, field, type = "variant") {
    const { productActions, variantsActions, displayAlert, t } = this.props;
    const value = event.target.value;

    // if some of the fields become empty we send validation error
    if (~["title", "price", "weight", "inventoryQuantity"].indexOf(field)) {
      if (value === "") {
        displayAlert({ message: t("error.isRequired",
          { field: t(`productVariant.${field}`) }) });
        return;
      }
    }

    // first we need to make sync with `optionTitle` field because we not fill it
    // manually
    if (type === "option" && field === "title") {
      variantsActions.syncWithTitle(variantId, value);
    }

    productActions.updateProductField(variantId, field, value, "variant");
  }

  render() {
    const {
      productId, selectedVariant, variant, variantsActions, t, childVariants,
      productActions
    } = this.props;
    console.log("VariantForm rendering...");
    return (
      <Paper zDepth={2} style={styles.variantEditForm}>
        <fieldset style={styles.fieldset}>
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-9">
              <div className="col-sm-12">
                <TextField
                  defaultValue={variant.title}
                  floatingLabelText={t("productVariant.title")}
                  fullWidth={true}
                  // errorText={title.touched && title.error}
                  onBlur={event =>
                   this.handleBlur(event, variant._id, "title")}
                />
              </div>
              <div className="row">
                <div className="col-xs">
                  <TextField
                    defaultValue={variant.weight || 0}
                    floatingLabelText={t("productVariant.weight")}
                    fullWidth={true}
                    type="number"
                    min={0}
                    // errorText={weight.touched && weight.error}
                    onBlur={event =>
                     this.handleBlur(event, variant._id, "weight")}
                  />
                </div>
                <div className="col-xs">
                  <TextField
                    defaultValue={variant.inventoryQuantity || 0}
                    floatingLabelText={t("productVariant.inventoryQuantity")}
                    fullWidth={true}
                    type="number"
                    min={0}
                    disabled={Boolean(childVariants.length)}
                    onBlur={event =>
                     this.handleBlur(event, variant._id, "inventoryQuantity")}
                  />
                </div>
                <div className="col-xs">
                  <TextField
                    defaultValue={variant.price || 0}
                    floatingLabelText={t("productVariant.price")}
                    fullWidth={true}
                    type="number"
                    min={0}
                    disabled={Boolean(childVariants.length)}
                    onBlur={event =>
                     this.handleBlur(event, variant._id, "price")}
                  />
                </div>
                {variant.inventoryManagement &&
                  <div className="col-xs">
                    <TextField
                      defaultValue={variant.lowInventoryWarningThreshold}
                      floatingLabelText={t("productVariant.lowInventoryWarningThreshold")}
                      fullWidth={true}
                      type="number"
                      min={0}
                      title={t("productVariant.lowInventoryWarningThresholdLabel")}
                      onBlur={event =>
                       this.handleBlur(event, variant._id, "lowInventoryWarningThreshold")}
                    />
                  </div>
                }
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-3">
              <Checkbox
                defaultChecked={variant.taxable}
                label={t("productVariant.taxable")}
                onCheck={(event, checked) => productActions.updateProductField(
                  variant._id, "taxable", checked, "variant")}
              />
              <Checkbox
                defaultChecked={variant.inventoryManagement}
                label={t("productVariant.inventoryManagement")}
                title={t("productVariant.inventoryManagementLabel")}
                onCheck={(event, checked) => productActions.updateProductField(
                  variant._id, "inventoryManagement", checked, "variant")}
              />
              {variant.inventoryManagement &&
                <Checkbox
                  defaultChecked={variant.inventoryPolicy}
                  label={t("productVariant.inventoryPolicy")}
                  title={t("productVariant.inventoryPolicyLabel")}
                  onCheck={(event, checked) => productActions.updateProductField(
                    variant._id, "inventoryPolicy", checked, "variant")}
                />
              }
            </div>
          </div>
        </fieldset>

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
        {Boolean(childVariants.length) &&
          <div>
            <Divider style={styles.divider} />
            <Subheader>{t("productVariant.variantOptions")}</Subheader>
            <table style={styles.table.table}>
              <thead>
                <tr>
                  <th style={styles.table.title}>{t("productVariant.title")}</th>
                  <th>{t("productVariant.inventoryQuantity")}</th>
                  <th cols="2">{t("productVariant.price")}</th>
                </tr>
              </thead>
              <tbody>
                {childVariants.map(childVariant => (
                  <tr key={childVariant._id}>
                    <td style={styles.table.title}>
                      <TextField
                        defaultValue={childVariant.title}
                        fullWidth={true}
                        hintText={t("productVariant.title")}
                        onBlur={event => this.handleBlur(event, childVariant._id,
                          "title", "option")}
                      />
                    </td>
                    <td>
                      <TextField
                        defaultValue={childVariant.inventoryQuantity || 0}
                        hintText={t("productVariant.inventoryQuantity")}
                        fullWidth={true}
                        type="number"
                        min={0}
                        onBlur={event => this.handleBlur(event, childVariant._id,
                          "inventoryQuantity", "option")}
                      />
                    </td>
                    <td>
                      <TextField
                        defaultValue={childVariant.price || 0}
                        hintText={t("productVariant.price")}
                        fullWidth={true}
                        type="number"
                        min={0}
                        onBlur={event => this.handleBlur(event, childVariant._id,
                          "price", "option")}
                      />
                    </td>
                    <td>
                      <IconButton
                        tooltip={t("productDetailEdit.removeVariant")}
                        tooltipPosition="top-left"
                        onTouchTap={() =>
                         variantsActions.deleteVariant(childVariant, null, "option")}
                      >
                        <ContentClear />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
      </Paper>
    );
  }
}

VariantForm.propTypes = {
  childVariants: PropTypes.arrayOf(PropTypes.object),
  displayAlert: PropTypes.func,
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
    getTopVariantsArray: PropTypes.func,
    syncWithTitle: PropTypes.func
  }).isRequired
};

export default translate(["core", "reaction-react"])(VariantForm);
