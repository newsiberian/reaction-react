import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { ActionBarWrapper } from
  "../../../layout/components/ActionBarWrapper.jsx";
import Avatar from "material-ui/lib/avatar";
import Divider from "material-ui/lib/divider";
import FontIcon from "material-ui/lib/font-icon";
import List from "material-ui/lib/lists/list";
import ListItem from "material-ui/lib/lists/list-item";
import RaisedButton from "material-ui/lib/raised-button";
import Subheader from "material-ui/lib/Subheader";
import { formatPrice } from "../../../../client/helpers/i18n";
import { red500 } from "material-ui/lib/styles/colors";

const styles = {
  headerContainer: {
    display: "flex",
    alignItems: "center"
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
        <div>
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
        </div>
        <Divider />
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
