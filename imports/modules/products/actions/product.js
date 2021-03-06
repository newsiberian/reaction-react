import { Meteor } from "meteor/meteor";
import { ReactionCore } from "meteor/reactioncommerce:core";
import * as types from "../constants";
import { getVariants, getTopVariants } from "../../../client/helpers/products";
import { displayAlert } from "../../layout/actions/alert";
import { routerActions } from "react-router-redux";
import i18next from "i18next";

/**
 * setProductId
 * @summary used for the first load setting the current product _id
 *
 * @param productId
 * @return {{type, productId: *}}
 */
export const setProductId = productId => {
  return { type: types.SET_PRODUCT_ID, productId };
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
      const variants = getTopVariants(productId);
      variantId = Array.isArray(variants) && variants.length &&
        variants[0]._id || null;
    }
  }

  return { type: types.SET_VARIANT_ID, variantId };
};

export const changeSelectedVariantId = variantId => {
  return { type: types.CHANGE_SELECTED_VARIANT_ID, variantId };
};

export const destroySelectedIds = () => {
  return { type: types.DESTROY_SELECTED_IDS };
};

/**
 * validateBeforeToggleVisibility
 * @summary validate product document before fire toggle product visibility
 *
 * @param {Object} product - product doc
 * @param {Boolean} doVisible - new visibility state
 * @return {Function} publishProduct
 */
export const validateBeforeToggleVisibility = (product, doVisible) => {
  return dispatch => {
    let message = "";
    if (!product.title) {
      message += i18next.t("error.isRequired", {
        field: i18next.t("productDetailEdit.title")
      });
    }
    const variants = getVariants(product._id);
    variants.forEach((variant, index) => {
      if (!variant.title) {
        message += `${i18next.t("error.variantFieldIsRequired",
          { field: i18next.t("productVariant.title"), number: index + 1 })} `;
      }
      // if top variant has children, it is not necessary to check its price
      if (variant.ancestors.length === 1 && !getVariants(variant._id) ||
        variant.ancestors.length !== 1) {
        if (! variant.price) {
          message += `${i18next.t("error.variantFieldIsRequired",
            { field: i18next.t("productVariant.price"), number: index + 1 })} `;
        }
      }
    });
    if (message.length) {
      dispatch(displayAlert({ message: message }));
    } else {
      dispatch(publishProduct([{ _id: product._id, doVisible: doVisible }]));
    }
  };
};

/**
 * publishProduct
 * @summary loop over products array and fires `publishProduct` method for each
 * @param {Array} products - array with product _id and new visibility state
 * @return {Function} calls `products/publishProduct` Meteor method
 */
export const publishProduct = products => {
  return dispatch => {
    products.forEach(product => Meteor.call("products/publishProduct", product._id,
      (error, result) => {
        if (error) {
          let errMessage;
          if (error.message === "Some properties are missing.") {
            errMessage = "Some properties are missing.";
          } else {
            errMessage = error.message;
          }
          dispatch(displayAlert({ message: errMessage }));
          throw new Meteor.Error("error publishing product", error);
        }
        const message = result ?
          i18next.t("productDetail.publishProductVisible", { product: product.title }) :
          i18next.t("productDetail.publishProductHidden", { product: product.title });
        dispatch(displayAlert({ message: message }));
        dispatch({
          type: types.TOGGLE_PRODUCT_VISIBILITY,
          productId: product._id,
          visible: result
        });
      })
    );
  };
};

/**
 * cloneProduct
 * @summary fires `cloneProduct` server method
 * @param {Array|Object} productOrArray - array if actionCreator called from
 * productGrid, object - if from PDP
 * @return {Function} fires `products/cloneProduct`
 */
