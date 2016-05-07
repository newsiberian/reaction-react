import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import { reduxForm } from "redux-form";
import i18next from "i18next";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import ToggleWrapper from "../../../layout/components/ToggleWrapper.jsx";
export const fields = [
  "name",
  "label",
  "group",
  "enabled",
  "cost",
  "handling",
  "rate"
];

const validate = values => {
  const errors = {};

  if (!values.name || !values.name.trim()) {
    errors.name = i18next.t("error.isRequired", {
      field: i18next.t("shipping.name")
    });
  }

  if (!values.label || !values.label.trim()) {
    errors.label = i18next.t("error.isRequired", {
      field: i18next.t("shipping.label")
    });
  }

  if (!values.group || !values.group.trim()) {
    errors.group = i18next.t("error.isRequired", {
      field: i18next.t("shipping.group")
    });
  }

  if (!Number.isFinite(+values.cost)) {
    errors.cost = i18next.t("error.mustBeNumber", {
      field: i18next.t("shipping.cost")
    });
  } else if (Number.isFinite(+values.cost) < 0) {
    errors.cost = i18next.t("error.theValueMustNotBeNegative");
  }

  if (!Number.isFinite(+values.handling)) {
    errors.handling = i18next.t("error.mustBeNumber", {
      field: i18next.t("shipping.handling")
    });
  } else if (Number.isFinite(+values.handling) < 0) {
    errors.handling = i18next.t("error.theValueMustNotBeNegative");
  }

  if (!Number.isFinite(+values.rate)) {
    errors.rate = i18next.t("error.mustBeNumber", {
      field: i18next.t("shipping.rate")
    });
  } else if (Number.isFinite(+values.rate) < 0) {
    errors.rate = i18next.t("error.theValueMustNotBeNegative");
  }

  return errors;
};

class AddMethodForm extends Component {
  render() {
    const {
      fields: { name, label, group, enabled, cost, handling, rate }, handleSubmit, pristine, submitting, t
    } = this.props;
    return (
      <form onSubmit={handleSubmit} style={{ marginLeft: 20 }}>
        <TextField
          {...name}
          floatingLabelText={t("shipping.name")}
          errorText={name.touched && name.error}
        />
        <TextField
          {...label}
          floatingLabelText={t("shipping.label")}
          errorText={label.touched && label.error}
        />
        <TextField
          {...group}
          floatingLabelText={t("shipping.group")}
          errorText={group.touched && group.error}
        />
        <TextField
          {...cost}
          floatingLabelText={t("shipping.cost")}
          errorText={cost.touched && cost.error}
          type="number"
        />
        <TextField
          {...handling}
          floatingLabelText={t("shipping.handling")}
          errorText={handling.touched && handling.error}
          type="number"
        />
        <TextField
          {...rate}
          floatingLabelText={t("shipping.rate")}
          errorText={rate.touched && rate.error}
          type="number"
        />
        <div style={{paddingRight: 20, marginTop: "1rem", marginBottom: "1rem"}}>
          <ToggleWrapper
            {...enabled}
            label={t("shipping.enabled")}
          />
        </div>
        <FlatButton
          label={t("app.save")}
          primary={true}
          type="submit"
          disabled={pristine || submitting}
          style={{ marginBottom: "1rem" }}
        />
      </form>
    );
  }
}

AddMethodForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired
};

export default translate(["core", "reaction-react"])(reduxForm({
  form: "shippingAddMethodForm",
  fields,
  validate
})(AddMethodForm));
