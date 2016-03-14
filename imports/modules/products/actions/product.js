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
 * validateBeforeToggleVisibility
 * @summary validate product document before fire toggle product visibility
 *
 * @param {Object} product - product doc
 * @param {Boolean} doVisible - new visibility state
 * @return {Function}
 */
export const validateBeforeToggleVisibility = (product, doVisible) => {
  return dispatch => {
    let message = "";
    if (!product.title) {
      message += i18next.t("error.isRequired", {
        field: i18next.t("productDetailEdit.title")
      });
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
      dispatch(publishProduct([{ _id: product._id, doVisible: doVisible }]));
    }
  };
};

/**
 * publishProduct
 * @summary loop over products array and fires `publishProduct` method for each
 * @param {Array} products - array with product _id and new visibility state
 * @return {Function}
 */
export const publishProduct = products => {
  return dispatch => {
    products.forEach(product => Meteor.call("products/publishProduct", product._id,
      (error, result) => {
        if (error) {
          dispatch(displayAlert({ message: error.reason }));
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
        dispatch(routeActions.push(`/shop/product/${res[0]}`));
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
 * @return {Function}
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
          dispatch(routeActions.push("/shop"));
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

export const updateProductWeight = (products, weight) => {
  return dispatch => {
    products.forEach(product => {
      const positions = {
        // the realization of `ReactionCore.getCurrentTag()` method
        // I think we don't need to set `tag` here
        // tag: ~location.pathname.indexOf("/shop/product/tag/"),
        weight: weight,
        updatedAt: new Date()
      };

      Meteor.call("products/updateProductPosition", product._id, positions,
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

/**
 * changeProductField
 * @summary this calls on product field change event
 * @param field
 * @param value
 * @return {{type, field: *, value: *}}
 */
export const changeProductField = (productId, field, value) => {
  return { type: types.CHANGE_PRODUCT_FIELD, productId: productId, field: field, value: value };
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
        if (error) {
          let message;
          if (error.reason === "Title is required") {
            message = i18next.t("error.isRequired", { field: i18next.t("productDetailEdit.title") });
          } else {
            message = error.reason;
          }
          dispatch(displayAlert({ message: message }));
        }
        if (result && field === "title") {
          Meteor.call("products/setHandle", productId, (err, res) => {
            if (err) {
              dispatch(displayAlert({ message: err.reason }));
            }
            if (res) {
              dispatch(routeActions.push(`/shop/product/${res}`));
            }
          });
        }
        dispatch({ type: types.UPDATE_PRODUCT_FIELD, productId: productId, field: field, value: value });
      }
    );
  };
};

export const selectProduct = (productId) => {
  return { type: types.SELECT_PRODUCT, productId: productId };
};

export const unselectProduct = (productId) => {
  return { type: types.UNSELECT_PRODUCT, productId: productId };
};

export const flushProductsList = () => {
  return { type: types.FLUSH_SELECTED_PRODUCTS };
};