export const cloneProduct = productOrArray => {
  return dispatch => {
    const products = !Array.isArray(productOrArray) ? [productOrArray] : productOrArray;
    Meteor.call("products/cloneProduct", products, (err, res) => {
      if (err) {
        dispatch(displayAlert({ message: err.reason }));
        throw new Meteor.Error("error cloning product", error);
      }
      // `res` contains new products ids, so we can't compare res with products
      if (res) {
        if (products.length === 1) {
          dispatch(displayAlert({
            message: i18next.t("productDetail.clonedAlert",
              { product: products[0].title })
          }));
        } else {
          dispatch(displayAlert({
            message: i18next.t("productDetail.clonedAlert_plural",
              { product: i18next.t("productDetail.theSelectedProducts"), count: 0 })
          }));
        }
      }
      dispatch({
        type: types.CLONE_PRODUCTS,
        result: res || null
      });
      // redirect to clone PDP if we cloning from PDP
      if (!Array.isArray(productOrArray)) {
        dispatch(routerActions.push(`/shop/product/${res[0]}`));
      }
    });
  };
};

/**
 * maybeDeleteProduct
 * @summary fires `products/deleteProduct` method for a list of products
 * @param {Array} products - array with products objects
 * @todo we could make this actionCreator better by checking the current route
 * and redirect accordingly to it.
 * @return {Function} calls `products/deleteProduct` Meteor method
 */
export const maybeDeleteProduct = products => {
  return dispatch => {
    const productIds = _.map(products, product => product._id);
    let confirmTitle;
    if (products.length === 1) {
      confirmTitle = i18next.t("productDetailEdit.deleteThisProduct");
    } else {
      confirmTitle = i18next.t("productDetailEdit.deleteSelectedProducts");
    }

    if (confirm(confirmTitle)) {
      Meteor.call("products/deleteProduct", productIds, function (err, res) {
        let title;
        if (err) {
          title = products.length === 1 ?
          products[0].title || i18next.t("productDetail.deleteErrorTheProduct") :
            i18next.t("productDetail.theSelectedProducts");
          dispatch(displayAlert({
            message: i18next.t("productDetail.productDeleteError", { product: title })
          }));
          throw new Meteor.Error("Error deleting " + title, error);
        }
        if (res) {
          // todo if we are located in product, we should be redirected to the
          // top level. Top level not always `shop`. We could be inside tag route
          dispatch(routerActions.push("/shop"));
          if (products.length === 1) {
            title = products[0].title || "productDetail.";
            dispatch(displayAlert({
              message: i18next.t("productDetail.deletedAlert", { product: title })
            }));
          } else {
            title = i18next.t("productDetail.theSelectedProducts");
            dispatch(displayAlert({
              message: i18next.t("productDetail.deletedAlert_plural",
                { product: title, count: 0 })
            }));
          }
        }
        dispatch({
          type: types.DELETE_PRODUCT,
          productIds: productIds,
          result: res ? "success" : "failed"
        });
      });
    }
  };
};

export const updateProductWeight = (products, weight, tag) => {
  return dispatch => {
    products.forEach(product => {
      const positions = {
        // the realization of `ReactionCore.getCurrentTag()` method
        // I think we don't need to set `tag` here
        // tag: ~location.pathname.indexOf("/shop/product/tag/"),
        weight: weight,
        updatedAt: new Date()
      };

      Meteor.call("products/updateProductPosition", product._id, positions, tag,
        err => {
          // todo I'm not sure this method even return error or result
          if (err) {
            dispatch(displayAlert({
              message: i18next.t("productDetail.", { product: title })
            }));
            throw new Meteor.Error("Error changing weight " + product.title, error);
          }
          dispatch({
            type: types.CHANGE_PRODUCT_WEIGHT,
            productId: product._id,
            result: err ? "failed" : "success"
          });
        }
      );
    });
  };
};

// /**
//  * changeProductField
//  * @summary this calls on product field change event
//  * @deprecated
//  * @param {String} productId - product
//  * @param {String} field
//  * @param {String} value
//  * @return {{type, field: *, value: *}}
//  */
// export const changeProductField = (productId, field, value) => {
//   return { type: types.CHANGE_PRODUCT_FIELD, productId, field, value };
// };

