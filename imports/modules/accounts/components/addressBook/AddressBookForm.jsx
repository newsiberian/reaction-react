import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import { reduxForm } from "redux-form";
import i18next from "i18next";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import CheckboxWrapper from "../../../layout/components/CheckboxWrapper.jsx";

const validate = values => {
  const errors = {};

  if (!values.fullName || !values.fullName.trim()) {
    errors.fullName = i18next.t("error.isRequired", {
      field: i18next.t("address.fullName")
    });
  }
  if (!values.address1 || !values.address1.trim()) {
    errors.address1 = i18next.t("error.isRequired", {
      field: i18next.t("address.address1")
    });
  }
  if (!values.city || !values.city.trim()) {
    errors.city = i18next.t("error.isRequired", {
      field: i18next.t("address.city")
    });
  }
  if (!values.region || !values.region.trim()) {
    errors.region = i18next.t("error.isRequired", {
      field: i18next.t("address.region")
    });
  }
  if (!values.postal || !values.postal.trim()) {
    errors.postal = i18next.t("error.isRequired", {
      field: i18next.t("address.postal")
    });
  }
  if (!values.country || !values.country.trim()) {
    errors.country = i18next.t("error.isRequired", {
      field: i18next.t("address.country")
    });
  }
  if (!values.phone || !values.phone.trim()) {
    errors.phone = i18next.t("error.isRequired", {
      field: i18next.t("address.phone")
    });
  }

  return errors;
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
  },
  checkbox: {
    marginTop: "1rem"
  },
  submit: {
    marginTop: "2rem"
  }
};

class AddressBookForm extends Component {
  render() {
    const {
      fields: { country, fullName, address1, address2, city, region,
      postal, phone, isShippingDefault, isBillingDefault, isCommercial },
      handleSubmit, pristine, submitting, t, hasAddressBookEntries,
      addressBookActions
    } = this.props;
    return (
      <form onSubmit={handleSubmit} style={styles.form}>
        <TextField
          {...fullName}
          floatingLabelText={t("address.fullName")}
          // hintText={t("address.fullNamePlaceholder")}
          errorText={fullName.touched && fullName.error}
          fullWidth={true}
        />
        <TextField
          {...address1}
          floatingLabelText={t("address.address1")}
          // hintText={t("address.address1Placeholder")}
          // title={t("address.address1Tooltip")}
          errorText={address1.touched && address1.error}
          fullWidth={true}
        />
        <TextField
          {...address2}
          floatingLabelText={t("address.address2")}
          // hintText={t("address.address2Placeholder")}
          errorText={address2.touched && address2.error}
          maxLength={10}
          fullWidth={true}
        />
        <TextField
          {...city}
          floatingLabelText={t("address.city")}
          errorText={city.touched && city.error}
          fullWidth={true}
        />
        <TextField
          {...region}
          floatingLabelText={t("address.region")}
          errorText={region.touched && region.error}
          fullWidth={true}
        />
        <TextField
          {...postal}
          floatingLabelText={t("address.postal")}
          errorText={postal.touched && postal.error}
          fullWidth={true}
        />
        <TextField
          // TODO add country selection here
          {...country}
          floatingLabelText={t("address.country")}
          errorText={country.touched && country.error}
          fullWidth={true}
        />
        <TextField
          {...phone}
          floatingLabelText={t("address.phone")}
          errorText={phone.touched && phone.error}
          fullWidth={true}
          type="tel"
        />
        {hasAddressBookEntries &&
          <CheckboxWrapper
            {...isShippingDefault}
            label={t("address.isShippingDefault")}
            style={styles.checkbox}
          />
        }
        {hasAddressBookEntries &&
          <CheckboxWrapper
            {...isBillingDefault}
            label={t("address.isBillingDefault")}
            style={styles.checkbox}
          />
        }
        <CheckboxWrapper
          {...isCommercial}
          label={t("address.isCommercial")}
          style={styles.checkbox}
        />
        <div style={styles.submit}>
          <FlatButton
            label={t("app.saveChanges")}
            primary={true}
            type="submit"
            disabled={pristine || submitting}
          />
          {hasAddressBookEntries &&
            <FlatButton
              label={t("app.cancel")}
              disabled={submitting}
              onTouchTap={() =>
                addressBookActions.changeCurrentView("addressBookGrid")}
              style={styles.cancel}
            />
          }
        </div>
      </form>
    );
  }
}

AddressBookForm.propTypes = {
  addressBookActions: PropTypes.shape({
    changeCurrentView: PropTypes.func
  }).isRequired,
  hasAddressBookEntries: PropTypes.bool.isRequired,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired
};

export default translate("core")(reduxForm({
  form: "accountsAddressBookForm",
  // fields,
  validate
})(AddressBookForm));
