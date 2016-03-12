import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { ActionBarWrapper } from
  "../../../layout/components/ActionBarWrapper.jsx";
import Avatar from "material-ui/lib/avatar";
import Divider from "material-ui/lib/divider";
import FontIcon from "material-ui/lib/font-icon";
import List from "material-ui/lib/lists/list";
import ListItem from "material-ui/lib/lists/list-item";
import Paper from "material-ui/lib/paper";
import RaisedButton from "material-ui/lib/raised-button";
import Subheader from "material-ui/lib/Subheader";
import { formatPrice } from "../../../../client/helpers/i18n";
import { red500 } from "material-ui/lib/styles/colors";

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
  sizeItem: {
    position: "relative",
    display: "block",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#ffffff"
    //border: "1px solid #dddddd",
    //borderWidth: "1px 0",
    //borderRadius: "0"
  },
  sizeControl: {
    display: "flex",
    flex: "1 1 auto",
    width: 50,
    maxWidth: 100,
    height: 50,
    margin: 10
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

const getWeightActive = (products, weight) => {
  debugger;
  //return products.forEach(product => {
  //  const position = product.position || {};
  //  const currentWeight = position.weight || 0;
  //  return currentWeight === weight && { backgroundColor: "#666666" };
  //});
  for (let product of products) {
    let position = product.position || {};
    let currentWeight = position.weight || 0;
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
    const { products, productActions, routeActions, t } = this.props;
    // todo show something else if products.length zero
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
                secondaryText={formatPrice(product.price.range)}
                onClick={() => routeActions.push(`/shop/product/${product.handle}`)}
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
            style={Object.assign({}, styles.sizeItem,
             { paddingLeft: 5, paddingRight: 5 }, getWeightActive(products, 0))}
            onClick={(e) => console.log(e)}
          >
            <div style={styles.sizeControl}>
              <div style={styles.sizeMain}></div>
            </div>
          </div>
          <div
            style={Object.assign({}, styles.sizeItem, getWeightActive(products, 1))}
            onClick={(e) => console.log(e)}
          >
            <div
              style={Object.assign({}, styles.sizeControl, {
                width: 75,
                marginLeft: 0,
                marginRight: 0
              })}
            >
              <div style={styles.sizeMain}></div>
              <div style={styles.sizeSide}>
                <i style={styles.sizeSideSmall}></i>
                <i style={styles.sizeSideSmall}></i>
                <i style={styles.sizeSideSmall}></i>
              </div>
            </div>
          </div>
          <div
            style={Object.assign({}, styles.sizeItem, getWeightActive(products, 2))}
            onClick={(e) => console.log(e)}
          >
            <div
              style={Object.assign({}, styles.sizeControl, {
                width: 100,
                marginLeft: 0,
                marginRight: 0
              })}
            >
              <div style={styles.sizeMain}></div>
            </div>
          </div>
        </Paper>
        {/*<Divider />*/}
      </div>
    );
  }
}

Settings.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  productActions: PropTypes.shape({
    cloneProduct: PropTypes.func,
    maybeDeleteProduct: PropTypes.func,
    publishProduct: PropTypes.func
  }).isRequired,
  routeActions: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

const options = {
  title: "productDetailEdit.productSettings"
};

export default translate("core")(ActionBarWrapper(Settings, options));
