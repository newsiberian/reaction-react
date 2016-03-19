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
  //return { type: types.CHANGE_NEW_TAG, productId, tagName };
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
    //const clear = this.clearField;
    // `tagName` could be empty
    tagName && Meteor.call("products/updateProductTags", productId, tagName, id, err => {
      // todo надо очищать input value после удачного или неудачного ответа
      //if (event.target.id === "tags-submit-new") {
      //  clear({ newTagValue: "" });
      //}

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

export const moveTag = (productId, dragTag, dragIndex, hoverIndex) => {
  return dispatch => {
    // FIXME
    let tags = this.state.selectedProduct.hashtags;
    const dragTags = tags[dragIndex];

    tags.splice(dragIndex, 1);
    tags.splice(hoverIndex, 0, dragTags);

    Meteor.call("products/updateProductField",
      this.state.selectedProduct._id, "hashtags", _.uniq(tags));
  };
};

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


