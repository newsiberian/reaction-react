import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import DashboardHeader from "../DashboardHeader.jsx";
// import { ReactionCore } from "meteor/reactioncommerce:core";
import { layoutStyles } from "../../../layout/styles/layout";
import UsersGroup from "./UsersGroup.jsx";

const styles = {
  base: {
    paddingTop: "1rem",
    paddingBottom: "1rem"
  }
};

class Management extends Component {
  render() {
    const { guests, members, layoutSettingsActions, t } = this.props;
    return (
      <div style={layoutStyles.parent}>
        <section style={layoutStyles.section}>
          { /* header section */ }
          <DashboardHeader label={t("admin.dashboard.accountsLabel")} />

          { /* main section */ }
          <div className="container-fluid" style={styles.base}>
            {/* shop members */}
            <UsersGroup
              groupName="shopMembers"
              layoutSettingsActions={layoutSettingsActions}
              usersGroup={members}
            />

            {/* customers */}
            <UsersGroup
              groupName="guests"
              layoutSettingsActions={layoutSettingsActions}
              usersGroup={guests}
            />
          </div>
        </section>
      </div>
    );
  }
}

Management.propTypes = {
  guests: PropTypes.array.isRequired,
  members: PropTypes.array.isRequired,
  layoutSettingsActions: PropTypes.shape({
    openSettings: PropTypes.func,
    closeSettings: PropTypes.func
  }).isRequired,
  t: PropTypes.func.isRequired
};

export default translate("core")(Management);
