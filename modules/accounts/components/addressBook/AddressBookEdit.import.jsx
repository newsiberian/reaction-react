import { _i18n } from "meteor/universe:i18n";
import AddressBookForm from './AddressBookForm';

import React, { Component, PropTypes } from "react";
const T = _i18n.createComponent('reaction.core.addressBookEdit');
const T2 = _i18n.createComponent('reaction.core.app');

/**
 * @class AddressBookEdit
 * @classdesc
 */
export default class AddressBookEdit extends Component {
  render() {
    const {
      thisAddress, countryOptions, onCheckboxChange, onChange, onBlur, onSubmit,
      onCancelClick
    } = this.props;

    console.log('AddressBookEdit...');
    return (
      <div className="ui attached segment">
        <h4 className="ui dividing header">
          <T>editAddress</T>
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
            <button
              className="ui button"
              onClick={ (event) => onCancelClick(event) }
            >
              <T2>cancel</T2>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

AddressBookEdit.propTypes = {
  thisAddress: PropTypes.object.isRequired,
  countryOptions: PropTypes.func.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired
};
