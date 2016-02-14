import { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import Formsy from "formsy-react";
import { FormsySelect, FormsyText } from "formsy-material-ui/lib";
import FlatButton from "material-ui/lib/flat-button";

/**
 * @class LocalizationForm
 * @classdesc
 */
class LocalizationForm extends Component {
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
        <FormsySelect
          name="timezone"
          required
          floatingLabelText="How often?"
          menuItems={this.selectFieldItems}
        />
        <FormsyText
          name="addressBook.0.company"
          validations="isWords"
          //validationError={}
          required
          hintText={t("shopEditAdressForm.companyPlaceholder")}
          floatingLabelText={t("shopEditAdressForm.company")} // 60 chars max
        />
      </Formsy.Form>
    );
  }
}

LocalizationForm.propTypes = {};

export default translate("core")(LocalizationForm);
