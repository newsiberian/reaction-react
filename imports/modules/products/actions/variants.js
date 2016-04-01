import * as types from "../constants";
import { displayAlert } from "../../layout/actions/alert";
import { Meteor } from "meteor/meteor";
import { setVariantId, updateProductField } from "./product";
import { getSlug } from "../../../client/helpers/products";
import i18next from "i18next";

/**
 * getTopVariants
 * @summary we need to have a state of variantForms opened/closed state.
 * @param {Array} variantsArray
 * @return {{type, variants: Array}}
 */
// export const getTopVariants = variantsArray => {
//   return dispatch => {
//     let variants = {};
//     variantsArray.forEach(variant => {
//       variants[variant._id] = {
//         visible: false
//       };
//     });
//     dispatch({ type: types.GET_TOP_VARIANTS, variants });
//   };
// };
export const getTopVariants = variantsArray => {
  return dispatch => {
    const variants = variantsArray.map(variant => ({
      _id: variant._id,
      visible: false
    }));
    dispatch({ type: types.GET_TOP_VARIANTS, variants });
  };
};

export const addTopVariant = variantId => {
  return { type: types.ADD_TOP_VARIANT, variantId };
};

export const removeTopVariant = variantId => {
  return { type: types.REMOVE_TOP_VARIANT, variantId };
};

export const changeVariantFormVisibility = variantId => {
  return dispatch => {
    dispatch({ type: types.CHANGE_VARIANT_FORM_VISIBILITY, variantId });
  };
};

export const createChildVariant = variantId => {
  return dispatch => {
    Meteor.call("products/createVariant", variantId, (err, res) => {
      if (err) {
        // TODO check what err is correct message
        displayAlert({ message: err.message });
      }
      if (res) {
        dispatch({
          type: types.CREATE_CHILD_VARIANT,
          parentVariantId: variantId,
          newChildVariantId: res
        });
      }
    });
  };
};

export const cloneVariant = (productId, variantId) => {
  return dispatch => {
    Meteor.call("products/cloneVariant", productId, variantId, (err, res) => {
      if (err) {
        displayAlert({ message: err.message });
      }
      if (res) {
        dispatch({ type: types.CLONE_VARIANT, productId });
        // we need to double check what new id contains top level variant.
        // ofc we could use `res[0]` to get top level variant here but this is
        // too dangerous in my opinion
        const newTopVariant = ReactionCore.Collections.Products.find({
          _id: { $in: res },
          ancestors: [productId] },
          { fields: { _id: 1 }
        }).fetch();
        dispatch(addTopVariant(newTopVariant.length && newTopVariant[0]._id));
      }
        // return toggleSession("variant-form-" + result);
    });
  };
};

/**
 * deleteVariant
 * @summary fires `products/deleteVariant` method
 * @param {Object} variant - could be top level variant or child variant
 * @param [selectedVariant]
 * @param {String} [type] - could be "variant" or "option"
 * @return {function()}
 */
export const deleteVariant = (variant, selectedVariant, type = "variant") => {
  return dispatch => {
    const title = variant.title || (type === "variant" ?
      i18next.t("productDetailEdit.thisVariant") :
      i18next.t("productDetailEdit.thisOption"));
    if (confirm(i18next.t("productDetailEdit.removeVariantConfirm", { title }))) {
      // this is a workaround, because changing selected variant after removing
      // it from mongodb prevents to error with props
      if (selectedVariant && selectedVariant._id === variant._id) {
        dispatch(setVariantId(variant.ancestors[0]));
      }
      Meteor.call("products/deleteVariant", variant._id, (err, res) => {
        if (err) {
          // if error happens, we have to put selected variant back, but only if
          // this is top variant
          if (selectedVariant) {
            dispatch(setVariantId(variant.ancestors[0], variant._id));
          }
          displayAlert({ message: err.message });
        }
        if (res) {
          // additionally we have to remove deleted variant from `store` top
          // variants list
          if (selectedVariant) {
            dispatch(removeTopVariant(variant._id));
          }
        }
      });
    }
    dispatch({ type: types.DELETE_VARIANT, variantId: variant._id });
  };
};

export const updateVariant = variant => {
  return dispatch => {
    Meteor.call("products/updateVariant", variant, (err, res) => {
      // TODO currently method not returns any error object. Update it in future
      if (err) {
        displayAlert({ message: err.message });
      }
      if (res) {
        dispatch({ type: types.UPDATE_VARIANT, variantId: variant._id });
      }
    });
  };
};

/**
 * syncWithTitle
 * @summary we are using this to sync `optionTitle` of child variant with `title`
 * because we don't want to fill `optionTitle` manually
 * @param {String} childVariantId
 * @param {String} value - child variant`title`
 * @return {function()}
 */
export const syncWithTitle = (childVariantId, value) => {
  return dispatch => {
    const newValue = getSlug(value);
    dispatch(updateProductField(childVariantId, "optionTitle", newValue, "option"));
    dispatch({ type: types.SYNC_WITH_TITLE, childVariantId, optionTitle: newValue });
  };
};
