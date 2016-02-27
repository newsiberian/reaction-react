import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
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

/**
 * @class Management
 * @classdesc
 */
class Management extends Component {
  render() {
    const { guests, members, t } = this.props;
    return (
      <div style={layoutStyles.parent}>
        <section style={layoutStyles.section}>
          { /* header section */ }
          <DashboardHeader title={t("admin.dashboard.accountsLabel")} />

          { /* main section */ }
          <div className="container-fluid" style={styles.base}>
            {/* shop members */}
            <UsersGroup
              groupName="shopMembers"
              usersGroup={members}
            />

            {/* customers */}
            <UsersGroup
              groupName="guests"
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
  t: PropTypes.func.isRequired
};

export default translate("core")(Management);
