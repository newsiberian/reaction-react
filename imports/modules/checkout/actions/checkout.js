import * as types from "../constants";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { Meteor } from "meteor/meteor";

export const changeCartWorkflow = (status, cartId) => {
  return dispatch => {
    Meteor.call("workflow/pushCartWorkflow", "coreCartWorkflow", status, cartId);
    // we don't put dispatch within Method, because it is not clear, what to
    // expect on return. Method too complicated.
    dispatch({ type: types.CHANGE_CART_WORKFLOW, status });
  };
};
