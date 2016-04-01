import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { getVariantQuantity, getTopVariants, getChildVariants } from "../../../../../client/helpers/products";
import Variant from "./Variant.jsx";
import FlatButton from "material-ui/lib/flat-button";
import ContentAdd from "material-ui/lib/svg-icons/content/add";

const styles = {
  list: {
    paddingLeft: 0,
    listStyle: "none",
    marginBottom: ".5rem"
  }
};

const getProductTopVariants = productId => {
  let inventoryTotal = 0;
  const variants = getTopVariants(productId);

  if (variants.length) {
    // calculate inventory total for all variants
    variants.forEach(variant => {
      let qty = getVariantQuantity(variant);
      if (typeof qty === "number") {
        inventoryTotal += qty;
      }
    });
    // calculate percentage of total inventory of this product
    variants.forEach(variant => {
      let qty = getVariantQuantity(variant);
      variant.inventoryTotal = inventoryTotal;
      if (inventoryTotal) {
        variant.inventoryPercentage = parseInt(qty / inventoryTotal * 100, 10);
      } else {
        variant.inventoryPercentage = 100;
      }
      if (variant.title) {
        variant.inventoryWidth = parseInt(variant.inventoryPercentage -
          variant.title.length, 10);
      } else {
        variant.inventoryWidth = 0;
      }
    });
    // sort variants in correct order
    variants.sort((a, b) => a.index - b.index);

    return variants;
  }
  return [];
};

class VariantList extends Component {
  render() {
    // TODO we need to not show part of variant UI if there is only one top-level
    // variant presents
    const {
      locale, productId, productActions, selectedVariant, t, topVariantsArray,
      variantsActions, displayAlert
    } = this.props;
    const topVariants = getProductTopVariants(productId);
    const childVariants = getChildVariants(productId, selectedVariant);

    return (
      <ul style={styles.list} >
        {topVariants.length && topVariantsArray.length ?
          topVariantsArray.map((variant, index) => (
            <Variant
              // using `variant._id` as `key` leads to an error about unique key,
              // so we are using `index`
              key={index}
              formVisible={variant.visible}
              locale={locale}
              productId={productId}
              productActions={productActions}
              selectedVariant={selectedVariant}
              variant={topVariants[index]}
              variantsActions={variantsActions}
              displayAlert={displayAlert}
            />
          )) :
          ReactionCore.hasPermission("createProduct") &&
            <FlatButton
              label={t("variantList.createVariant")}
              icon={<ContentAdd />}
              onTouchTap={() => variantsActions.createTopVariant(productId)}
            />
        }
      </ul>
    );
  }
}

VariantList.propTypes = {
  displayAlert: PropTypes.func,
  locale: PropTypes.shape({
    currency: PropTypes.object,
    language: PropTypes.string,
    locale: PropTypes.object,
    shopCurrency: PropTypes.object
  }).isRequired,
  productId: PropTypes.string.isRequired,
  productActions: PropTypes.shape({
    changeSelectedVariantId: PropTypes.func,
    updateProductField: PropTypes.func
  }).isRequired,
  selectedVariant: PropTypes.object,
  t: PropTypes.func,
  topVariantsArray: PropTypes.arrayOf(PropTypes.object),
  variantsActions: PropTypes.shape({
    changeVariantFormVisibility: PropTypes.func,
    createTopVariant: PropTypes.func,
    createChildVariant: PropTypes.func,
    cloneVariant: PropTypes.func,
    deleteVariant: PropTypes.func,
    getTopVariantsArray: PropTypes.func,
    syncWithTitle: PropTypes.func
  }).isRequired
};

export default translate("core")(VariantList);
