import i18n from '{universe:i18n}';

const { Component, PropTypes } = React;
const T = i18n.createComponent('reaction.core.address');

/**
 * @class AddressBookForm
 * @classdesc
 */
export default class AddressBookForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="field">
        <div className="eight wide field">
          <label><T>country</T></label>

        </div>
        <div className="eight wide field">
          <label><T>fullName</T></label>
          <input
            type="text"
            placeholder={ i18n.__('reaction.core.address.fullName') }
          />
        </div>
        <div className="two fields">
          <div className="field">
            <label><T>address1</T></label>
            <input
              type="text"
              placeholder={ i18n.__('reaction.core.address.address1') }
            />
          </div>
          <div className="field">
            <label><T>address2</T></label>
            <input
              type="text"
              placeholder={ i18n.__('reaction.core.address.address2') }
            />
          </div>
        </div>
        <div className="three fields">
          <div className="field">
            <label><T>postal</T></label>
            <input
              type="text"
              placeholder={ i18n.__('reaction.core.address.postal') }
            />
          </div>
          <div className="field">
            <label><T>city</T></label>
            <input
              type="text"
              placeholder={ i18n.__('reaction.core.address.city') }
            />
          </div>
          <div className="field">
            <label><T>region</T></label>
            <input
              type="text"
              placeholder={ i18n.__('reaction.core.address.region') }
            />
          </div>
        </div>
        <div className="six wide field">
          <label><T>phone</T></label>
          <input
            type="text"
            placeholder={ i18n.__('reaction.core.address.phone') }
          />
        </div>
        <div className="ui segment">
          <div className="inline field">
            <div className="ui checkbox">
              <input className="hidden" tabIndex="0" type="checkbox" />
                <label><T>isShippingDefault</T></label>
            </div>
          </div>
          <div className="inline field">
            <div className="ui checkbox">
              <input className="hidden" tabIndex="1" type="checkbox" />
              <label><T>isBillingDefault</T></label>
            </div>
          </div>
          <div className="inline field">
            <div className="ui checkbox">
              <input className="hidden" tabIndex="2" type="checkbox" />
              <label><T>isCommercial</T></label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddressBookForm.propTypes = {};
