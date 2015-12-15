import i18n from '{universe:i18n}';

const { Component, PropTypes } = React;
const T = i18n.createComponent('reaction.core.address');

/**
 * @class AddressBookForm
 * @classdesc
 */
export default class AddressBookForm extends Component {
  render() {
    const { thisAddress, countryOptions, onCheckboxChange,
      onChange, onBlur } = this.props;
    return (
      <div className="field">
        <div className="eight wide field">
          <label><T>country</T></label>
          <select
            className="ui dropdown"
            name="country"
            value={ thisAddress.country || 'def' }
            onChange={ event => onChange(event) }
          >
            <option value="def">
              { i18n.__('reaction.core.address.selectOne') }
            </option>
            { countryOptions().map(country => {
              return (
                <option
                  key={ country.value }
                  value={ country.value }
                >
                  { country.label }
                </option>
                );
            }) }
          </select>
        </div>
        <div className="eight wide field">
          <label><T>fullName</T></label>
          <input
            type="text"
            name="fullName"
            placeholder={ i18n.__('reaction.core.address.fullName') }
            value={ thisAddress.fullName }
            onChange={ event => onChange(event) }
            onBlur={ event => onBlur(event) }
          />
        </div>
        <div className="two fields">
          <div className="field">
            <label><T>address1</T></label>
            <input
              type="text"
              name="address1"
              placeholder={ i18n.__('reaction.core.address.address1') }
              value={ thisAddress.address1 }
              onChange={ event => onChange(event) }
              onBlur={ event => onBlur(event) }
            />
          </div>
          <div className="field">
            <label><T>address2</T></label>
            <input
              type="text"
              name="address2"
              placeholder={ i18n.__('reaction.core.address.address2') }
              value={ thisAddress.address2 }
              onChange={ event => onChange(event) }
              onBlur={ event => onBlur(event) }
            />
          </div>
        </div>
        <div className="three fields">
          <div className="field">
            <label><T>postal</T></label>
            <input
              type="text"
              name="postal"
              placeholder={ i18n.__('reaction.core.address.postal') }
              value={ thisAddress.postal }
              onChange={ event => onChange(event) }
              onBlur={ event => onBlur(event) }
            />
          </div>
          <div className="field">
            <label><T>city</T></label>
            <input
              type="text"
              name="city"
              placeholder={ i18n.__('reaction.core.address.city') }
              value={ thisAddress.city }
              onChange={ event => onChange(event) }
              onBlur={ event => onBlur(event) }
            />
          </div>
          <div className="field">
            <label><T>region</T></label>
            <input
              type="text"
              name="region"
              placeholder={ i18n.__('reaction.core.address.region') }
              value={ thisAddress.region }
              onChange={ event => onChange(event) }
              onBlur={ event => onBlur(event) }
            />
          </div>
        </div>
        <div className="six wide field">
          <label><T>phone</T></label>
          <input
            type="text"
            name="phone"
            placeholder={ i18n.__('reaction.core.address.phone') }
            value={ thisAddress.phone }
            onChange={ event => onChange(event) }
            onBlur={ event => onBlur(event) }
          />
        </div>
        <div className="ui segment">
          <div className="inline field">
            <div className="ui checkbox">
              <input
                id="isShippingDefault"
                className="hidden"
                tabIndex="0"
                type="checkbox"
                checked={ thisAddress.isShippingDefault }
                onChange={ () => onCheckboxChange('isShippingDefault') }
              />
                <label htmlFor="isShippingDefault">
                  <T>isShippingDefault</T>
                </label>
            </div>
          </div>
          <div className="inline field">
            <div className="ui checkbox">
              <input
                id="isBillingDefault"
                className="hidden"
                tabIndex="1"
                type="checkbox"
                checked={ thisAddress.isBillingDefault }
                onChange={ () => onCheckboxChange('isBillingDefault') }
              />
              <label htmlFor="isBillingDefault"><T>isBillingDefault</T></label>
            </div>
          </div>
          <div className="inline field">
            <div className="ui checkbox">
              <input
                id="isCommercial"
                className="hidden"
                tabIndex="2"
                type="checkbox"
                checked={ thisAddress.isCommercial }
                onChange={ () => onCheckboxChange('isCommercial') }
              />
              <label htmlFor="isCommercial"><T>isCommercial</T></label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddressBookForm.propTypes = {
  thisAddress: PropTypes.object.isRequired,
  countryOptions: PropTypes.func.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired
};
