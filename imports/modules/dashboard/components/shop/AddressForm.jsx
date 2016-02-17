import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { reduxForm } from "redux-form";
import Formsy from "formsy-react";
import { FormsyText, FormsyToggle } from "formsy-material-ui/lib";
import FlatButton from "material-ui/lib/flat-button";

const fields = [
  "addressBook.0.company",
  "addressBook.0.fullName",
  "addressBook.0.address1",
  "addressBook.0.address2",
  "addressBook.0.city",
  "addressBook.0.region",
  "addressBook.0.postal",
  "addressBook.0.country",
  "addressBook.0.phone"
];

const errorMessages = {
  wordsError: "Please only use letters",
  numericError: "Please provide a number",
  urlError: "Please provide a valid URL"
};

/**
 * @class AddressForm
 * @classdesc
 */
class AddressForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { t, address } = this.props;
    return (
      <Formsy.Form
        //onValid={this.enableButton}
        //onInvalid={this.disableButton}
        //onValidSubmit={this.submitForm}
      >
        <FormsyText
          name="addressBook.0.company"
          //validations="maxLength:60"
          //validationError={}
          value={address.company}
          hintText={t("shopEditAdressForm.companyPH")}
          floatingLabelText={t("shopEditAdressForm.company")}
        />
        <FormsyText
          name="addressBook.0.fullName"
          //validations="maxLength:256"
          //validationError={}
          value={address.fullName}
          required
          hintText={t("shopEditAdressForm.fullnamePH")}
          floatingLabelText={t("shopEditAdressForm.fullname")}
        />
        <FormsyText
          name="addressBook.0.address1"
          //validations="maxLength:256"
          //validationError={}
          value={address.address1}
          required
          hintText={t("shopEditAdressForm.address1PH")}
          floatingLabelText={t("shopEditAdressForm.address1")}
          tooltip={t("shopEditAdressForm.address1Tooltip")}
        />
        <FormsyText
          name="addressBook.0.address2"
          //validations="maxLength:20"
          //validationError={}
          value={address.address2}
          hintText={t("shopEditAdressForm.address2PH")}
          floatingLabelText={t("address.address2")} // 60 chars max
        />
        <FormsyText
          name="addressBook.0.city"
          validations="isWords"
          //validationError={}
          value={address.city}
          required
          //hintText={t("shopEditAdressForm.address2PH")}
          floatingLabelText={t("address.city")}
        />
        <FormsyText
          name="addressBook.0.region"
          validations="isWords"
          //validationError={}
          value={address.region}
          required
          //hintText={t("shopEditAdressForm.address2PH")}
          floatingLabelText={t("address.region")}
        />
        <FormsyText
          name="addressBook.0.postal"
          validations="isAlphanumeric"
          //validationError={}
          value={address.postal}
          required
          //hintText={t("shopEditAdressForm.address2PH")}
          floatingLabelText={t("address.postal")}
        />
        <FormsyText
          // TODO add country selection here
          name="addressBook.0.country"
          //validations="isWords"
          //validationError={}
          value={address.country}
          required
          //hintText={t("shopEditAdressForm.address2PH")}
          floatingLabelText={t("address.country")}
        />
        <FormsyText
          // TODO add validation rule
          name="addressBook.0.phone"
          //validations="isWords"
          //validationError={}
          value={address.phone}
          required
          //hintText={t("shopEditAdressForm.address2PH")}
          floatingLabelText={t("address.phone")}
        />
        {/*<FormsyToggle
          name="addressBook.0.isCommercial"
          label={t("address.isCommercial")}
        />
        <FormsyToggle
          name="addressBook.0.isShippingDefault"
          label={t("address.isShippingDefault")}
        />
        <FormsyToggle
          name="addressBook.0.isBillingDefault"
          label={t("address.isBillingDefault")}
        />*/}
        <FlatButton
          label={t("app.saveChanges")}
          primary={true}
          type="submit"
        />
      </Formsy.Form>
    );
  }
}

AddressForm.propTypes = {
  address: PropTypes.shape({

  })
};

export default translate("core")(reduxForm({
  form: "shopAddress",
  fields
})(AddressForm));
