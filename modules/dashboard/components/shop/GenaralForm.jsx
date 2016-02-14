import { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import Formsy from "formsy-react";
import { FormsyText } from "formsy-material-ui/lib";
import FlatButton from "material-ui/lib/flat-button";
//import { _i18n } from "meteor/universe:i18n";

/**
 * @class GenaralForm
 * @classdesc
 */
class GenaralForm extends Component {
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
          name="name"
          validations="isWords"
          //validationError={}
          required
          hintText={t("shopEditForm.namePlaceholder")}
          floatingLabelText={t("shopEditForm.name")} // 60 chars max
        />
        <FormsyText
          name="emails.0.address"
          validations="isWords"
          //validationError={}
          required
          hintText={t("shopEditForm.emailPlaceholder")}
          floatingLabelText={t("shopEditForm.email")}
        />
        <FormsyText
          name="description"
          validations="isWords"
          //validationError={}
          required
          hintText={t("shopEditForm.descriptionPlaceholder")} // 160 chars
          floatingLabelText={t("shopEditForm.description")}
          multiLine={true}
          rows={3}
          rowsMax={3}
        />
        <FormsyText
          name="keywords"
          validations="isWords"
          //validationError={}
          required
          hintText={t("shopEditForm.keywordsPlaceholder")}
          floatingLabelText={t("shopEditForm.keywords")} // let it be 256 chars max
          multiLine={true}
          rows={3}
          rowsMax={3}
        />
        <FlatButton label={t("app.saveChanges")} primary={true} />
      </Formsy.Form>
    );
  }
}

GenaralForm.propTypes = {};

export default translate("core")(GenaralForm);
