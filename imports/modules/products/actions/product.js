import { ReactionCore } from "meteor/reactioncommerce:core";
import * as types from "../constants";
import { displayAlert } from "../../layout/actions/alert";
import { routeActions } from "react-router-redux";
import i18next from "i18next";

/**
 * setProductId
 * @summary used for the first load setting the current product _id
 *
 * @param productId
 * @return {{type, productId: *}}
 */
export const setProductId = productId => {
  return { type: types.SET_PRODUCT_ID, productId: productId };
};

/**
 * setVariantId
 * @summary used for initial setting variant _id if provided by `path`
 *
 * @param productId
 * @param variantId
 * @return {{type, variantId: *}}
 */
export const setVariantId = (productId, variantId) => {
  if (!variantId) {
    const product = ReactionCore.Collections.Products.findOne({
      _id: productId
    });
    if (product) {
      // set the first variant as the default.
      const variants = ReactionCore.getTopVariants(productId);
      variantId = Array.isArray(variants) && variants.length &&
        variants[0]._id || null;
    }
  }

  return {
    type: types.SET_VARIANT_ID,
    variantId: variantId
  };
};

/**
 * toggleVisibility
 * @summary toggle product visibility
 *
 * @param {Object} product - product doc
 * @param {Boolean} doVisible - new visibility state
 * @return {Function}
 */
export const toggleVisibility = (product, doVisible) => {
  return dispatch => {
    let message;
    if (product.title) {
      message += i18next.t("error.isRequired", { field: i18next.t("productDetailEdit.title") });
    }
    const variants = ReactionCore.getVariants(product._id);
    for (let variant of variants) {
      let index = _.indexOf(variants, variant);
      if (!variant.title) {
        message += `${i18next.t("error.variantFieldIsRequired",
          { field: i18next.t("productVariant.title"), number: index + 1 })} `;
      }
      if (!variant.price) {
        message += `${i18next.t("error.variantFieldIsRequired",
          { field: i18next.t("productVariant.price"), number: index + 1 })} `;
      }
    }
    if (message.length) {
      dispatch(displayAlert({ message: message }));
    } else {
      Meteor.call("products/publishProduct", product._id, (error, result) => {
        if (error) {
          dispatch(displayAlert({ message: error.reason }));
        }
        dispatch({
          type: types.TOGGLE_PRODUCT_VISIBILITY,
          productId: product._id,
          visible: result ? doVisible : !doVisible
        });
      });
    }
  };
};

/**
 * changeProductField
 * @summary this calls on product field change event
 * @param field
 * @param value
 * @return {{type, field: *, value: *}}
 */
export const changeProductField = (field, value) => {
  return { type: types.CHANGE_PRODUCT_FIELD, field: field, value: value };
};

/**
 * updateProductField
 * @summary this calls on product field blur event
 * @param productId
 * @param field
 * @param value
 * @return {Function}
 */
export const updateProductField = (productId, field, value) => {
  return dispatch => {
    Meteor.call("products/updateProductField", productId, field, value,
      (error, result) => {
        debugger;
        if (error) {
          dispatch(displayAlert({ message: error.reason }));
        }
        if (result && field === "title") {
          Meteor.call("products/setHandle", productId, (err, res) => {
            debugger;
            if (err) {
              dispatch(displayAlert({ message: err.reason }));
            }
            if (res) {
              dispatch(routeActions.push(`/shop/${res}`));
              //return FlowRouter.go("product", {
              //  _id: result
              //});
            }
          });
        }
        dispatch({ type: types.UPDATE_PRODUCT_FIELD, field: field, value: value });
      }
    );
  };
};
