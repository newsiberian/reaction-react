import React, { PropTypes } from "react";
import { translate } from "react-i18next/lib";
//import List from "material-ui/lib/lists/list";
//import ListItem from "material-ui/lib/lists/list-item";
import MenuItem from "material-ui/lib/menus/menu-item";
import FontIcon from "material-ui/lib/font-icon";
//import FlatButton from "material-ui/lib/flat-button";
import { styles } from "../styles/coreLayout";
import {/* Link,*/ browserHistory } from "react-router";
// import SettingsHeader from "/modules/dashboard/components/settings/SettingsHeader";

// fixme fix this component. It not tracks activeLink and looks ugly
const AdminControlsBar = ({ apps, t }) => (
  <nav style={styles.nav}>
    {apps.map(app => (
      <MenuItem
        key={app.label}
        //primaryText={app.label}
        children={<FontIcon className={app.icon} />}
        onTouchTap={() => browserHistory.push(app.route)}
        //containerElement={<Link to={app.route} activeStyle={{backgroundColor: "red"}} onlyActiveOnIndex={true} />}
        //children={<Link to={app.route} activeStyle={{color: "red"}}><FontIcon className={app.icon} /></Link>}
        style={styles.navButton}
        title={t(app.i18nKeyTooltip)}
      />
    ))}
  </nav>
);


AdminControlsBar.propTypes = {
  apps: PropTypes.arrayOf(PropTypes.object).isRequired,
  t: PropTypes.func
};

export default translate(["core", "reaction-react"])(AdminControlsBar);
