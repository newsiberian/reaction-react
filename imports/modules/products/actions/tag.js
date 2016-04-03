import * as types from "../constants";
import { displayAlert } from "../../layout/actions/alert";

export const changeTag = (productId, tagName, tagId) => {
  return { type: types.CHANGE_TAG, productId, tagId, tagName };
};

export const changeNewTag = (productId, tagName) => {
  return dispatch => {
    const value = tagName.trim();

    if (value === "") {
      dispatch(clearSuggestions());
    }
    dispatch({ type: types.CHANGE_NEW_TAG, productId, tagName });
  };
};

/**
 * updateTag
 * @summary save changes to Tags collection on input field blur
 * @param {String} productId - product._id
 * @param {String} tagName - event.target.value
 * @param {String} tagId - tag _id
 */
export const updateTag = (productId, tagName, tagId) => {
  return dispatch => {
    const id = typeof tagId === "string" ? tagId : null;
    // `tagName` could be empty
    tagName && Meteor.call("products/updateProductTags", productId, tagName, id, err => {
      if (err) {
        dispatch(displayAlert({ message: err.reason }));
        throw new Meteor.Error("error updating tag", err);
      }
      dispatch({ type: types.UPDATE_TAG, productId, tagId, tagName });
    });
  };
};

export const removeTag = (productId, tagId) => {
  return dispatch => {
    Meteor.call("products/removeProductTag", productId, tagId, err => {
      if (err) {
        dispatch(displayAlert({ message: err.reason }));
        throw new Meteor.Error("error tag removing", err);
      }
      dispatch({ type: types.REMOVE_TAG, productId, tagId });
    });
  };
};

export const syncTags = tagsIdsArray => {
  return { type: types.SYNC_TAGS, tagsIdsArray };
};

export const moveTag = (dragIndex, hoverIndex) => {
  return { type: types.MOVE_TAG, dragIndex: dragIndex, hoverIndex: hoverIndex };
};

export const dropTag = (productId, tagsIdsArray) => {
  return dispatch => {
    Meteor.call("products/updateProductField", productId, "hashtags", tagsIdsArray, err => {
      if (err) {
        dispatch(displayAlert({ message: err.reason }));
        throw new Meteor.Error("error tag removing", err);
      }
      dispatch({ type: types.DROP_TAG, productId });
    });
  };
};

export const destroyTags = () => ({ type: types.DESTROY_TAGS });

export const clearNewTagName = () => {
  return { type: types.CLEAR_NEW_TAG_NAME };
};

const loadSuggestionsBegin = () => {
  return { type: types.LOAD_SUGGESTIONS_BEGIN };
};

const clearSuggestions = () => {
  return { type: types.CLEAR_SUGGESTIONS };
};

export const updateSuggestions = tagName => {
  return dispatch => {
    dispatch(loadSuggestionsBegin());
    const slug = getSlug(tagName);
    const suggestions = ReactionCore.Collections.Tags.find({
      slug: new RegExp("^" + slug, "i")
    }).map(tag => tag.name);
    dispatch({ type: types.UPDATE_SUGGESTIONS, suggestions, tagName });
  };
};
