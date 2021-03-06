import React, { Component, PropTypes } from "react";
import { findDOMNode } from "react-dom";
import { DragSource, DropTarget } from "react-dnd";
import Paper from "material-ui/Paper";
import IconButton from "material-ui/IconButton";
import FontIcon from "material-ui/FontIcon";

const styles = {
  fluidImageContainer: {
    position: "relative",
    textAlign: "center",
    backgroundColor: "transparent",
    height: "auto",
    flex: "1 0 100%",
    display: "flex",
    justifyContent: "center"
  },
  fluidImage: { maxHeight: "70vh", maxWidth: "100%" },
  tinyImageContainer: {
    display: "inline-block",
    position: "relative",
    verticalAlign: "middle",
    maxWidth: "100%",
    backgroundColor: "transparent",
    height: "auto",
    flex: "0 0 auto"
  },
  tinyImage: { width: "80px" },
  paper: {
    padding: "4px 4px 0 4px",
    margin: "3px 3px 0 0",
    cursor: "pointer"
  },
  removeButton: {
    position: "absolute",
    right: 0,
    bottom: 0
  }
};

const Types = {
  MEDIA: "media"
};

const imageSource = {
  beginDrag(props) {
    return {
      id: props.media._id,
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
    props.onDropMedia();
  }
};
const imageTarget = {
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
    props.moveMedia(dragIndex, hoverIndex);

    // Note: we"re mutating the monitor item here!
    // Generally it"s better to avoid mutations,
    // but it"s good here for the sake of performance
    // to avoid expensive index searches.
    // if (typeof monitor.getItem() === "object") {
    monitor.getItem().index = hoverIndex;
    // }
  }
};

// TODO babel @deco not supported in 1.3
//@DropTarget(Types.MEDIA, imageTarget, connect => ({
//  connectDropTarget: connect.dropTarget()
//}))
//@DragSource(Types.MEDIA, imageSource, (connect, monitor) => ({
//  connectDragSource: connect.dragSource(),
//  connectDragPreview: connect.dragPreview(),
//  isDragging: monitor.isDragging()
//}))
class ImageDetail extends Component {
  componentDidMount() {
    const { media } = this.props;
    const img = new Image();
    img.onload = () => this.props.connectDragPreview(img);
    img.src = media.url({ store: "thumbnail" });
  }

  /**
   * handleRemoveClick
   * @summary onClick handler for remove Image Button
   * @param {String} id - media _id
   * @fires `removeMedia` actionCreator
   */
  handleRemoveClick(id) {
    this.props.mediaActions.removeMedia(id);
  }

  render() {
    const {
      isDragging, connectDragSource, connectDropTarget, index, media,
      productTitle, mediaActions
    } = this.props;
    //const className = index === 0 ? "ui fluid image" : "ui tiny image";
    const opacity = isDragging ? 0.4 : 1;
    const style = index === 0 ? Object.assign(styles.fluidImageContainer, opacity) :
      Object.assign(styles.tinyImageContainer, opacity);
    console.log(`ImageGallery ${index}: rendering...`);
    return connectDragSource(connectDropTarget(
      <div style={style}>
        <Paper
          zDepth={1}
          rounded={false}
          style={styles.paper}
        >
          <img
            src={media.url({
              uploading: "/resources/placeholder.gif",
              storing: "/resources/placeholder.gif",
              store: "large"
            })}
            alt={productTitle}
            onTouchTap={() => mediaActions.toggleLightbox(index)}
            style={index === 0 ? styles.fluidImage : styles.tinyImage}
          />
          {ReactionCore.hasPermission("createProduct") &&
            <IconButton
              style={styles.removeButton}
              onClick={() => this.handleRemoveClick(media._id)}
            >
              <FontIcon className="fa fa-close" />
            </IconButton>
          }
        </Paper>
      </div>
    ));
  }
}

ImageDetail.propTypes = {
  connectDragSource: PropTypes.func,
  connectDragPreview: PropTypes.func,
  isDragging: PropTypes.bool,
  index: PropTypes.number.isRequired,
  media: PropTypes.object,
  mediaActions: PropTypes.shape({
    removeMedia: PropTypes.func,
    toggleLightbox: PropTypes.func
  }),
  moveMedia: PropTypes.func,
  onDropMedia: PropTypes.func,
  productTitle: PropTypes.string.isRequired
};

export default DragSource(Types.MEDIA, imageSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
}))(DropTarget(Types.MEDIA, imageTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(ImageDetail));
