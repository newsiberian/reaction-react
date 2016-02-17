import * as types from "../constants";

//export function getCartCount() {
//  //let cart;
//  //Tracker.autorun(() => {
//  //  cart = ReactionCore.Collections.Cart.findOne();
//  //});
//  const cart = ReactionCore.Collections.Cart.findOne();
//  // we checking for cart here because sometimes sub could not be ready
//  const count = cart && cart.cartCount() || 0;
//  return { type: types.GET_CARTCOUNT, cartCount: count };
//}

//export function getCartCount() {
//  return (dispatch) => {
//    let cart;
//    Tracker.nonreactive(() => {
//      // we put this inside nonreactive to be sure that it won't be related to
//      // any other computation
//      return Tracker.autorun(() => {
//        cart = ReactionCore.Collections.Cart.findOne();
//      });
//    });
//    //Tracker.autorun(() => {
//    //  cart = ReactionCore.Collections.Cart.findOne();
//    //});
//    //const cart = ReactionCore.Collections.Cart.findOne();
//    // we checking for cart here because sometimes sub could not be ready
//    const count = cart && cart.cartCount() || 0;
//    dispatch({ type: types.GET_CARTCOUNT, cartCount: count });
//  };
//}

/**
 * toggleCart
 * @summary toggle cart visibility
 * @return {{type: *}}
 */
export function toggleCart() {
  return { type: types.TOGGLE_CART };
}
