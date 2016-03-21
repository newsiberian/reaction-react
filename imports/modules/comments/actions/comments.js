import * as types from "../constants";

export const addComment = () => {
  return { type: types.ADD_COMMENT };
};

export const updateComment = () => {
  return { type: types.UPDATE_COMMENT };
};

export const removeComment = () => {
  return { type: types.REMOVE_COMMENT };
};

export const approveComment = () => {
  return { type: types.APPROVE_COMMENT };
};
