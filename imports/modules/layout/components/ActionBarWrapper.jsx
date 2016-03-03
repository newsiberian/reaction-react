import React, { Component, PropTypes } from "react";
import Toolbar from "material-ui/lib/toolbar/toolbar";
import ToolbarGroup from "material-ui/lib/toolbar/toolbar-group";
import ToolbarTitle from "material-ui/lib/toolbar/toolbar-title";
import IconButton from "material-ui/lib/icon-button";
import NavigationClose from "material-ui/lib/svg-icons/navigation/close";

const styles = {
  base: {
    //display: "flex",
    //flexDirection: "column"
  },
  header: {
    paddingLeft: "1rem",
    paddingRight: "1rem"
  },
  toolbar: {
    paddingRight: 4
  },
  title: {
    maxWidth: 208 // this needed for cases when title is too long
  },
  group: {
    height: "100%"
  },
  closeButton: {
    height: "100%"
  }
};

export const ActionBarWrapper = (ComposedComponent, options) =>
  class extends Component {
  render() {
    const { handleSettingsClose, t } = this.props;
    return (
      <div style={styles.base}>
        <Toolbar style={styles.toolbar}>
          <ToolbarTitle
            text={t(options.title)}
            title={t(options.title)}
            style={styles.title}
          />
          <ToolbarGroup float="right" style={styles.group}>
            <IconButton
              onClick={() => handleSettingsClose()}
              style={styles.closeButton}
            >
              <NavigationClose />
            </IconButton>
          </ToolbarGroup>
        </Toolbar>
        <ComposedComponent {...this.props} />
      </div>
    );
  }
};