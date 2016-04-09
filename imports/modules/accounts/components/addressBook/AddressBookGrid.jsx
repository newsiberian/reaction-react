import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import Badge from "../../../layout/components/Badge.jsx";
import Divider from "material-ui/lib/divider";
import FlatButton from "material-ui/lib/flat-button";
import IconButton from "material-ui/lib/icon-button";
import IconMenu from "material-ui/lib/menus/icon-menu";
import MenuItem from "material-ui/lib/menus/menu-item";
import MoreVertIcon from "material-ui/lib/svg-icons/navigation/more-vert";
import Paper from "material-ui/lib/paper";
import Subheader from "material-ui/lib/Subheader";
import { buttonStyles } from "../../styles/addressBookGrid";

const styles = {
  address: {
    padding: "1rem",
    position: "relative"
  },
  menu: {
    position: "absolute",
    top: 0,
    right: 0
  },
  dividerGlobal: {
    marginTop: "1rem"
  },
  divider: {
    marginLeft: "-1rem",
    marginRight: "-1rem"
  },
  badges: {
    position: "absolute",
    top: 0,
    right: "2rem",
    padding: 12
  },
  shippingBadge: {
    marginRight: 4
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
    // const {
    //   addressBook, onAddAddressClick, onEditAddressClick,
    //   onRemoveAddressClick, onSelectShippingAddressChange,
    //   onSelectBillingAddressChange
    // } = this.props;
    const { addressBook, addressBookActions, t } = this.props;

    console.log("AddressBookGrid...");
    return (
      <div>
        <FlatButton
          label={t("addressBookGrid.addAddress")}
        />
        <Divider style={styles.dividerGlobal} />
        <div className="ui basic segment">
          <h4 className="ui left floated green header">
            {t("addressBookGrid.selectShippingAddress")}
          </h4>
          <h4 className="ui right floated blue header">
            {t("addressBookGrid.selectBillingAddress")}
          </h4>
        </div>
        {Boolean(addressBook.length) && addressBook.map((address, i) => {
          return (
            <Paper key={i} zDepth={2} style={styles.address}>
              {Boolean(address.isShippingDefault || address.isBillingDefault) &&
                <div style={styles.badges}>
                  {address.isShippingDefault &&
                    <Badge
                      badgeContent={t("addressBook.shippingAddress")}
                      style={address.isBillingDefault ? styles.shippingBadge : {}}
                    />
                  }
                  {address.isBillingDefault &&
                    <Badge
                      badgeContent={t("addressBook.billingAddress")}
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
                <MenuItem
                  primaryText={t("addressBookGrid.edit")}
                  onItemTouchTap={() =>
                    addressBookActions.changeCurrentView("addressBookEdit")}
                />
                <MenuItem
                  primaryText={t("addressBookGrid.removeAddress")}
                  onItemTouchTap={() =>
                    addressBookActions.removeAddress(address._id)}
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
              <Divider style={styles.divider} />
              <div className="ui horizontal segments">
                <FlatButton
                  label={t("app.saveChanges")}
                  style={styles.button}
                />
                <FlatButton
                  label={t("app.saveChanges")}
                  style={styles.button}
                />
                {/*<div className="ui center aligned green segment">
                  <div
                    className="ui toggle checkbox"
                    // onChange={ onSelectShippingAddressChange }
                  >
                    <input name="public" type="checkbox" />
                    <label></label>
                  </div>
                </div>
                <div className="ui center aligned blue segment">
                  <div
                    className="ui toggle checkbox"
                    // onChange={ onSelectBillingAddressChange }
                  >
                    <input name="public" type="checkbox" />
                    <label></label>
                  </div>
                </div>*/}
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
    changeCurrentView: PropTypes.func
  }).isRequired,
  t: PropTypes.func
  // addressBook: PropTypes.array.isRequired,
  // onAddAddressClick: PropTypes.func.isRequired,
  // onEditAddressClick: PropTypes.func.isRequired,
  // onRemoveAddressClick: PropTypes.func.isRequired,
  // onSelectShippingAddressChange: PropTypes.func.isRequired,
  // onSelectBillingAddressChange: PropTypes.func.isRequired
};

export default translate(["core", "reaction-react"])(AddressBookGrid);
