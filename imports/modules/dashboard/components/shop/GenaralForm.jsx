import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { reduxForm } from "redux-form";
import FlatButton from "material-ui/lib/flat-button";
import TextField from "material-ui/lib/text-field";
import i18next from "i18next";
import { styles } from "../../styles/settings";
export const fields = [
  "name",
  "email",
  "description",
  "keywords"
];

const validate = values => {
  const errors = {};

  if (!values.name) {
    errors.name = i18next.t("error.nameRequired");
  }
  if (!values.email) {
    errors.email = i18next.t("accountsUI.error.emailRequired");
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = i18next.t("accountsUI.error.emailDoesntMatchTheCriteria");
  }

  return errors;
};

/**
 * @class GenaralForm
 * @classdesc
 */
class GenaralForm extends Component {
  render() {
    const {
      fields: { name, email, description, keywords }, t, handleSubmit,
      pristine, submitting
    } = this.props;
    return (
      <form onSubmit={handleSubmit} style={styles.form}>
        <TextField
          {...name}
          floatingLabelText={t("shop.name")}
          hintText={t("shop.namePlaceholder")}
          errorText={name.touched && name.error}
          maxLength={35}
        />
        <TextField
          {...email}
          floatingLabelText={t("shop.email")}
          hintText={t("shop.emailPlaceholder")}
          errorText={email.touched && email.error}
          type="email"
        />
        <TextField
          {...description}
          floatingLabelText={t("shop.description")}
          hintText={t("shop.descriptionPlaceholder")}
          maxLength={160}
          multiLine={true}
          rows={3}
          rowsMax={3}
          title={t("shop.descriptionTooltip")}
          // we don't need to validate this field
          // errorText={description.touched && description.error}
        />
        <TextField
          {...keywords}
          floatingLabelText={t("shop.keywords")}
          hintText={t("shop.keywordsPlaceholder")}
          maxLength={256}
          multiLine={true}
          rows={3}
          rowsMax={3}
          // errorText={keywords.touched && keywords.error}
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

GenaralForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  t: PropTypes.func
};

export default translate("core")(reduxForm({
  form: "shopGeneralForm",
  fields,
  validate
})(GenaralForm));
