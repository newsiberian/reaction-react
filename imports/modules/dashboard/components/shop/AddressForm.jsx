import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { reduxForm } from "redux-form";
import TextField from "material-ui/lib/text-field";
import FlatButton from "material-ui/lib/flat-button";
import i18next from "i18next";
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
  if (!values.fullName) {
    errors.fullName = i18next.t("error.isRequired", {
      field: i18next.t("shopEditAddressForm.fullname")
    });
  }
  if (!values.address1) {
    errors.address1 = i18next.t("error.isRequired", {
      field: i18next.t("shopEditAddressForm.address1")
    });
  }
  if (!values.city) {
    errors.city = i18next.t("error.isRequired", {
      field: i18next.t("address.city")
    });
  }
  if (!values.region) {
    errors.region = i18next.t("error.isRequired", {
      field: i18next.t("address.region")
    });
  }
  if (!values.postal) {
    errors.postal = i18next.t("error.isRequired", {
      field: i18next.t("address.postal")
    });
  }
  if (!values.country) {
    errors.country = i18next.t("error.isRequired", {
      field: i18next.t("address.country")
    });
  }
  if (!values.phone) {
    errors.phone = i18next.t("error.isRequired", {
      field: i18next.t("address.phone")
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
      postal, country, phone }, t, handleSubmit, submitting
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          {...company}
          hintText={t("shopEditAddressForm.companyPlaceholder")}
          floatingLabelText={t("shopEditAddressForm.company")}
          errorText={company.error}
        />
        <TextField
          {...fullName}
          hintText={t("shopEditAddressForm.fullnamePlaceholder")}
          floatingLabelText={t("shopEditAddressForm.fullname")}
          errorText={fullName.error}
        />
        <TextField
          {...address1}
          hintText={t("shopEditAddressForm.address1Placeholder")}
          floatingLabelText={t("shopEditAddressForm.address1")}
          tooltip={t("shopEditAddressForm.address1Tooltip")}
          errorText={address1.error}
        />
        <TextField
          {...address2}
          hintText={t("shopEditAddressForm.address2Placeholder")}
          floatingLabelText={t("address.address2")}
          errorText={address2.error}
          maxLength={10}
        />
        <TextField
          {...city}
          floatingLabelText={t("address.city")}
          errorText={city.error}
        />
        <TextField
          {...region}
          floatingLabelText={t("address.region")}
          errorText={region.error}
        />
        <TextField
          {...postal}
          floatingLabelText={t("address.postal")}
          errorText={postal.error}
        />
        <TextField
          // TODO add country selection here
          {...country}
          floatingLabelText={t("address.country")}
          errorText={country.error}
        />
        <TextField
          {...phone}
          floatingLabelText={t("address.phone")}
          errorText={phone.error}
          type="tel"
        />
        <FlatButton
          label={t("app.saveChanges")}
          primary={true}
          type="submit"
          disabled={submitting}
        />
      </form>
    );
  }
}

AddressForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired
};

export default translate("core")(reduxForm({
  form: "shopAddressForm",
  fields,
  validate
})(AddressForm));
