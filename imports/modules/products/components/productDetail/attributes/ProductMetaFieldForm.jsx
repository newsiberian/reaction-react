import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import i18next from "i18next";
import { reduxForm } from "redux-form";
import TextField from "material-ui/lib/text-field";
import FlatButton from "material-ui/lib/flat-button";
import ActionDone from "material-ui/lib/svg-icons/action/done";
import ContentClear from "material-ui/lib/svg-icons/content/clear";
import { blue500, grey400 } from "material-ui/lib/styles/colors";

export const fields = ["key", "value"];

const validate = values => {
  const errors = {};

  if (!values.key || !values.key.trim()) {
    errors.key = i18next.t("error.isRequired", {
      field: i18next.t("productDetail.detailsName")
    });
  }
  if (!values.value || !values.value.trim()) {
    errors.value = i18next.t("error.isRequired", {
      field: i18next.t("productDetail.detailsInfo")
    });
  }

  return errors;
};

/**
 * @class ProductMetaFieldForm
 * @classdesc ProductMetaFieldForm
 */
export default class ProductMetaFieldForm extends Component {
  render() {
    const {
      fields: { key, value }, formKey, t, handleSubmit, pristine, submitting,
      removeMetafields, productId
    } = this.props;
    const styles = {
      form: {
        display: "inline-flex",
        flexFlow: "row nowrap",
        position: "relative"
      },
      field: {
        width: "auto",
        marginLeft: ".5rem",
        marginRight: ".5rem"
      },
      remove: {
        minWidth: 48
      },
      submit: {
        position: "absolute",
        right: "-3rem",
        minWidth: 48,
        display: pristine ? "none" : "inline-block"
      }
    };
    return (
      <form onSubmit={handleSubmit} style={styles.form}>
        <TextField
          {...key}
          hintText={t("productDetail.detailsName")}
          errorText={key.touched && key.error}
          maxLength={20}
          style={styles.field}
        />
        <TextField
          {...value}
          hintText={t("productDetail.detailsInfo")}
          errorText={value.touched && value.error}
          style={styles.field}
        />
        {formKey !== "new" &&
          <FlatButton
            title={t("app.delete")}
            icon={<ContentClear color={grey400} />}
            style={styles.remove}
            onClick={() => removeMetafields(productId, {key: key.value, value: value.value})}
          />
        }
        <FlatButton
          title={t("app.saveChanges")}
          icon={<ActionDone color={blue500} />}
          primary={true}
          type="submit"
          disabled={pristine || submitting}
          style={styles.submit}
        />
      </form>
    );
  }
}

ProductMetaFieldForm.propTypes = {
  productId: PropTypes.string,
  removeMetafields: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired
};

export default translate("core")(reduxForm({
  form: "productMetafieldForm",
  fields,
  validate
})(ProductMetaFieldForm));
