import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";

class TagsEditable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {  t, tags, tagsActions } = this.props;
    return (
      <div></div>
    );
  }
}

TagsEditable.propTypes = {
  t: PropTypes.func,
  tags: PropTypes.arrayOf(PropTypes.object),
  tagsActions: PropTypes.shape({

  }).isRequired
};

export default translate("core")(TagsEditable);
