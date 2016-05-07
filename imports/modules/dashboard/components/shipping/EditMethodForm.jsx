import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import { reduxForm } from "redux-form";
import i18next from "i18next";
import Subheader from "material-ui/Subheader";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import IconButton from "material-ui/IconButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import ToggleWrapper from "../../../layout/components/ToggleWrapper.jsx";
import ValidRanges from "./ValidRanges.jsx";
import ValidLocales from "./ValidLocales.jsx";
export const fields = [
  "name",
  "label",
  "group",
  "enabled",
  "cost",
  "handling",
  "rate",
  "validRanges[].begin",
  "validRanges[].end",
  "validLocales[].origination",
  "validLocales[].destination",
  "validLocales[].deliveryBegin",
  "validLocales[].deliveryEnd"
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

const styles = {
  subheader: {
    marginTop: "1rem",
    lineHeight: "24px",
    backgroundColor: "#ccc"
  }
};

class EditMethodForm extends Component {
  render() {
    const {
      fields: { name, label, group, enabled, cost, handling, rate, validRanges,
      validLocales }, handleSubmit, pristine, submitting, t
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
        <div style={{paddingRight: 20, marginTop: "1rem"}}>
          <ToggleWrapper
            {...enabled}
            label={t("shipping.enabled")}
          />
        </div>
        
        <Subheader style={styles.subheader}>{t("shippingMethod.matchingCartRanges")}</Subheader>
        <IconButton
          tooltip={t("shipping.addNewCondition")}
          onTouchTap={() => validRanges.addField()}
        >
          <ContentAdd />
        </IconButton>
        {validRanges.length ? validRanges.map((validRange, index) => (
          <ValidRanges
            key={index}
            index={index}
            {...validRange}
            validRanges={validRanges}
          />
        )) :
          <ValidRanges index={0} begin={validRanges.begin} end={validRanges.end} validRanges={validRanges} />
        }

        <Subheader style={styles.subheader}>{t("shippingMethod.matchingLocales")}</Subheader>
        <IconButton
          tooltip={t("shipping.addNewCondition")}
          onTouchTap={() => validLocales.addField()}
        >
          <ContentAdd />
        </IconButton>
        {validLocales.length ? validLocales.map((validLocale, index) => (
          <ValidLocales
            key={index}
            index={index}
            {...validLocale}
            validLocales={validLocales}
          />
        )) :
          <ValidLocales
            index={0}
            origination={validLocales.origination}
            destination={validLocales.destination}
            deliveryBegin={validLocales.deliveryBegin}
            deliveryEnd={validLocales.deliveryEnd}
            validLocales={validLocales}
          />
        }
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

EditMethodForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired
};

export default translate(["core", "reaction-react"])(reduxForm({
  form: "shippingEditMethodForm",
  fields,
  validate
})(EditMethodForm));
