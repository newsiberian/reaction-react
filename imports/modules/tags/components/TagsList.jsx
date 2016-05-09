import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import { getSubTags } from "../../../client/helpers/tags";
import { List, ListItem, MakeSelectable } from "material-ui/List";

const SelectableList = MakeSelectable(List);

// // HOC
// const wrapState = ComposedComponent => class SelectableList extends Component {
//   handleSelect(index) {
//     // const { shippingActions, shipmentQuotes } = this.props;
//     // shippingActions.setShipmentMethod(index, shipmentQuotes[index].method);
//   }
//
//   render() {
//     const { children, selectedIndex } = this.props;
//     return (
//       <ComposedComponent
//         value={selectedIndex}
//         onChange={(event, index) => this.handleSelect(index)}
//       >
//         {children}
//       </ComposedComponent>
//     );
//   }
// };
//
//
// SelectableList = wrapState(SelectableList);

class TagsList extends Component {
  // handleChange(event, value) {
  //
  // }
  
  render() {
    const { location, push, t, tags, tagsActions } = this.props;
    return (
      <SelectableList
        value={location.pathname}
        onChange={(e, pathname) => push(pathname)}
      >
        {tags.length && tags.map(tag => {
          const subTags = getSubTags(tag);
          switch (Boolean(subTags.length)) {
          case false:
            return (
              <ListItem
                key={tag._id}
                primaryText={tag.name}
                // onTouchTap={tagsActions}
              />
            );
          default:
            return (
              <ListItem
                key={tag._id}
                primaryText={tag.name}
                nestedItems={subTags.map(subTag =>
                  <ListItem
                    key={subTag._id}
                    primaryText={subTag.name}
                    // onTouchTap={tagsActions}
                  />
                )}
              />
            );
          }
        })}
      </SelectableList>
    );
  }
}

TagsList.propTypes = {
  push: PropTypes.func,
  t: PropTypes.func,
  tags: PropTypes.arrayOf(PropTypes.object),
  tagsActions: PropTypes.shape({
    
  }).isRequired
};

export default translate("core")(TagsList);
