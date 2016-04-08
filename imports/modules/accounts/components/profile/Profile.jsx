import React, {Component, PropTypes} from "react";
import {translate} from "react-i18next/lib";

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { t } = this.props;
    return (
      <div></div>
    );
  }
}

Profile.propTypes = {
  t: PropTypes.func
};

export default translate("core")(Profile);
