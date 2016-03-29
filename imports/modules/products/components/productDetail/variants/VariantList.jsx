import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { getVariants, getVariantQuantity, getTopVariants } from "../../../../../client/helpers/products";
import Variant from "./Variant.jsx";
import FlatButton from "material-ui/lib/flat-button";
import ContentAdd from "material-ui/lib/svg-icons/content/add";

const styles = {
  list: {
    paddingLeft: 0,
    listStyle: "none",
    marginBottom: ".5rem",
    position: "relative"
  }
};

const getProductTopVariants = productId => {
  let inventoryTotal = 0;
  const variants = getTopVariants(productId);

  if (variants.length > 0) {
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
      variant.inventoryPercentage = parseInt(qty / inventoryTotal * 100, 10);
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
};

const getChildVariants = (productId, selectedVariant) => {
  const childVariants = [];
  const variants = getVariants(productId);
  if (variants.length) {
    const current = selectedVariant;

    if (typeof current._id !== "string") {
      return;
    }

    if (current.ancestors.length === 1) {
      variants.forEach(variant => {
        if (typeof variant.ancestors[1] === "string" &&
          variant.ancestors[1] === current._id &&
          variant.optionTitle &&
          variant.type !== "inventory") {
          childVariants.push(variant);
        }
      });
    } else {
      // TODO not sure we need this part...
      variants.forEach(variant => {
        if (typeof variant.ancestors[1] === "string" &&
          variant.ancestors.length === current.ancestors.length &&
          variant.ancestors[1] === current.ancestors[1] &&
          variant.optionTitle) {
          childVariants.push(variant);
        }
      });
    }

    return childVariants;
  }
};

class VariantList extends Component {
  render() {
    // TODO we need to not show part of variant UI if there is only one top-level
    // variant presents
    const { locale, productId, selectedVariant, t } = this.props;
    const variants = getProductTopVariants(productId);
    const childVariants = getChildVariants(productId, selectedVariant);

    return (
      <ul style={styles.list} >
        {variants.length ? variants.map(variant => (
          <Variant
            key={variant._id}
            locale={locale}
            variant={variant}
            selectedVariant={selectedVariant}
          />
        )) :
        ReactionCore.hasPermission("createProduct") &&
        <FlatButton
          label={t("variantList.createVariant")}
          icon={<ContentAdd />}
        />}
      </ul>
    );
  }
}

VariantList.propTypes = {
  locale: PropTypes.shape({
    currency: PropTypes.object,
    language: PropTypes.string,
    locale: PropTypes.object,
    shopCurrency: PropTypes.object
  }).isRequired,
  productId: PropTypes.string.isRequired,
  selectedVariant: PropTypes.object,
  t: PropTypes.func
};

export default translate("core")(VariantList);
