import * as types from "../constants";
import { displayAlert } from "../../layout/actions/alert";
import { reset } from "redux-form"; // reset action creator exported by redux-form

export const updateMetafield = (product, index, values) => {
  return dispatch => {
    const productId = product._id;
    const meta = index !== "new" ? product.metafields[index] : null;

    Meteor.call("products/updateMetaFields", productId, values, meta, err => {
      if (err) {
        dispatch(displayAlert({ message: err.reason }));
      }
      dispatch({ type: types.UPDATE_METAFIELD, productId, index, values });
      // reset form for new metafields form
      index === "new" && dispatch(reset("productMetafieldForm"));
    });
  };
};

export const removeMetafields = (productId, metafield) => {
  return dispatch => {
    Meteor.call("products/removeMetaFields", productId, metafield, err => {
      if (err) {
        dispatch(displayAlert({ message: err.reason }));
      }
      dispatch({ type: types.REMOVE_METAFIELDS, productId, metafield });
    });
  };
};
