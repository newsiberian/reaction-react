import * as types from "../constants";
import { combineReducers } from "redux";

const filter = (state = "new", action) => {
  switch (action.type) {
  case types.CHANGE_ORDER_FILTER:
    return action.filter;
  default:
    return state;
  }
};

const trackingEdit = (state = { visible: false }, action) => {
  switch (action.type) {
  case types.CHANGE_TRACKING_EDIT_VISIBILITY:
    return Object.assign({}, state, {
      visible: action.visible
    });
  default:
    return state;
  }
};

export default function note(state = { _id: null, isChanged: false }, action) {
  switch (action.type) {
  case types.UPDATE_ORDER_NOTE:
    return Object.assign({}, state, {
      _id: action.noteId,
      isChanged: true
    });
  case types.ROLLBACK_ORDER_NOTE_STATE:
    return Object.assign({}, state, {
      isChanged: false
    });
  default:
    return state;
  }
}

export default combineReducers({
  filter,
  note,
  trackingEdit
});
