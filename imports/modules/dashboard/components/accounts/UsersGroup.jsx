import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import Paper from "material-ui/Paper";
import Avatar from "material-ui/Avatar";
import Table from "material-ui/Table/Table";
import TableHeaderColumn from "material-ui/Table/TableHeaderColumn";
import TableRow from "material-ui/Table/TableRow";
import TableHeader from "material-ui/Table/TableHeader";
import TableRowColumn from "material-ui/Table/TableRowColumn";
import TableBody from "material-ui/Table/TableBody";
import FlatButton from "material-ui/FlatButton";
import { displayName, getGravatar } from "../../../../client/helpers/accounts";

const styles = {
  base: {
    marginTop: "2rem",
    marginBottom: "2rem"
  },
  table: {
    maxHeight: "10rem"
  },
  body: {},
  header: {},
  headerText: {
    // fixme this is dirty hack to make text positioned in the middle vertically
    position: "absolute",
    // top: "36%",
    top: "50%",
    marginTop: "-0.625em"
  },
  headerButton: {
    float: "right"
  }
};

/**
 * @class UsersGroup
 * @classdesc
 */
class UsersGroup extends Component {
  render() {
    const {
      groupName, t, usersGroup, layoutSettingsActions
    } = this.props;
    return (
      <Paper style={styles.base} zDepth={1}>
        <Table
          //height="8rem"
          fixedHeader={true}
          fixedFooter={false}
          selectable={true}
          multiSelectable={false}
          style={styles.table}
          // fixme: currently this send user data over one time (selected/unselected)
          // maybe we don't need table here? We could switch to list in future
          onRowSelection={row => layoutSettingsActions.openSettings({
            name: "AccountsPermissionsContainer",
            payload: { userId: usersGroup[row].userId }
          })}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn
                colSpan="3"
                // tooltip={t(`accounts.${groupName}`)}
                style={styles.header}
              >
                <span style={styles.headerText}>{t(`accounts.${groupName}`)}</span>
                {groupName === "shopMembers" &&
                  <FlatButton
                    label={t("accountsUI.addMember")}
                    onClick={() => layoutSettingsActions.openSettings({
                      name: "AccountsAddMemberContainer",
                      payload: {}
                    })}
                    style={styles.headerButton}
                  />
                }
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn>{t("admin.accounts.avatar")}</TableHeaderColumn>
              <TableHeaderColumn>{t("admin.accounts.name")}</TableHeaderColumn>
              <TableHeaderColumn>{t("admin.accounts.email")}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            deselectOnClickaway={false}
            displayRowCheckbox={false}
            showRowHover={true}
            style={styles.body}
          >
            {usersGroup.map((user, index) => (
              <TableRow key={index}>
                <TableRowColumn>
                  {<Avatar src={getGravatar(user, 40)} />}
                </TableRowColumn>
                <TableRowColumn>{displayName(user)}</TableRowColumn>
                <TableRowColumn>{user.email}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

UsersGroup.propTypes = {
  groupName: PropTypes.string.isRequired,
  layoutSettingsActions: PropTypes.shape({
    openSettings: PropTypes.func
  }),
  t: PropTypes.func.isRequired,
  usersGroup: PropTypes.array
};

export default translate(["core", "reaction-react"])(UsersGroup);
