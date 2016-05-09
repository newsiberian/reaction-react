import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import FlatButton from "material-ui/FlatButton";
import NavigationMenu from "material-ui/svg-icons/navigation/menu";
import { grey400 } from "material-ui/styles/colors";

const styles = {
  button: {
    position: "fixed",
    left: 0,
    top: "6rem",
    // overflow: "hidden",
    minWidth: 44,
    zIndex: 1100
  }
};

class SidebarButton extends Component {
  render() {
    const { handleClick, t } = this.props;
    return (
      <FlatButton
        icon={<NavigationMenu color={grey400} />}
        onTouchTap={handleClick}
        style={styles.button}
      />
    );
  }
}

SidebarButton.propTypes = {
  handleClick: PropTypes.func,
  t: PropTypes.func
};

export default translate("core")(SidebarButton);