/**
 * updateProductField
 * @summary this calls on product field blur event
 * @param {String} productId - product or variant or child variant `_id`
 * @param {String} field - field name
 * @param {String|Number} value - field value
 * @param {String} [type] - type of product. Could be "variant" or "product"
 * @return {Function} calls `products/setHandle` Meteor method
 */
export const updateProductField = (productId, field, value, type = "product") => {
  return dispatch => {
    Meteor.call("products/updateProductField", productId, field, value,
      (error, result) => {
        if (error) {
          let message;
          if (error.reason === "Title is required") {
            message = i18next.t("error.isRequired", { field: i18next.t("productDetailEdit.title") });
          } else {
            message = error.reason;
          }
          dispatch(displayAlert({ message: message }));
        }
        if (result && field === "title" && type !== "variant") {
          Meteor.call("products/setHandle", productId, (err, res) => {
            if (err) {
              dispatch(displayAlert({ message: err.reason }));
            }
            if (res) {
              dispatch(routerActions.push(`/shop/product/${res}`));
            }
          });
        }
        dispatch({ type: types.UPDATE_PRODUCT_FIELD, productId, field, value });
      }
    );
  };
};

// this needed to rollback `isChanged` field state to remove animation effect
export const rollbackFieldState = field => {
  return { type: types.ROLLBACK_FIELD_STATE, field };
};

export const selectProduct = productId => {
  return { type: types.SELECT_PRODUCT, productId };
};

export const unselectProduct = productId => {
  return { type: types.UNSELECT_PRODUCT, productId };
};

export const flushProductsList = () => ({ type: types.FLUSH_SELECTED_PRODUCTS });

export const incrementAddToCartQuantity = () => ({ type: types.INCREMENT_ADD_TO_CART_QUANTITY });

export const decrementAddToCartQuantity = () => ({ type: types.DECREMENT_ADD_TO_CART_QUANTITY });

export const changeAddToCartQuantity = quantity => {
  return { type: types.CHANGE_ADD_TO_CART_QUANTITY, quantity };
};

/**
 * destroyAddToCartQuantity
 * @summary we need to reset `addToCartQuantity` state after successful adding
 * to cart
 * @return {{type, quantity: *}}
 */
export const destroyAddToCartQuantity = () => {
  return { type: types.DESTROY_ADD_TO_CART_QUANTITY };
};

export const addToCart = (product, currentVariant, quantity) => {
  return dispatch => {
    if (currentVariant) {
      if (currentVariant.ancestors.length === 1) {
        // if options exists, one should be chosen
        const options = getVariants(currentVariant._id);
        if (options.length > 0) {
          dispatch(displayAlert({ message: i18next.t("productDetail.chooseOptions") }));
          return [];
        }
      }

      if (currentVariant.inventoryPolicy && currentVariant.inventoryQuantity < 1) {
        dispatch(displayAlert({ message: i18next.t("productDetail.outOfStock") }));
        return [];
      }

      if (!product.isVisible) {
        dispatch(displayAlert({ message: i18next.t("productDetail.publishFirst") }));
      } else {
        Meteor.call("cart/addToCart", product._id, currentVariant._id, quantity,
          (err, res) => {
            if (err) {
              ReactionCore.Log.error("Failed to add to cart.", error);
              dispatch(displayAlert({ message: err.reason }));
            }
            if (res) {
              dispatch({
                type: types.ADD_TO_CART,
                productId: product._id,
                variantId: currentVariant._id,
                quantity
              });
              dispatch(resetAddToCartQuantity());
              // TODO add remained logic with cool add to cart animation
            }
          }
        );
      }
    } else {
      dispatch(displayAlert({ message: i18next.t("productDetail.selectOption") }));
    }
  };
};
