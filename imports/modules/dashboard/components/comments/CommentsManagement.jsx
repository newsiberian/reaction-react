import React, {Component, PropTypes} from "react";
import {translate} from "react-i18next/lib";

/**
 * @class CommentsManagement
 * @classdesc
 */
class CommentsManagement extends Component {
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

CommentsManagement.propTypes = {
  t: PropTypes.func
};

export default translate("core")(CommentsManagement);
