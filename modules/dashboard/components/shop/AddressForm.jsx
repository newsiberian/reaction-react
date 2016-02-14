import { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import Formsy from "formsy-react";
import { FormsyText, FormsyToggle } from "formsy-material-ui/lib";
import FlatButton from "material-ui/lib/flat-button";

/**
 * @class AddressForm
 * @classdesc
 */
class AddressForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { t } = this.props;
    return (
      <Formsy.Form
        //onValid={this.enableButton}
        //onInvalid={this.disableButton}
        //onValidSubmit={this.submitForm}
      >
        <FormsyText
          name="addressBook.0.company"
          validations="isWords"
          //validationError={}
          required
          hintText={t("shopEditAdressForm.companyPlaceholder")}
          floatingLabelText={t("shopEditAdressForm.company")} // 60 chars max
        />
        <FormsyText
          name="addressBook.0.fullName"
          validations="isWords"
          //validationError={}
          required
          hintText={t("shopEditAdressForm.fullnamePlaceholder")}
          floatingLabelText={t("shopEditAdressForm.fullname")} // 60 chars max
        />
        <FormsyText
          name="addressBook.0.address1"
          validations="isWords"
          //validationError={}
          required
          hintText={t("shopEditAdressForm.address1Placeholder")}
          floatingLabelText={t("shopEditAdressForm.address1")} // 60 chars max
          tooltip={t("shopEditAdressForm.address1Tooltip")}
        />
        <FormsyText
          name="addressBook.0.address2"
          validations="isWords"
          //validationError={}
          hintText={t("shopEditAdressForm.address2Placeholder")}
          floatingLabelText={t("address.address2")} // 60 chars max
        />
        <FormsyText
          name="addressBook.0.city"
          validations="isWords"
          //validationError={}
          required
          //hintText={t("shopEditAdressForm.address2Placeholder")}
          floatingLabelText={t("address.city")} // 60 chars max
        />
        <FormsyText
          name="addressBook.0.region"
          validations="isWords"
          //validationError={}
          required
          //hintText={t("shopEditAdressForm.address2Placeholder")}
          floatingLabelText={t("address.region")} // 60 chars max
        />
        <FormsyText
          name="addressBook.0.postal"
          validations="isWords"
          //validationError={}
          required
          //hintText={t("shopEditAdressForm.address2Placeholder")}
          floatingLabelText={t("address.postal")} // 60 chars max
        />
        <FormsyText
          // TODO add country selection here
          name="addressBook.0.country"
          validations="isWords"
          //validationError={}
          required
          //hintText={t("shopEditAdressForm.address2Placeholder")}
          floatingLabelText={t("address.country")} // 60 chars max
        />
        <FormsyText
          name="addressBook.0.phone"
          validations="isWords"
          //validationError={}
          required
          //hintText={t("shopEditAdressForm.address2Placeholder")}
          floatingLabelText={t("address.phone")} // 60 chars max
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

        <FlatButton label={t("app.saveChanges")} primary={true} />
      </Formsy.Form>
    );
  }
}

AddressForm.propTypes = {};

export default translate("core")(AddressForm);
