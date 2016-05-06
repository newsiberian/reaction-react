import React, { Component, PropTypes } from "react";
import Toolbar from "material-ui/Toolbar/Toolbar";
import ToolbarGroup from "material-ui/Toolbar/ToolbarGroup";
import ToolbarTitle from "material-ui/Toolbar/ToolbarTitle";
import IconButton from "material-ui/IconButton";
import NavigationClose from "material-ui/svg-icons/navigation/close";

const styles = {
  base: {
    // display: "flex",
    // flexDirection: "column"
  },
  header: {
    paddingLeft: "1rem",
    paddingRight: "1rem"
  },
  toolbar: {
    paddingRight: 4
  },
  title: {
    fontSize: 19,
    maxWidth: 208 // this needed for cases when title is too long
  },
  group: {
    height: "100%"
  },
  closeButton: {
    height: "100%"
  }
};

// type: HOC
export const ActionBarWrapper = (ComposedComponent, options) =>
  class extends Component {
    render() {
      const { layoutSettingsActions, t } = this.props;
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
                onClick={() => layoutSettingsActions.closeSettings()}
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
