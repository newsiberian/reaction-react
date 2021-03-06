import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import { StyleSheet } from "react-look";
import { ActionBarWrapper } from
  "../../../layout/components/ActionBarWrapper.jsx";
import Avatar from "material-ui/Avatar";
import Divider from "material-ui/Divider";
import FontIcon from "material-ui/FontIcon";
import List from "material-ui/List/List";
import ListItem from "material-ui/List/ListItem";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import Subheader from "material-ui/Subheader";
import { formatPrice } from "../../../../client/helpers/i18n";
import { getTag } from "../../../../client/helpers/products";
import { red500 } from "material-ui/styles/colors";

const c = StyleSheet.combineStyles;
const ss = StyleSheet.create({
  sizeItem: {
    position: "relative",
    display: "block",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#ffffff"
  },
  sizeControl: {
    display: "flex",
    flex: "1 1 auto",
    width: 50,
    maxWidth: 100,
    height: 50,
    margin: 10
  }
});

const styles = {
  headerContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fafafa"
  },
  subHeader: {
    fontSize: 17
  },
  headerButton: {
    minWidth: 45,
    marginLeft: 2,
    marginRight: 2
  },
  headerButtonContainer: {
    display: "flex",
    paddingRight: "1rem"
  },
  avatar: {
    borderRadius: 0
  },
  sizeContainer: {
    display: "flex",
    cursor: "pointer"
  },
  sizeMain: {
    flex: "1 1 auto",
    backgroundColor: "#cccccc",
    border: "1px solid #ffffff"
  },
  sizeSide: {
    display: "flex",
    flexDirection: "column",
    flex: "0 0 auto",
    width: "33%",
    height: "100%"
  },
  sizeSideSmall: {
    flex: "1 1 auto",
    display: "block",
    height: "25%",
    backgroundColor: "#cccccc",
    border: "1px solid #ffffff"
  }
};

const getMedia = productId => {
  const media = ReactionCore.Collections.Media.findOne({
    "metadata.productId": productId,
    "metadata.priority": 0,
    "metadata.toGrid": 1
  }, { sort: { uploadedAt: 1 } });

  return media instanceof FS.File ? media : false;
};

const setPublishList = products => {
  return products.map(product => {
    return {
      _id: product._id,
      doVisible: !product.isVisible,
      title: product.title  // we need it to display messages
    };
  });
};

// get styles by products `weight`
const getWeightActive = (products, weight, tag) => {
  for (let product of products) {
    let positions = product.positions && product.positions[tag] || {};
    let currentWeight = positions.weight || 0;
    if (currentWeight === weight) {
      return { backgroundColor: "#666666" };
    }
  }
  return {};
};

/**
 * @class Settings
 * @classdesc
 */
class Settings extends Component {
  render() {
    const {
      locale, location, params, products, productActions, routerActions, t
    } = this.props;

    if (!products.length) {
      return (
        <div style={{ margin: "1rem" }}>
          {t("productDetailEdit.noSelectedProducts")}
          <i className="fa fa-gear" />
          {t("productDetailEdit.orShiftCtrlCmd")}
        </div>
      );
    }

    const tag = getTag(location, params);
    const publishClassName = products[0].isVisible ? "fa fa-eye" : "fa fa-eye-slash";
    const publishList = setPublishList(products);
    return (
      <div>
        <div style={styles.headerContainer}>
          <Subheader style={styles.subHeader}>{t("productDetailEdit.product")}</Subheader>
          <div style={styles.headerButtonContainer}>
            <RaisedButton
              icon={<FontIcon className={publishClassName} />}
              style={styles.headerButton}
              title={t("productDetailEdit.publish")}
              onClick={() => productActions.publishProduct(publishList)}
            />
            <RaisedButton
              icon={<FontIcon className="fa fa-clone" />}
              style={styles.headerButton}
              title={t("productDetailEdit.duplicateProduct")}
              onClick={() => productActions.cloneProduct(products)}
            />
            <RaisedButton
              // fixme bg color seems to be bugged
              backgroundColor={red500}
              icon={<FontIcon className="fa fa-trash-o" />}
              style={styles.headerButton}
              title={t("productDetailEdit.deleteProduct")}
              onClick={() => productActions.maybeDeleteProduct(products)}
            />
          </div>
        </div>
        <Divider />
        <List>
          {products.map(product => {
            const media = getMedia(product._id);
            let src;
            if (media) {
              src = media.url({ store: "thumbnail" });
            } else {
              src = "/resources/placeholder.gif";
            }
            return (
              <ListItem
                key={product._id}
                leftAvatar={<Avatar src={src} style={styles.avatar} />}
                primaryText={product.title}
                secondaryText={formatPrice(product.price.range, locale)}
                onClick={() => routerActions.push(`/shop/product/${product.handle}`)}
              />
            );
          })}
        </List>
        <Divider />
        <div style={styles.headerContainer}>
          <Subheader style={styles.subHeader}>{t("productDetailEdit.size")}</Subheader>
        </div>
        <Divider />
        <Paper style={styles.sizeContainer} zDepth={1} rounded={false}>
          <div
            className={c(ss.sizeItem, StyleSheet.create({ paddingLeft: 5, paddingRight: 5 }),
              StyleSheet.create(getWeightActive(products, 0, tag)))}
            onClick={() => productActions.updateProductWeight(products, 0, tag)}
          >
            <div className={ss.sizeControl}>
              <div style={styles.sizeMain}></div>
            </div>
          </div>
          <div
            className={c(ss.sizeItem, StyleSheet.create(getWeightActive(products, 1, tag)))}
            onClick={() => productActions.updateProductWeight(products, 1, tag)}
          >
            <div
              className={c(ss.sizeControl, StyleSheet.create({
                width: 75,
                marginLeft: 0,
                marginRight: 0
              }))}
            >
              <div style={styles.sizeMain}></div>
              <div style={styles.sizeSide}>
                <i style={styles.sizeSideSmall} />
                <i style={styles.sizeSideSmall} />
                <i style={styles.sizeSideSmall} />
              </div>
            </div>
          </div>
          <div
            className={c(ss.sizeItem, StyleSheet.create(getWeightActive(products, 2, tag)))}
            onClick={() => productActions.updateProductWeight(products, 2, tag)}
          >
            <div
              className={c(ss.sizeControl, StyleSheet.create({
                width: 100,
                marginLeft: 0,
                marginRight: 5
              }))}
            >
              <div style={styles.sizeMain}></div>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

Settings.propTypes = {
  locale: PropTypes.shape({
    currency: PropTypes.object,
    language: PropTypes.string,
    locale: PropTypes.object,
    shopCurrency: PropTypes.object
  }).isRequired,
  // could be helpful for `maybeDeleteProduct` actionCreator. Currently unused.
  location: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  products: PropTypes.arrayOf(PropTypes.object),
  productActions: PropTypes.shape({
    cloneProduct: PropTypes.func,
    maybeDeleteProduct: PropTypes.func,
    publishProduct: PropTypes.func,
    updateProductWeight: PropTypes.func
  }).isRequired,
  routerActions: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

const options = {
  title: "productDetailEdit.productSettings"
};

export default translate("core")(ActionBarWrapper(Settings, options));
