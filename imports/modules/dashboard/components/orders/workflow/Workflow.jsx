import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import List from "material-ui/List/List";
import ListItem from "material-ui/List/ListItem";
import Toggle from "material-ui/Toggle";
import Divider from "material-ui/Divider";
import Subheader from "material-ui/Subheader";
import { ActionBarWrapper } from
  "../../../layout/components/ActionBarWrapper.jsx";
// import LocalizationForm from "./LocalizationForm.jsx";
import { styles } from "../../styles/settings";

class Workflow extends Component {
  render() {
    const { t } = this.props;
    return (
      <div>

      </div>
    );
  }
}

Workflow.propTypes = {
  t: PropTypes.func.isRequired
};

const options = {
  title: "admin.settings.localizationAndI18NLabel"
};

// translate needed to pass `t` to `ActionBarWrapper`
export default translate("core")(ActionBarWrapper(Workflow, options));
