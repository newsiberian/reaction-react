import * as types from "../constants";
import { displayAlert } from "../../layout/actions/alert";

export const changeMetafield = (index, field, value) => {
  return { type: types.CHANGE_METAFIELD, field, value };
};

export const updateMetafield = (productId, index, values) => {
  return dispatch => {
    debugger;
    dispatch({ type: types.UPDATE_METAFIELD, productId, index, values });
  };
};

export const removeMetafields = () => {
  return dispatch => {

  };
};
