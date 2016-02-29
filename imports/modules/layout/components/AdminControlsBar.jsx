import React, { Component, PropTypes } from "react";
import List from "material-ui/lib/lists/list";
import ListItem from "material-ui/lib/lists/list-item";
import MenuItem from 'material-ui/lib/menus/menu-item';
import FontIcon from "material-ui/lib/font-icon";
import FlatButton from 'material-ui/lib/flat-button';
import { styles } from "../styles/coreLayout";
import { Link } from "react-router";
// import SettingsHeader from "/modules/dashboard/components/settings/SettingsHeader";
// fixme fix this component. It not tracks activeLink and looks ugly
const AdminControlsBar = props => {
  const { apps, routeActions } = props;
  //return (
  //  <nav style={styles.nav}>
  //    <List>
  //      {apps.map(app => (
  //        <ListItem
  //          key={app.label}
  //          children={<FontIcon className={app.icon} />}
  //        />
  //      ))}
  //    </List>
  //  </nav>
  //);
  return (
    <nav style={styles.nav}>
      {apps.map(app => (
        <MenuItem
          key={app.label}
          //primaryText={app.label}
          children={<FontIcon className={app.icon} />}
          onTouchTap={() => routeActions.push(app.route)}
          //containerElement={<Link to={app.route} activeStyle={{backgroundColor: "red"}} onlyActiveOnIndex={true} />}
          //children={<Link to={app.route} activeStyle={{color: "red"}}><FontIcon className={app.icon} /></Link>}
        />
      ))}
    </nav>
  );
};

AdminControlsBar.propTypes = {
  apps: PropTypes.array.isRequired,
  routeActions: PropTypes.object.isRequired
};

export default AdminControlsBar;
