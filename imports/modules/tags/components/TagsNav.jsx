import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import { ReactionCore } from "meteor/reactioncommerce:core";
import Divider from "material-ui/Divider";
import Drawer from "material-ui/Drawer";
import { ListItem } from "material-ui/List";
import ImageEdit from "material-ui/svg-icons/image/edit";
import TagsEditable from "./TagsEditable.jsx";
import TagsList from "./TagsList.jsx";

class TagsNav extends Component {
  render() {
    const { nav, push, t, tags, tagsActions } = this.props;
    return (
      <Drawer
        docked={false}
        open={nav.opened}
        onRequestChange={tagsActions.toggleTagsNav}
      >
        {/* display `toggle edit mode` button for admin */}
        {ReactionCore.hasPermission("core") &&
        <div>
          <ListItem
            primaryText={t("app.editMode")}
            leftIcon={<ImageEdit />}
            onTouchTap={tagsActions.toggleEditMode}
          />
          <Divider />
        </div>
        }

        {nav.editable ?
          <TagsEditable push={push} tags={tags} tagsActions={tagsActions} /> :
          <TagsList push={push} tags={tags} tagsActions={tagsActions} />
        }
      </Drawer>
    );
  }
}

TagsNav.propTypes = {
  nav: PropTypes.shape({
    editable: PropTypes.bool,
    opened: PropTypes.bool
  }).isRequired,
  push: PropTypes.func,
  t: PropTypes.func,
  tags: PropTypes.arrayOf(PropTypes.object),
  tagsActions: PropTypes.shape({
    toggleTagsNav: PropTypes.func,
    toggleEditMode: PropTypes.func
  }).isRequired
};

export default translate("core")(TagsNav);
