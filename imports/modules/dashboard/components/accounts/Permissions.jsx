import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { Roles } from "meteor/alanning:roles";
import { ReactionCore } from "meteor/reactioncommerce:core";
import Avatar from "material-ui/lib/avatar";
import FontIcon from "material-ui/lib/font-icon";
import List from "material-ui/lib/lists/list";
import ListItem from "material-ui/lib/lists/list-item";
import Divider from "material-ui/lib/divider";
import Subheader from "material-ui/lib/Subheader";
import Toggle from "material-ui/lib/toggle";
import { ActionBarWrapper } from
  "../../../layout/components/ActionBarWrapper.jsx";
import { displayName, getGravatar } from "../../../../client/helpers/accounts";
import { siteName } from "../../../../client/helpers/utilities";

const localStyles = {
  header: {
    textAlign: "center"
  },
  name: {
    marginTop: "1rem"
  },
  inner: {
    marginLeft: 50,
    fontSize: 15
  },
  icon: {
    fontSize: 18
  },
  innerIcon: {
    fontSize: 15
  }
};

const getPermissionMap = permissions => {
  const permissionMap = {};
  permissions.forEach(existing => {
    permissionMap[existing.permission] = existing.label;
  });
  return permissionMap;
};

const permissionGroups = () => {
  const groups = [];
  const shopId = ReactionCore.getShopId();
  const packages = ReactionCore.Collections.Packages.find({
    shopId: shopId
  });

  packages.forEach(pkg => {
    const permissions = [];
    if (pkg.registry && pkg.enabled) {
      for (let registryItem of pkg.registry) {
        // Skip entries with missing routes
        if (!registryItem.route) {
          continue;
        }

        // Get all permissions, add them to an array
        if (registryItem.permissions) {
          for (let permission of registryItem.permissions) {
            permission.shopId = shopId;
            permissions.push(permission);
          }
        }

        // Also create an object map of those same permissions as above
        let permissionMap = getPermissionMap(permissions);
        if (!permissionMap[registryItem.route]) {
          permissions.push({
            shopId: pkg.shopId,
            permission: registryItem.name ||
              pkg.name + "/" + registryItem.template, // launchdock-connect/connectDashboard
            icon: registryItem.icon,
            label: registryItem.label || registryItem.provides ||
              registryItem.route
          });
        }
      }
      // todo review this, hardcoded WIP
      const label = pkg.name.replace("reaction", "").replace(/(-.)/g,
        function (x) {
          return " " + x[1].toUpperCase();
        }
      );

      return groups.push({
        shopId: pkg.shopId,
        icon: pkg.icon,
        name: pkg.name,
        label: label,
        permissions: _.uniq(permissions)
      });
    }
  });

  return groups;
};

const hasPermissionChecked = (permission, userId) => {
  const shopId = ReactionCore.getShopId();
  return (userId && Roles.userIsInRole(userId, permission, shopId ||
      Roles.userIsInRole(userId, permission, Roles.GLOBAL_GROUP)));
};

/**
 * @class Manage
 * @classdesc
 */
class Permissions extends Component {
  renderName(user) {
    return (
      <div>
        <div>
          {<Avatar src={getGravatar(user, 40)} />}
        </div>
        <div style={localStyles.name}>
          {displayName(user)}
        </div>
      </div>
    );
  }

  render() {
    const { selectedUser, permActions } = this.props;
    const user = selectedUser;
    const groupsForUser = Roles.getGroupsForUser(user.userId);
    const permGroups = permissionGroups();
    return (
      <div>
        <List>
          <ListItem
            disabled={true}
            primaryText={this.renderName(user)}
            secondaryText={user.email}
            style={localStyles.header}
          />
        </List>
        <Divider />
        {groupsForUser.map(group => (
          <List key={group}>
            <Subheader>{siteName()}</Subheader>
            {permGroups.map((perm, index) => {
              return (
                <div key={index}>
                  <ListItem
                    primaryText={
                      <div>
                        <FontIcon
                          className={perm.icon}
                          style={localStyles.icon}
                        />
                        {" "}
                        {perm.label}
                      </div>
                    }
                    rightToggle={
                      <Toggle
                        onToggle={(e, toggled) =>
                         permActions.togglePermission(toggled, perm, user)}
                        toggled={hasPermissionChecked(perm.name, user.userId)}
                      />
                    }
                  />
                  {Boolean(perm.permissions.length) && perm.permissions.map(
                    (innerPerm, innerIndex) => (
                      <ListItem
                        key={innerIndex}
                        primaryText={
                          <div style={localStyles.inner}>
                            <FontIcon
                              className={innerPerm.icon || "fa fa-gear"}
                              style={localStyles.innerIcon}
                            />
                            {" "}
                            {innerPerm.label}
                          </div>
                        }
                        rightToggle={
                          <Toggle
                            onToggle={(e, toggled) =>
                              permActions.togglePermission(toggled, innerPerm, user)}
                            toggled={hasPermissionChecked(
                              innerPerm.permission, user.userId
                            )}
                          />
                        }
                      />
                    )
                  )}
                  {/* no need to draw last divider */}
                  {permGroups.length !== (index + 1) && <Divider />}
                </div>
              );
            })}
          </List>
        ))}
      </div>
    );
  }
}

Permissions.propTypes = {
  selectedUser: PropTypes.shape({
    emails: PropTypes.array,
    email: PropTypes.string,
    userId: PropTypes.string,
    username: PropTypes.string,
    role: PropTypes.string
  }).isRequired,
  permActions: PropTypes.shape({
    togglePermission: PropTypes.func,
    togglePermissionSettings: PropTypes.func
  }).isRequired
};

const options = { title: "admin.settings.permissionsSettingsLabel" };

export default translate("core")(ActionBarWrapper(Permissions, options));
