import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import Paper from "material-ui/lib/paper";
//import Card from "material-ui/lib/card/card";
//import CardTitle from "material-ui/lib/card/card-title";
//import CardText from "material-ui/lib/card/card-text";
import Avatar from "material-ui/lib/avatar";
import Table from "material-ui/lib/table/table";
import TableHeaderColumn from "material-ui/lib/table/table-header-column";
import TableRow from "material-ui/lib/table/table-row";
import TableHeader from "material-ui/lib/table/table-header";
import TableRowColumn from "material-ui/lib/table/table-row-column";
import TableBody from "material-ui/lib/table/table-body";
import TableFooter from "material-ui/lib/table/table-footer";
import TextField from "material-ui/lib/text-field";
import { displayName, getGravatar } from "../../../../client/helpers/accounts";

const styles = {
  base: {
    marginTop: "2rem",
    marginBottom: "2rem"

  },
  table: {
    maxHeight: "10rem"
  },
  body: {
    //textAlign: "center"
  },
  header: {
    //textAlign: "center"
  }
};

/**
 * @class UsersGroup
 * @classdesc
 */
class UsersGroup extends Component {
  render() {
    const { groupName, t, usersGroup } = this.props;
    return (
      <Paper style={styles.base} zDepth={1}>
        <Table
          //height="8rem"
          fixedHeader={true}
          fixedFooter={false}
          selectable={true}
          multiSelectable={false}
          onRowSelection={this._onRowSelection}
          style={styles.table}
        >
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn
                colSpan="3"
                tooltip={t(`accounts.${groupName}`)}
                style={styles.header}
              >
                {t(`accounts.${groupName}`)}
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip="The Avatar">Avatar</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Name">Name</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Email">
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
  //render() {
  //  const { groupName, t } = this.props;
  //  return (
  //    <Card style={styles.base}>
  //      <CardTitle
  //        title={t(`accounts.${groupName}`)}
  //      />
  //      <CardText>
  //
  //      </CardText>
  //    </Card>
  //  );
  //}
}

UsersGroup.propTypes = {
  groupName: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  usersGroup: PropTypes.array
};

export default translate("core")(UsersGroup);
