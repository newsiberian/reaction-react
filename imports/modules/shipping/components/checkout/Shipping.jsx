import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { formatPrice } from "../../../../client/helpers/i18n";
import Avatar from "material-ui/Avatar";
import { List, ListItem, MakeSelectable } from "material-ui/List";
let SelectableList = MakeSelectable(List);

const styles = {
  container: {
    padding: "1rem"
  },
  logo: {
    width: "auto",
    borderRadius: 0
  }
};

// HOC
const wrapState = ComposedComponent =>
  class extends Component {
    handleSelect(index) {
      const { shippingActions, shipmentQuotes } = this.props;
      shippingActions.setShipmentMethod(index, shipmentQuotes[index].method);
    }

    render() {
      const { selectedIndex } = this.props;
      return (
        <ComposedComponent
          {...this.props}
          {...this.state}
          // valueLink={{value: this.state.selectedIndex, requestChange: this.handleUpdateSelectedIndex}}
          valueLink={{
            value: selectedIndex,
            requestChange: (event, index) => this.handleSelect(index)
          }}
        />
      );
    }
  };


SelectableList = wrapState(SelectableList);

// These helpers can be used in general shipping packages
// cartShippingMethods to get current shipment methods
// until we handle multiple methods, we just use the first
const cartShippingMethods = () => {
  const cart = ReactionCore.Collections.Cart.findOne();
  if (cart) {
    if (cart.shipping) {
      if (cart.shipping[0].shipmentQuotes) {
        return cart.shipping[0].shipmentQuotes;
      }
    }
  }
  return [];
};

class Shipping extends Component {
  // REMINDER: We can't have reactivity here, I'm not sure exactly why, by I think
  // this is because of this cart objects are blackboxed. That's fine.
  render() {
    const {
      locale, selectedIndex, shippingActions, shippingConfigured, shippingMethods, t
    } = this.props;

    if (shippingMethods.length || !shippingConfigured) {
      // this is odd part. I"m not understand why we are taking shipping quites
      // from within cart, not from Shipping collection. Need to deeply look at
      // this logic
      const shipmentQuotes = cartShippingMethods();
      return (
        <div>
          <SelectableList
            // we have to pass several props to HOC to let `em operate with data
            selectedIndex={selectedIndex}
            shippingActions={shippingActions}
            shipmentQuotes={shipmentQuotes}
          >
            {shipmentQuotes.map((shipmentQuote, index) => {
              return (
                <ListItem
                  key={shipmentQuote.method._id}
                  value={index}
                  primaryText={shipmentQuote.method.label}
                  secondaryText={formatPrice(shipmentQuote.method.rate, locale)}
                  // we could put logo of transport company here
                  rightAvatar={
                    <Avatar
                      // FIXME find a way to take images from package `/public`
                      src="/resources/Russian_Post_logo.png"
                      style={styles.logo}
                    />
                  }
                />
              );
            })}
          </SelectableList>
        </div>
      );
    }
    return (
      <div style={styles.container}>
        <p>{t("checkoutShipping.noShippingMethods")}</p>
      </div>
    );
  }
}

Shipping.propTypes = {
  locale: PropTypes.shape({
    currency: PropTypes.object,
    language: PropTypes.string,
    locale: PropTypes.object,
    shopCurrency: PropTypes.object
  }).isRequired,
  selectedIndex: PropTypes.number.isRequired,
  shippingActions: PropTypes.shape({
    setShipmentMethod: PropTypes.func
  }).isRequired,
  shippingConfigured: PropTypes.number,
  shippingMethods: PropTypes.arrayOf(PropTypes.object),
  t: PropTypes.func
};

export default translate("core")(Shipping);
