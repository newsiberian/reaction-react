import React, { PropTypes } from "react";
import { translate } from "react-i18next/lib";
//import List from "material-ui/lib/lists/list";
//import ListItem from "material-ui/lib/lists/list-item";
import MenuItem from "material-ui/MenuItem";
import FontIcon from "material-ui/FontIcon";
import Divider from "material-ui/Divider";
import ContentAdd from "material-ui/svg-icons/content/add";
import { styles } from "../styles/coreLayout";
import { browserHistory } from "react-router";

// fixme fix this component. It not tracks activeLink and looks ugly
const AdminControlsBar = ({ apps, t }) => (
  <nav style={styles.nav}>
    {apps.map(app => (
      <MenuItem
        key={app.label}
        children={<FontIcon className={app.icon} />}
        onTouchTap={() => browserHistory.push(app.route)}
        style={styles.navButton}
        title={t(app.i18nKeyLabel)}
      />
    ))}
    <Divider />

    {/* `createContent` button */}
    <MenuItem
      children={<ContentAdd />}
      // onTouchTap={() => browserHistory.push(app.route)}
      //containerElement={<Link to={app.route} activeStyle={{backgroundColor: "red"}} onlyActiveOnIndex={true} />}
      style={styles.navButton}
      title={t("app.createContent")}
    />
  </nav>
);


AdminControlsBar.propTypes = {
  apps: PropTypes.arrayOf(PropTypes.object).isRequired,
  t: PropTypes.func
};

export default translate(["core", "reaction-react"])(AdminControlsBar);
