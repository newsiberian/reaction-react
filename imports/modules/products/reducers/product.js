import { combineReducers } from "redux";
import update from "react/lib/update";
import * as types from "../constants";
import topVariantsArray from "./variants";

const idsInitialState = {
  productId: null,
  variantId: null
};

const fieldsInitialState = {
  title: {
    isChanged: false
  }, // changed state
  pageTitle: {
    isChanged: false
  },
  vendor: {
    isChanged: false
  },
  description: {
    isChanged: false
  }
};

const tagsState = {
  tagName: "",
  suggestions: []
};

function ids(state = idsInitialState, action) {
  switch (action.type) {
  case types.SET_PRODUCT_ID:
    return Object.assign({}, state, {
      productId: action.productId
    });
  case types.SET_VARIANT_ID:
  case types.CHANGE_SELECTED_VARIANT_ID:
    return Object.assign({}, state, {
      variantId: action.variantId
    });
  case types.DESTROY_SELECTED_IDS:
    return Object.assign({}, state, {
      productId: null,
      variantId: null
    });
  default:
    return state;
  }
}

// PDP reducer
function fields(state = fieldsInitialState, action) {
  switch (action.type) {
  // case types.SET_PRODUCT_ID:
  //   return Object.assign({}, state, {
  //     productId: action.productId
  //   });
  // case types.SET_VARIANT_ID:
  //   return Object.assign({}, state, {
  //     variantId: action.variantId
  //   });
  case types.UPDATE_PRODUCT_FIELD:
    return Object.assign({}, state, {
      [action.field]: {
        isChanged: true // action.value
      }
    });
  case types.ROLLBACK_FIELD_STATE:
    return Object.assign({}, state, {
      [action.field]: {
        isChanged: false
      }
    });
  default:
    return state;
  }
}

function mediaIdsArray(state = [], action) {
  switch (action.type) {
  case types.SYNC_MEDIA:
    return action.mediaIdsArray;
  case types.MOVE_MEDIA:
    const dragMedia = state[action.dragIndex];
    return update(state, {
      $splice: [
        [action.dragIndex, 1],
        [action.hoverIndex, 0, dragMedia]
      ]
    });
  case types.DESTROY_MEDIA:
    return [];
  default:
    return state;
  }
}

function newTag(state = tagsState, action) {
  switch (action.type) {
  case types.CLEAR_SUGGESTIONS:
    return {
      ...state,
      suggestions: []
    };
  case types.UPDATE_SUGGESTIONS:
    // Ignore suggestions if input value changed
    if (action.tagName !== state.tagName) {
      return {
        state
      };
    }
    return {
      ...state,
      suggestions: action.suggestions
    };
  case types.CLEAR_NEW_TAG_NAME:
    return {
      tagName: "",
      suggestions: []
    };
  case types.CHANGE_NEW_TAG:
    return {
      ...state,
      tagName: action.tagName
    };
  default:
    return state;
  }
}

function tagsIdsArray(state = [], action) {
  switch (action.type) {
  case types.SYNC_TAGS:
    return action.tagsIdsArray;
  case types.MOVE_TAG:
    const dragTag = state[action.dragIndex];
    return update(state, {
      $splice: [
        [action.dragIndex, 1],
        [action.hoverIndex, 0, dragTag]
      ]
    });
  case types.DESTROY_TAGS:
    return [];
  default:
    return state;
  }
}

const addToCartQuantity = (state = 1, action) => {
  switch (action.type) {
  case types.INCREMENT_ADD_TO_CART_QUANTITY:
    return state + 1;
  case types.DECREMENT_ADD_TO_CART_QUANTITY:
    return state - 1;
  case types.CHANGE_ADD_TO_CART_QUANTITY:
    return action.quantity;
  case types.DESTROY_ADD_TO_CART_QUANTITY:
    return 1;
  default:
    return state;
  }
};

export default combineReducers({
  ids,
  fields,
  mediaIdsArray,
  newTag,
  tagsIdsArray,
  topVariantsArray,
  addToCartQuantity
});
