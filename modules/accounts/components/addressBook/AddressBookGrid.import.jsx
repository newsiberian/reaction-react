import i18n from '{universe:i18n}';
import { buttonStyles } from '../../styles/addressBookGrid';

const { Component, PropTypes } = React;
const T = i18n.createComponent('reaction.core.addressBookGrid');

/**
 * @class AddressBookGrid
 * @classdesc
 */
export default class AddressBookGrid extends Component {
  render() {
    const { account } = this.props;
    const { addressBook } = account.profile;

    console.log('AddressBookGrid...');
    return (
      <div className="ui attached segment">
        <div>
          <button className="ui basic icon button">
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
        { addressBook.map(address => {
          return (
            <div className="ui segments">
              <div className="ui segment">
                <div
                  className="ui small right floated vertical basic icon buttons"
                  style={ buttonStyles }
                >
                  <div className="ui button">
                    <i className="big edit icon"></i>
                  </div>
                  <div className="ui button">
                    <i className="big trash icon"></i>
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
                  <div className="ui toggle checkbox">
                    <input name="public" type="checkbox" />
                    <label></label>
                  </div>
                </div>
                <div className="ui center aligned blue segment">
                  <div className="ui toggle checkbox">
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
  account: PropTypes.object.isRequired
};
