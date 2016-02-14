import { Component, PropTypes } from "react";
import Formsy from "formsy-react";
import { FormsyText } from "formsy-material-ui/lib";
import FlatButton from "material-ui/lib/flat-button";
import { _i18n } from "meteor/universe:i18n";

/**
 * @class GenaralForm
 * @classdesc
 */
export default class GenaralForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
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
          hintText="Shop Name"
          floatingLabelText="Name" // 60 chars max
        />
        <FormsyText
          name="emails.0.address"
          validations="isWords"
          //validationError={}
          required
          hintText="Primary Contact Email"
          floatingLabelText="Email"
        />
        <FormsyText
          name="description"
          validations="isWords"
          //validationError={}
          required
          hintText="Describe your shop for SEO" // 160 chars
          floatingLabelText="Description"
          multiLine={true}
          rowsMax={3}
        />
        <FormsyText
          name="keywords"
          validations="isWords"
          //validationError={}
          required
          hintText="Meta keywords for SEO"
          floatingLabelText="Keywords" // let it be 256 chars max
          multiLine={true}
          rowsMax={3}
        />
        <FlatButton label={_i18n.__("reaction.core.app.saveChanges")} primary={true} />
      </Formsy.Form>
    );
  }
}

GenaralForm.propTypes = {};
