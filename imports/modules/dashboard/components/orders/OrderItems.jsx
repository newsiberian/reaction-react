import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
// import Avatar from "material-ui/Avatar";
import Badge from "../../../layout/components/Badge.jsx";
// import { StyleSheet } from "react-look";

// const styles = StyleSheet.create({
//   container: {
//     padding: "1rem"
//   }
// });

class OrderItems extends Component {
  render() {
    const { item, locale, media, t } = this.props;
    return (
      <div>
        <img
          src={media ? media.url({ store: "thumbnail" }) : "/resources/placeholder.gif"}
          alt={item.variants.title}
        />
        {item.variants.title}
        <Badge badgeContent={item.quantity} />
        ": "
        {formatPrice(item.variants.price, locale)}
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
  media: PropTypes.instanceof(FS.File),
  t: PropTypes.func
};

export default translate("core")(OrderItems);
