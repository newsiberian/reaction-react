import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import LeftNav from "material-ui/lib/left-nav";
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
    const {
      children, guests, members, permActions, routeActions, t,
      selectedUser
    } = this.props;
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
              togglePermissionSettings={permActions.togglePermissionSettings}
              push={routeActions.push}
              usersGroup={members}
            />

            {/* customers */}
            <UsersGroup
              groupName="guests"
              togglePermissionSettings={permActions.togglePermissionSettings}
              push={routeActions.push}
              usersGroup={guests}
            />
          </div>
        </section>

        { /* action bar section */ }
        {children &&
          <LeftNav
            disableSwipeToOpen={true}
            docked={true}
            width={350}
            open={true}
            openRight={true}
            overlayStyle={{height: "100%"}}
            style={layoutStyles.actionBar}
          >
            {React.cloneElement(children, {
              handleClose: () => permActions.togglePermissionSettings({},
                "/dashboard/accounts"),
              togglePermission: permActions.togglePermission,
              selectedUser: selectedUser,
              routeActions: routeActions
            })}
          </LeftNav>}
      </div>
    );
  }
}

Management.propTypes = {
  children: PropTypes.node,
  guests: PropTypes.array.isRequired,
  members: PropTypes.array.isRequired,
  permActions: PropTypes.shape({
    togglePermission: PropTypes.func,
    togglePermissionSettings: PropTypes.func
  }).isRequired,
  routeActions: PropTypes.object.isRequired,
  selectedUser: PropTypes.shape({
    emails: PropTypes.array,
    email: PropTypes.string,
    userId: PropTypes.string,
    username: PropTypes.string,
    role: PropTypes.string
  }).isRequired,
  t: PropTypes.func.isRequired
};

export default translate("core")(Management);
