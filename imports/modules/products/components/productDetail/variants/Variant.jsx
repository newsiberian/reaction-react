import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { ReactionCore } from "meteor/reactioncommerce:core";
import look, { StyleSheet } from "react-look";
import { formatPrice } from "../../../../../client/helpers/i18n";
import { getVariantQuantity, getVariantPriceRange } from "../../../../../client/helpers/products";

const c = StyleSheet.combineStyles;
const styles = StyleSheet.create({
  variantListItem: {
    margin: "5px 0 5px 0",
    lineHeight: "28px",
    cursor: "pointer"
  },
  variantDetail: {
    height: 28,
    // boxSizing: "border-box", // without this `height` calculates incorrect
    borderRadius: 4,
    fontSize: 12,
    border: "3px solid transparent",
    marginTop: ".5rem",
    ":hover": {
      border: "3px solid gray",
      backgroundColor: "gray"
    }
  },
  progress: {
    height: 28,
    overflow: "hidden",
    marginBottom: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 4,
    boxShadow: "inset 0 1px 2px rgba(0,0,0,.1)"
  },
  progressBar: {
    float: "left",
    width: props => {
      return `${props.variant.inventoryPercentage}%` || "0%";
    },
    height: "100%",
    fontSize: 12,
    lineHeight: "20px",
    color: "#fff",
    textAlign: "center",
    backgroundColor: props => {
      if (props.variant.inventoryPercentage <= 10) {
        return "#d9534f";
      } else if (props.variant.inventoryPercentage <= 30) {
        return "#f0ad4e";
      }
      return "#5cb85c";
    },
    opacity: props => {
      return props.variant.inventoryPercentage > 30 && "0.8";
    },
    boxShadow: "inset 0 -1px 0 rgba(0,0,0,.15)",
    transition: "width .6s ease"
  },
  variantProgressItem: {
    border: 0,
    boxSizing: "border-box",
    position: "absolute",
    paddingLeft: 8,
    paddingRight: 10,
    width: "100%"
  },
  badge: {
    display: "inline-block",
    minWidth: 10,
    padding: "3px 7px",
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
    lineHeight: 1,
    verticalAlign: "middle",
    whiteSpace: "nowrap",
    textAlign: "center",
    backgroundColor: "#777777",
    borderRadius: 10
  },
  variantQty: {},
  variantQtySoldOut: {
    textTransform: "uppercase",
    borderRadius: 1
  },
  variantTitle: {
    position: "absolute",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "clip",
    display: "inline-block",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    marginLeft: 5,
    lineHeight: "28px",
    fontWeight: 400,
    color: "#333333",
    width: "80%",
    "@media (max-width: 991px)": {
      letterSpacing: "0em",
      width: "70%"
    }
  },
  variantPrice: {
    display: "inline-block",
    marginLeft: 10,
    fontSize: "medium",
    fontWeight: 500,
    lineHeight: "30px",
    color: "#333333",
    position: "absolute",
    right: "12px"
  }
});

const variantDetailSelected = (id, selectedVariant) => {
  if (selectedVariant && typeof selectedVariant._id === "string" &&
    (id === selectedVariant._id || ~selectedVariant.ancestors.indexOf(id))) {
    return StyleSheet.create({
      border: "3px solid gray",
      backgroundColor: "gray"
    });
  }
  // TODO should we return something like `StyleSheet.create({})` here?
};

class Variant extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { locale, selectedVariant, t, variant } = this.props;
    const isAdmin = ReactionCore.hasPermission("createProduct");
    const variantQuatity = getVariantQuantity(variant);
    const isSoldOut = variantQuatity < 1;
    return (
      <li className={styles.variantListItem}>
        <div className={c(styles.variantDetail, variantDetailSelected(variant._id, selectedVariant))}>
          <div className={styles.progress}>
            <span
              className={styles.progressBar}
              role="progressbar"
              aria-valuenow={variantQuatity}
              aria-valuemin="0"
              aria-valuemax={variant.inventoryTotal}
            />
            <div className={styles.variantProgressItem}>
              {/* TODO test this carefully */}
              {variant.inventoryManagement && !isSoldOut ?
                <span className={c(styles.variantQty, styles.badge)}>{variantQuatity}</span> :
                  variant.inventoryPolicy ?
                    <span className={c(styles.variantQtySoldOut, styles.badge)}>
                      {t("productDetail.soldOut")}
                    </span> :
                    <span className={c(styles.variantQtySoldOut, styles.badge)}>
                      {t("productDetail.backOrder")}
                    </span>
              }
              <span className={styles.variantTitle}>{variant.title}</span>
              <span className={styles.variantPrice}>
                {formatPrice(getVariantPriceRange(variant._id), locale)}
              </span>
            </div>
          </div>

        </div>
      </li>
    );
  }
}

Variant.propTypes = {
  locale: PropTypes.shape({
    currency: PropTypes.object,
    language: PropTypes.string,
    locale: PropTypes.object,
    shopCurrency: PropTypes.object
  }).isRequired,
  selectedVariant: PropTypes.object,
  t: PropTypes.func,
  variant: PropTypes.object.isRequired
};

export default translate("core")(look(Variant));
