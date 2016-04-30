import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import { reduxForm } from "redux-form";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import i18next from "i18next";
import { styles } from "../../styles/settings";
export const fields = [
  "company",
  "fullName",
  "address1",
  "address2",
  "city",
  "region",
  "postal",
  "country",
  "phone"
];

const validate = values => {
  const errors = {};

  // TODO now it is optional
  //if (!values.company) {
  //  errors.company = i18next.t("error.nameRequired");
  //} else if (values.company && values.company.length > nameLength) {
  //  errors.company = i18next.t("error.mustBeXorLess", { number: nameLength });
  //}
  if (!values.fullName || !values.fullName.trim()) {
    errors.fullName = i18next.t("error.isRequired", {
      field: i18next.t("shop.addressBook.fullName")
    });
  }
  if (!values.address1 || !values.address1.trim()) {
    errors.address1 = i18next.t("error.isRequired", {
      field: i18next.t("shop.addressBook.address1")
    });
  }
  if (!values.city || !values.city.trim()) {
    errors.city = i18next.t("error.isRequired", {
      field: i18next.t("shop.addressBook.city")
    });
  }
  if (!values.region || !values.region.trim()) {
    errors.region = i18next.t("error.isRequired", {
      field: i18next.t("shop.addressBook.region")
    });
  }
  if (!values.postal || !values.postal.trim()) {
    errors.postal = i18next.t("error.isRequired", {
      field: i18next.t("shop.addressBook.postal")
    });
  }
  if (!values.country || !values.country.trim()) {
    errors.country = i18next.t("error.isRequired", {
      field: i18next.t("shop.addressBook.country")
    });
  }
  if (!values.phone) {
    errors.phone = i18next.t("error.isRequired", {
      field: i18next.t("shop.addressBook.phone")
    });
  }

  return errors;
};

/**
 * @class AddressForm
 * @classdesc
 */
class AddressForm extends Component {
  render() {
    const {
      fields: { company, fullName, address1, address2, city, region,
      postal, country, phone }, t, handleSubmit, pristine, submitting
    } = this.props;
    return (
      <form onSubmit={handleSubmit} style={styles.form}>
        <TextField
          {...company}
          floatingLabelText={t("shop.addressBook.company")}
          hintText={t("shop.addressBook.companyPlaceholder")}
          errorText={company.touched && company.error}
        />
        <TextField
          {...fullName}
          floatingLabelText={t("shop.addressBook.fullName")}
          hintText={t("shop.addressBook.fullNamePlaceholder")}
          errorText={fullName.touched && fullName.error}
        />
        <TextField
          {...address1}
          floatingLabelText={t("shop.addressBook.address1")}
          hintText={t("shop.addressBook.address1Placeholder")}
          title={t("shop.addressBook.address1Tooltip")}
          errorText={address1.touched && address1.error}
        />
        <TextField
          {...address2}
          floatingLabelText={t("shop.addressBook.address2")}
          hintText={t("shop.addressBook.address2Placeholder")}
          errorText={address2.touched && address2.error}
          maxLength={10}
        />
        <TextField
          {...city}
          floatingLabelText={t("shop.addressBook.city")}
          errorText={city.touched && city.error}
        />
        <TextField
          {...region}
          floatingLabelText={t("shop.addressBook.region")}
          errorText={region.touched && region.error}
        />
        <TextField
          {...postal}
          floatingLabelText={t("shop.addressBook.postal")}
          errorText={postal.touched && postal.error}
        />
        <TextField
          // TODO add country selection here
          {...country}
          floatingLabelText={t("shop.addressBook.country")}
          errorText={country.touched && country.error}
        />
        <TextField
          {...phone}
          floatingLabelText={t("shop.addressBook.phone")}
          errorText={phone.touched && phone.error}
          type="tel"
        />
        <FlatButton
          label={t("app.saveChanges")}
          primary={true}
          type="submit"
          disabled={pristine || submitting}
        />
      </form>
    );
  }
}

AddressForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  t: PropTypes.func
};

export default translate("core")(reduxForm({
  form: "shopAddressForm",
  fields,
  validate
})(AddressForm));
