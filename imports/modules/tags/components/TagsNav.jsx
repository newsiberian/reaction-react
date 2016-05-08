import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import Drawer from "material-ui/Drawer";

class TagsNav extends Component {
  render() {
    const { t } = this.props;
    return (
      <Drawer open={this.state.open}>
        
      </Drawer>
    );
  }
}

TagsNav.propTypes = {
  t: PropTypes.func
};

export default translate("core")(TagsNav);
