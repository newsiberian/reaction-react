import React, { Component, PropTypes } from "react";
import Formsy from "formsy-react";
import { FormsyText } from "formsy-material-ui/lib";
import FlatButton from "material-ui/lib/flat-button";
import { translate } from "react-i18next/lib";

/**
 * @class ExternalServicesForm
 * @classdesc
 */
class ExternalServicesForm extends Component {
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
        <FlatButton label={t("app.saveChanges")} primary={true} />
      </Formsy.Form>
    );
  }
}

ExternalServicesForm.propTypes = {};

export default translate("core")(ExternalServicesForm);
