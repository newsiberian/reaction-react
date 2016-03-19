import React, { Component, PropTypes } from "react";
import { findDOMNode } from "react-dom";
import { translate } from "react-i18next/lib";
import { StyleSheet } from "react-look";
import { DragSource, DropTarget } from "react-dnd";

// fixme: this styling are temporaty till `material chips` out
const styles = StyleSheet.create({
  suiContainer: {
    position: "relative",
    display: "inline-flex",
    fontWeight: 400,
    fontStyle: "normal",
    fontSize: "1em",
    margin: 4
  },
  input: {
    borderRightColor: "transparent",
    paddingTop: "0.678614em",
    paddingBottom: "0.678614em",
    paddingLeft: "2.67142857em",
    paddingRight: "2.67142857em",
    margin: 0,
    maxWidth: "100%",
    flex: "1 0 auto",
    outline: 0,
    textAlign: "left",
    lineHeight: "1.2142em",
    background: "#fff",
    border: "1px solid rgba(34,36,38,.15)",
    color: "rgba(0,0,0,.87)",
    borderRadius: ".28571429rem",
    transform: "box-shadow .1s ease,border-color .1s ease",
    boxShadow: "none"
  },
  leftIcon: {
    position: "absolute",
    lineHeight: 1,
    textAlign: "center",
    top: ".6em",
    left: "1px",
    right: "auto",
    margin: 0,
    height: "100%",
    width: "2.67142857em",
    opacity: ".5",
    borderRadius: ".28571429rem 0 0 .28571429rem",
    transform: "opacity .3s ease",
    display: "inline-block",
    backfaceVisibility: "hidden",
    cursor: "move",
    pointerEvents: "auto"
  },
  rightIconWrapper: {

  },
  rightIcon: {
    position: "absolute",
    top: ".6em",
    right: ".8em",
    lineHeight: 1,
    textAlign: "center",
    margin: 0,
    height: "100%",
    opacity: ".5",
    fontSize: "1em",
    transform: "opacity .3s ease",
    borderRadius: "0 .28571429rem .28571429rem 0",
    cursor: "pointer"
  }
});

const stylesInternal = {
  leftIcon: {}
};

const tagSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    };
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      // You can check whether the drop was successful
      // or if the drag ended but nobody handled the drop
      return;
    }

    // When dropped on a compatible target, do something.
    // Read the original dragged item from getItem():
    const item = monitor.getItem();

    // You may also read the drop result from the drop target
    // that handled the drop, if it returned an object from
    // its drop() method.
    const dropResult = monitor.getDropResult();

    // This is a good place to call some Flux action
    props.tagActions.dropTag(props.productId, props.tagsIdsArray);
  }
};

const tagTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don"t replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.tagActions.moveTag(dragIndex, hoverIndex);

    // Note: we"re mutating the monitor item here!
    // Generally it"s better to avoid mutations,
    // but it"s good here for the sake of performance
    // to avoid expensive index searches.
    if (typeof monitor.getItem() === "object") {
      monitor.getItem().index = hoverIndex;
    }
  }
};


// TODO babel @deco not supported in 1.3
//@DropTarget("tag", tagTarget, connect => ({
//  connectDropTarget: connect.dropTarget()
//}))
//@DragSource("tag", tagSource, (connect, monitor) => ({
//  connectDragSource: connect.dragSource(),
//  connectDragPreview: connect.dragPreview(),
//  isDragging: monitor.isDragging()
//}))
class Tag extends Component {
  handleUpdate(productId, tagName, tagId) {
    // do not update if nothing change
    if (this.props.tag.name !== tagName) {
      this.props.tagActions.updateTag(productId, tagName, tagId);
    }
  }

  render() {
    const {
      name, isDragging, connectDragSource, connectDragPreview, productId, t,
      connectDropTarget, tag, tagActions
    } = this.props;
    const opacity = isDragging ? 0 : 1;

    return(
      <div>
        {connectDragPreview(connectDropTarget(
          <div className={styles.suiContainer} style={{ opacity }}>
            {connectDragSource(
              <i className={`${styles.leftIcon} fa fa-bars`} />
            )}
            <input
              className={styles.input}
              type="text"
              placeholder={t("productDetail.tagsEdit")}
              defaultValue={name}
              onChange={event =>
               tagActions.changeTag(productId, event.target.value, tag._id)}
              onBlur={event =>
               this.handleUpdate(productId, event.target.value, tag._id)}
            />
            <i
              className={`${styles.rightIcon} fa fa-times`}
              onClick={() => tagActions.removeTag(productId, tag._id)}
            />
          </div>
        ))}
      </div>
    );
  }
}

Tag.propTypes = {
  connectDragSource: PropTypes.func,
  connectDropTarget: PropTypes.func,
  connectDragPreview: PropTypes.func,
  isDragging: PropTypes.bool,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  productId: PropTypes.string.isRequired,
  tag: PropTypes.object.isRequired,
  tagActions: PropTypes.shape({
    changeTag: PropTypes.func,
    changeNewTag: PropTypes.func,
    removeTag: PropTypes.func,
    updateTag: PropTypes.func,
    syncTags: PropTypes.func,
    moveTag: PropTypes.func,
    dropTag: PropTypes.func
  }),
  tagsIdsArray: PropTypes.arrayOf(PropTypes.string),
  t: PropTypes.func.isRequired
};

export default DragSource("tag", tagSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
}))(DropTarget("tag", tagTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(translate("core")(Tag)));
