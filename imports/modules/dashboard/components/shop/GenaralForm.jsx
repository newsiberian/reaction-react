import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { reduxForm } from "redux-form";
import FlatButton from "material-ui/lib/flat-button";
import TextField from "material-ui/lib/text-field";
import i18next from "i18next";
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
      submitting
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          {...name}
          hintText={t("shopEditForm.namePlaceholder")}
          floatingLabelText={t("shopEditForm.name")}
          errorText={name.error}
          maxLength={35}
        />
        <TextField
          {...email}
          hintText={t("shopEditForm.emailPlaceholder")}
          floatingLabelText={t("shopEditForm.email")}
          errorText={email.error}
          type="email"
        />
        <TextField
          {...description}
          hintText={t("shopEditForm.descriptionPlaceholder")}
          floatingLabelText={t("shopEditForm.description")}
          maxLength={160}
          multiLine={true}
          rows={3}
          rowsMax={3}
          errorText={description.error}
        />
        <TextField
          {...keywords}
          hintText={t("shopEditForm.keywordsPlaceholder")}
          floatingLabelText={t("shopEditForm.keywords")}
          maxLength={256}
          multiLine={true}
          rows={3}
          rowsMax={3}
          errorText={keywords.error}
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

GenaralForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired
};

export default translate("core")(reduxForm({
  form: "shopGeneralForm",
  fields,
  validate
})(GenaralForm));
