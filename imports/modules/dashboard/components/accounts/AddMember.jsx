import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { ActionBarWrapper } from
  "../../../layout/components/ActionBarWrapper.jsx";
import AddMemberForm from "./AddMemberForm.jsx";
import { styles } from "../../styles/settings";

/**
 * @class AddMember
 * @classdesc
 */
class AddMember extends Component {
  render() {
    const { t } = this.props;
    return (
      <AddMemberForm
        onSubmit={values => formsActions.submitForm("General", values)}
      />
    );
  }
}

AddMember.propTypes = {
  t: PropTypes.func.isRequired
};

const options = {
  title: "admin.settings.addShopMemberLabel"
};

export default translate("core")(ActionBarWrapper(AddMember, options));
