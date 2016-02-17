/**
 * @classdesc Tag
 */

import { _i18n } from "meteor/universe:i18n";
import { DragSource, DropTarget } from '/myPackages/react-dnd';

import React, { Component, PropTypes } from "react";
const { findDOMNode } = ReactDOM;

const style = {
  //border: '1px dashed gray',
  //padding: '0.5rem 1rem',
  //marginBottom: '.5rem',
  //backgroundColor: 'white',
  //cursor: 'move'
};

const tagSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    };
  }
};

const tagTarget = {
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
    props.moveTag(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    if (typeof monitor.getItem() === 'object') {
      monitor.getItem().index = hoverIndex;
    }
  }
};


// TODO babel @deco not supported in 1.3
//@DropTarget('tag', tagTarget, connect => ({
//  connectDropTarget: connect.dropTarget()
//}))
//@DragSource('tag', tagSource, (connect, monitor) => ({
//  connectDragSource: connect.dragSource(),
//  connectDragPreview: connect.dragPreview(),
//  isDragging: monitor.isDragging()
//}))
/**
 * @class Tag
 */
export default class Tag extends Component {
  render() {
    const {
      name, isDragging, connectDragSource, connectDragPreview, onTagBlurred,
      connectDropTarget, hashtagMark, onHashtagClick, onTagGroupRemove, tag, onTagChange
    } = this.props;
    const opacity = isDragging ? 0 : 1;

    return(
      <div className="item">
        { connectDragPreview(connectDropTarget(
          <div className="ui right action left icon input" style={{ ...style, opacity }}>
            { connectDragSource(
              <i className="sidebar icon" style={{ cursor: 'move', pointerEvents: 'auto' }}></i>
            ) }
            <input
              type="text"
              placeholder={i18n.__('reaction.core.productDetail.tagsEdit')}
              value={ name }
              onChange={ (event) => onTagChange(event, tag._id) }
              onBlur={ (event) => onTagBlurred(event, tag._id) }
            />
            <div className="ui icon basic button" onClick={ () => onHashtagClick(tag._id) }>
              <i className={ `${ hashtagMark(tag) } icon` }></i>
            </div>
            <div
              className="ui icon basic button"
              style={{ marginLeft: -1 }}
              onClick={ () => onTagGroupRemove(tag._id) }
            >
              <i className="remove icon"></i>
            </div>
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
  tag: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  onHashtagClick: PropTypes.func.isRequired,
  onTagGroupRemove: PropTypes.func.isRequired,
  onTagBlurred: PropTypes.func.isRequired,
  onTagChange: PropTypes.func.isRequired,
  moveTag: PropTypes.func.isRequired,
  hashtagMark: PropTypes.func.isRequired
};
