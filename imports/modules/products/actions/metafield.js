import * as types from "../constants";
import { displayAlert } from "../../layout/actions/alert";

export const changeMetafield = (index, field, value) => {
  return { type: types.CHANGE_METAFIELD, field, value };
};

export const updateMetafield = (productId, field, value) => {
  return dispatch => {

  };
};

export const removeMetafields = () => {
  return dispatch => {

  };
};
