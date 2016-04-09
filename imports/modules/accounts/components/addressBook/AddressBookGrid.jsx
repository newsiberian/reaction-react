
// import { buttonStyles } from '../../styles/addressBookGrid';

import React, { Component, PropTypes } from "react";
// const T = _i18n.createComponent('reaction.core.addressBookGrid');

/**
 * @class AddressBookGrid
 * @classdesc
 */
export default class AddressBookGrid extends Component {
  render() {
    const {
      addressBook, onAddAddressClick, onEditAddressClick,
      onRemoveAddressClick, onSelectShippingAddressChange,
      onSelectBillingAddressChange
    } = this.props;

    console.log('AddressBookGrid...');
    return (
      <div className="ui attached segment">
        <div>
          <button
            className="ui basic icon button"
            onClick={ () => onAddAddressClick() }
          >
            <i className="plus icon"></i>
            <T>addAddress</T>
          </button>
        </div>
        <div className="ui clearing divider"></div>
        <div className="ui basic segment">
          <h4 className="ui left floated green header">
            <T>selectShippingAddress</T>
          </h4>
          <h4 className="ui right floated blue header">
            <T>selectBillingAddress</T>
          </h4>
        </div>
        { addressBook.map((address, i) => {
          return (
            <div key={ i } className="ui segments">
              <div className="ui segment">
                <div
                  className="ui small right floated vertical basic icon buttons"
                  style={ buttonStyles }
                >
                  <div
                    className="ui button"
                    onClick={ () => onEditAddressClick(i) }
                  >
                    <i className="large edit icon"></i>
                  </div>
                  <div
                    className="ui button"
                    onClick={ () => onRemoveAddressClick(address._id) }
                  >
                    <i className="large trash icon"></i>
                  </div>
                </div>
                <strong>{ address.fullName }</strong>
                <p>
                  { `${ address.address1 } ${ address.address2 },` }<br/>
                  { `${ address.city }, ${ address.region } ${ address.postal
                    } ${ address.country }` }
                  <br/>{ address.phone }
                </p>
              </div>
              <div className="ui horizontal segments">
                <div className="ui center aligned green segment">
                  <div
                    className="ui toggle checkbox"
                    onChange={ onSelectShippingAddressChange }
                  >
                    <input name="public" type="checkbox" />
                    <label></label>
                  </div>
                </div>
                <div className="ui center aligned blue segment">
                  <div
                    className="ui toggle checkbox"
                    onChange={ onSelectBillingAddressChange }
                  >
                    <input name="public" type="checkbox" />
                    <label></label>
                  </div>
                </div>
              </div>
              {/*<div className="ui two bottom attached basic buttons">
                <div className="ui basic button">One</div>
                <div className="ui basic button">Two</div>
              </div>*/}
            </div>
          );
        }) }
      </div>
    );
  }
}

AddressBookGrid.propTypes = {
  addressBook: PropTypes.array.isRequired,
  onAddAddressClick: PropTypes.func.isRequired,
  onEditAddressClick: PropTypes.func.isRequired,
  onRemoveAddressClick: PropTypes.func.isRequired,
  onSelectShippingAddressChange: PropTypes.func.isRequired,
  onSelectBillingAddressChange: PropTypes.func.isRequired
};
