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
  const nameLength = 35;
  const descriptionLength = 160;
  const keywordsLength = 256;
  if (!values.name) {
    errors.name = i18next.t("error.nameRequired");
  } else if (values.name && values.name.length > nameLength) {
    errors.name = i18next.t("error.mustBeXorLess", { number: nameLength });
  }
  if (!values.email) {
    errors.email = i18next.t("accountsUI.error.emailRequired");
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = i18next.t("accountsUI.error.emailDoesntMatchTheCriteria");
  }
  if (values.description &&
    values.description.length > descriptionLength) {
    errors.description = i18next.t("error.mustBeXorLess", {
      number: descriptionLength
    });
  }
  if (values.keywords && values.keywords.length > keywordsLength) {
    errors.keywords = i18next.t("error.mustBeXorLess", {
      number: keywordsLength
    });
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
        />
        <TextField
          {...email}
          hintText={t("shopEditForm.emailPlaceholder")}
          floatingLabelText={t("shopEditForm.email")}
          errorText={email.error}
        />
        <TextField
          {...description}
          hintText={t("shopEditForm.descriptionPlaceholder")}
          floatingLabelText={t("shopEditForm.description")}
          multiLine={true}
          rows={3}
          rowsMax={3}
          errorText={description.error}
        />
        <TextField
          {...keywords}
          hintText={t("shopEditForm.keywordsPlaceholder")}
          floatingLabelText={t("shopEditForm.keywords")}
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
