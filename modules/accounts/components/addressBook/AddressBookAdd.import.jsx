import { _i18n } from "meteor/universe:i18n";
import AddressBookForm from './AddressBookForm';

import React, { Component, PropTypes } from "react";
const T = _i18n.createComponent('reaction.core.addressBookAdd');
const T2 = _i18n.createComponent('reaction.core.app');

/**
 * @class AddressBookAdd
 * @classdesc
 */
export default class AddressBookAdd extends Component {
  render() {
    const {
      addressBook, thisAddress, countryOptions, onCheckboxChange, onChange,
      onBlur, onSubmit, onCancelClick
    } = this.props;
    const hasAddressBookEntries = addressBook.length > 0;

    console.log('AddressBookAdd...');
    return (
      <div className="ui attached segment">
        <h4 className="ui dividing header">
          { hasAddressBookEntries ? <T>addAddress</T> : <T>createAddress</T> }
        </h4>
        <form className="ui form" onSubmit={ event => onSubmit(event) }>
          <AddressBookForm
            thisAddress={ thisAddress }
            countryOptions={ countryOptions }
            onCheckboxChange={ onCheckboxChange }
            onChange={ onChange }
            onBlur={ onBlur }
          />
          <div className="field">
            <button type="submit" className="ui primary button">
              <T2>saveAndContinue</T2>
            </button>
            { hasAddressBookEntries &&
              <button
                className="ui button"
                onClick={ (event) => onCancelClick(event) }
              >
                <T2>cancel</T2>
              </button>
            }
          </div>
        </form>
      </div>
    );
  }
}

AddressBookAdd.propTypes = {
  addressBook: PropTypes.array.isRequired,
  thisAddress: PropTypes.object.isRequired,
  countryOptions: PropTypes.func.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired
};
