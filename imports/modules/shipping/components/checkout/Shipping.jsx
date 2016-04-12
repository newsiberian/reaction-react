import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { formatPrice } from "../../../../client/helpers/i18n";
import Avatar from 'material-ui/lib/avatar';
import List from "material-ui/lib/lists/list";
import ListItem from "material-ui/lib/lists/list-item";
import { SelectableContainerEnhance } from "material-ui/lib/hoc/selectable-enhance";
let SelectableList = SelectableContainerEnhance(List);

const styles = {
  container: {
    padding: "1rem"
  },
  logo: {
    width: "auto",
    borderRadius: 0
  }
};

function wrapState(ComposedComponent) {
  const StateWrapper = React.createClass({
    // getInitialState() {
    //   return {selectedIndex: -1};
    // },
    // handleUpdateSelectedIndex(event, index) {
    //   this.setState({
    //     selectedIndex: index
    //   });
    // },
    render() {
      const { selectedIndex, shippingActions } = this.props;
      return (
        <ComposedComponent
          {...this.props}
          {...this.state}
          // valueLink={{value: this.state.selectedIndex, requestChange: this.handleUpdateSelectedIndex}}
          valueLink={{
            value: selectedIndex,
            requestChange: (event, index, method) => shippingActions.setShipmentMethod(index, method)
          }}
        />
      );
    }
  });
  return StateWrapper;
}

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
            selectedIndex={selectedIndex}
            shippingActions={shippingActions}
          >
            {shipmentQuotes.map((shipmentQuote, index) => {
              return (
                <ListItem
                  key={shipmentQuote.method._id}
                  value={index}
                  method={shipmentQuote.method}
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
