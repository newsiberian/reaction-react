import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import Paper from "material-ui/lib/paper";
import Avatar from "material-ui/lib/avatar";
import Table from "material-ui/lib/table/table";
import TableHeaderColumn from "material-ui/lib/table/table-header-column";
import TableRow from "material-ui/lib/table/table-row";
import TableHeader from "material-ui/lib/table/table-header";
import TableRowColumn from "material-ui/lib/table/table-row-column";
import TableBody from "material-ui/lib/table/table-body";
import FlatButton from "material-ui/lib/flat-button";
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
              <TableHeaderColumn>Avatar</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>
                {t("accountsUI.email")}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            deselectOnClickaway={false}
            displayRowCheckbox={false}
            showRowHover={true}
            style={styles.body}
          >
            {usersGroup.map((user, index) => (
              <TableRow
                key={index}
              >
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

export default translate("core")(UsersGroup);
