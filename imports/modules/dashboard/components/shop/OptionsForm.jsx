import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
//import { reduxForm } from "redux-form";
import FlatButton from "material-ui/lib/flat-button";
//import Divider from "material-ui/lib/divider";
import Toggle from "material-ui/lib/toggle";
//export const fields = [
//  "allowGuestCheckout"
//];


const styles = {
  block: {
    maxWidth: 250
  },
  toggle: {
    marginBottom: 16
  },
  long: {
    wordBreak: "keep-all",
    wordWrap: "break-word",
    hyphens: "auto"
  }
};

/**
 * @class GuestCheckoutForm
 * @classdesc
 */
class OptionsForm extends Component {
  handleValueChange() {
    const { allowGuestCheckout, formsActions, packageId } = this.props;
    //const toggled = event.target.value === "on";
    formsActions.submitForm(
      "Options", { allowGuestCheckout: !allowGuestCheckout }, packageId
    );
  }

  render() {
    //const {
    //  fields: { allowGuestCheckout }, handleSubmit, submitting, t
    //} = this.props;
    const { allowGuestCheckout, t } = this.props;
    return (
      <Toggle
        label={t("corePackageConfig.settings.public.allowGuestCheckout")}
        style={styles.toggle}
        onToggle={() => this.handleValueChange()}
        toggled={allowGuestCheckout}
      />
    );
    //return (
    //  <form onSubmit={handleSubmit}>
    //    <Toggle
    //      {...allowGuestCheckout}
    //      label={t("shopEditForm.allowGuestCheckout")}
    //      style={styles.toggle}
    //      //valueLink={{...allowGuestCheckout}}
    //      //toggled={allowGuestCheckout.value || false}
    //    />
    //    <FlatButton
    //      label={t("app.saveChanges")}
    //      primary={true}
    //      type="submit"
    //      disabled={submitting}
    //    />
    //    <Divider />
    //  </form>
    //);
  }
}

OptionsForm.propTypes = {
  //fields: PropTypes.object.isRequired,
  //handleSubmit: PropTypes.func.isRequired,
  //submitting: PropTypes.bool.isRequired,
  allowGuestCheckout: PropTypes.bool.isRequired,
  formsActions: PropTypes.shape({
    submitForm: PropTypes.func
  }).isRequired,
  packageId: PropTypes.string.isRequired,
  t: PropTypes.func
};

//export default translate("core")(reduxForm({
//  form: "shopOptionsForm",
//  fields
//})(OptionsForm));

export default translate("core")(OptionsForm);
