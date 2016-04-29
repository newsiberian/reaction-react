import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import { StyleSheet } from "react-look";
import { formatPrice } from "../../../../client/helpers/i18n";
// import Avatar from "material-ui/Avatar";
import Badge from "../../../layout/components/Badge.jsx";

const c = StyleSheet.combineStyles;
const styles = StyleSheet.create({
  container: {
    // padding: "1rem"
    flex: "1 1 auto", // to stretch container to 100% width
    display: "flex",
    alignItems: "center",
    padding: "1rem"
  },
  image: { height: 80, width: "auto" },
  price: { marginRight: "1rem", textAlign: "right" }
});

class OrderItems extends Component {
  render() {
    const { item, locale, media, t } = this.props;
    return (
      <div className={styles.container}>
        <img
          className={styles.image}
          src={media ? media.url({ store: "thumbnail" }) : "/resources/placeholder.gif"}
          alt={item.variants.title}
        />
        <div className="col-xs">
          {item.variants.title}
        </div>
        <div className={c(styles.price, "col-xs")}>
          <Badge badgeContent={item.quantity} />
          {": "}
          {formatPrice(item.variants.price, locale)}
        </div>
      </div>
    );
  }
}

OrderItems.propTypes = {
  item: PropTypes.object.isRequired,
  locale: PropTypes.shape({
    currency: PropTypes.object,
    language: PropTypes.string,
    locale: PropTypes.object,
    shopCurrency: PropTypes.object
  }).isRequired,
  media: PropTypes.instanceOf(FS.File),
  t: PropTypes.func
};

export default translate("core")(OrderItems);
