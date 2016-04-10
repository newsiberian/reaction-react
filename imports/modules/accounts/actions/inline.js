import * as types from "../constants";

export const changeActionType = actionType => {
  return { type: types.CHANGE_ACTION_TYPE, actionType };
};

export const destroyInline = () => ({ type: types.DESTROY_INLINE });
