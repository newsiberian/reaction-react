import { DragSource, DropTarget } from '/myPackages/react-dnd';
import { removeButtonStyle } from '../../../styles/imageDetail';

import React, { Component, PropTypes } from "react";
const { findDOMNode } = ReactDOM;
const Types = {
  MEDIA: 'media'
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

    // Don't replace items with themselves
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

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    // if (typeof monitor.getItem() === 'object') {
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
export default class ImageDetail extends Component {
  componentDidMount() {
    const { media } = this.props;
    const img = new Image();
    img.onload = () => this.props.connectDragPreview(img);
    img.src = media.thumb;
  }

  render() {
    const { isDragging, connectDragSource, connectDropTarget,
      index, media, permissions, onRemoveClick
    } = this.props;
    const className = index === 0 ? 'ui fluid image' : 'ui tiny image';
    const opacity = isDragging ? 0.4 : 1;
    console.log(`ImageGallery ${index}: rendering...`);
    return connectDragSource(connectDropTarget(
      <div className={ className } style={{ opacity }} data-id={ media._id }>
        <img
          src={ media.url }
          alt={ media.name }
        />
        { permissions.createProduct &&
          <button
            className="ui circular icon basic button"
            style={ removeButtonStyle }
            data-id={ media._id }
            onClick={ onRemoveClick }
          >
            <i className="remove icon"></i>
          </button>
        }
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
  moveMedia: PropTypes.func,
  permissions: PropTypes.object.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  onDropMedia: PropTypes.func.isRequired
};
