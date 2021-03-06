import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import Badge from "../../../layout/components/Badge.jsx";
import Divider from "material-ui/Divider";
import FlatButton from "material-ui/FlatButton";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import Paper from "material-ui/Paper";
import Subheader from "material-ui/Subheader";

const styles = {
  address: {
    padding: "1rem",
    position: "relative",
    marginBottom: "1rem"
  },
  menu: {
    position: "absolute",
    top: 0,
    right: 0
  },
  dividerGlobal: {
    marginTop: "1rem"
  },
  badges: {
    position: "absolute",
    top: 0,
    right: "2rem",
    padding: 12
  },
  billingBadge: {
    marginLeft: 4
  },
  button: {
    minWidth: "50%",
    marginBottom: "-1rem"
  },
  innerContainer: {
    marginTop: "1rem"
  }
};

class AddressBookGrid extends Component {
  render() {
    const { addressBook, addressBookActions, t } = this.props;

    console.log("AddressBookGrid...");
    return (
      <div>
        <FlatButton
          label={t("addressBookGrid.addAddress")}
          onTouchTap={() => addressBookActions.changeCurrentView("addressBookAdd")}
        />
        <Divider style={styles.dividerGlobal} />
        {Boolean(addressBook && addressBook.length > 1) &&
          <Subheader>
            {t("addressBook.selectShippingAddressAndBillingAddress")}
          </Subheader>
        }
        {Boolean(addressBook.length) && addressBook.map((address, i) => {
          return (
            <Paper key={i} zDepth={2} style={styles.address}>
              {Boolean(address.isShippingDefault || address.isBillingDefault) &&
                <div style={styles.badges}>
                  {address.isShippingDefault &&
                    <Badge
                      badgeContent={t("addressBook.shippingAddress")}
                    />
                  }
                  {address.isBillingDefault &&
                    <Badge
                      badgeContent={t("addressBook.billingAddress")}
                      backgroundColor="#007E33"
                      style={styles.billingBadge}
                    />
                  }
                </div>
              }
              <IconMenu
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                anchorOrigin={{horizontal: "right", vertical: "top"}}
                targetOrigin={{horizontal: "right", vertical: "top"}}
                style={styles.menu}
              >
                {!address.isShippingDefault &&
                  <MenuItem
                    title={t("address.isShippingDefault")}
                    primaryText={t("addressBook.shippingAddress")}
                    onTouchTap={() => addressBookActions.changeShippingAddress(address)}
                  />
                }
                {!address.isBillingDefault &&
                  <MenuItem
                    title={t("address.isBillingDefault")}
                    primaryText={t("addressBook.billingAddress")}
                    onTouchTap={() => addressBookActions.changeBillingAddress(address)}
                  />
                }
                <MenuItem
                  primaryText={t("addressBookGrid.edit")}
                  onTouchTap={() => addressBookActions.changeCurrentView("addressBookEdit", i)}
                />
                <MenuItem
                  primaryText={t("addressBookGrid.removeAddress")}
                  onTouchTap={() => addressBookActions.removeAddress(address._id)}
                />
              </IconMenu>
              <div style={styles.innerContainer}>
                <strong>{address.fullName}</strong>
                <p>
                  {`${address.address1} ${address.address2},`}<br/>
                  {`${address.city}, ${address.region} ${address.postal} ${address.country}`}
                  <br/>{address.phone}
                </p>
              </div>
            </Paper>
          );
        })}
      </div>
    );
  }
}

AddressBookGrid.propTypes = {
  addressBook: PropTypes.arrayOf(PropTypes.object),
  addressBookActions: PropTypes.shape({
    removeAddress: PropTypes.func,
    changeCurrentView: PropTypes.func,
    changeShippingAddress: PropTypes.func,
    changeBillingAddress: PropTypes.func
  }).isRequired,
  t: PropTypes.func
};

export default translate(["core", "reaction-react"])(AddressBookGrid);
