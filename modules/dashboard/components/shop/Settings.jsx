import { Component, PropTypes } from "react";
// import { _i18n } from "meteor/universe:i18n";
import { translate } from "react-i18next/lib";
import { Card, CardTitle, CardText, CardActions } from "material-ui/lib/card";
import FlatButton from "material-ui/lib/flat-button";
import { ActionBarWrapper } from
  "../../../layout/components/ActionBarWrapper.jsx";
// todo uncomment after 1.3 release
//import MRF from "meteor/nicolaslopezj:mrf";
import GuestCheckoutForm from "./GuestCheckoutForm.jsx";
import GeneralForm from "./GenaralForm.jsx";
import AddressForm from "./AddressForm.jsx";
import EmailForm from "./EmailForm.jsx";
import LocalizationForm from "./LocalizationForm.jsx";
import PaymentMethodsForm from "./PaymentMethodsForm.jsx";

const styles = {
  base: {},
  cardText: {
    paddingLeft: 20,
    paddingRight: 20
  },
  title: {
    fontSize: 18 // title size
  }
};

/**
 * @class Settings
 * @classdesc
 */
class Settings extends Component {
  getPackageData() {
    return ReactionCore.Collections.Packages.findOne({
      name: "core"
    });
  }

  render() {
    const { t } = this.props;
    return (
      <div
        id={"shopSettingsAccordion"}
        role={"tablist"}
      >
        { /* General */ }
        <Card
          initiallyExpanded={true}
        >
          <CardTitle
            aria-controls="general"
            aria-expanded="true"
            role="button"
            title={t("shopSettings.general")}
            //title={_i18n.__("reaction.core.shopSettings.general")}
            //subtitle="Subtitle"
            actAsExpander={true}
            showExpandableButton={true}
            titleStyle={styles.title}
          />
          <CardText
            id="general"
            role="tabpanel"
            aria-labelledby="general"
            expandable={true}
            style={styles.cardText}
          >
            <GuestCheckoutForm />
            <GeneralForm />
            {/*<MRF.Form
              collection={ReactionCore.Collections.Packages}
              type="update"
              ref="form"
              doc={this.getPackageData()}
            />*/}
          </CardText>
        </Card>
        { /* Address */ }
        <Card>
          <CardTitle
            aria-controls="address"
            aria-expanded="true"
            role="button"
            title={t("shopSettings.address")}
            //title={_i18n.__("reaction.core.shopSettings.address")}
            //subtitle="Subtitle"
            actAsExpander={true}
            showExpandableButton={true}
            titleStyle={styles.title}
          />
          <CardText
            id="address"
            role="tabpanel"
            aria-labelledby="address"
            expandable={true}
            style={styles.cardText}
          >
            <AddressForm />
          </CardText>
        </Card>
        { /* Email */ }
        <Card>
          <CardTitle
            aria-controls="email"
            aria-expanded="true"
            role="button"
            title={t("shopSettings.mail")}
            actAsExpander={true}
            showExpandableButton={true}
            titleStyle={styles.title}
          />
          <CardText
            id="email"
            role="tabpanel"
            aria-labelledby="email"
            expandable={true}
            style={styles.cardText}
          >
            <EmailForm />
          </CardText>
        </Card>
        { /* Localization */ }
        <Card>
          <CardTitle
            aria-controls="localization"
            aria-expanded="true"
            role="button"
            title={t("shopSettings.localization")}
            actAsExpander={true}
            showExpandableButton={true}
            titleStyle={styles.title}
          />
          <CardText
            id="localization"
            role="tabpanel"
            aria-labelledby="localization"
            expandable={true}
            style={styles.cardText}
          >
            <LocalizationForm />
          </CardText>
        </Card>
        { /* Payment Methods */ }
        <Card>
          <CardTitle
            aria-controls="paymentMethods"
            aria-expanded="true"
            role="button"
            title={t("shopSettings.paymentMethods")}
            actAsExpander={true}
            showExpandableButton={true}
            titleStyle={styles.title}
          />
          <CardText
            id="paymentMethods"
            role="tabpanel"
            aria-labelledby="paymentMethods"
            expandable={true}
            style={styles.cardText}
          >
            <PaymentMethodsForm />
          </CardText>
        </Card>
        { /* External Services */ }
        <Card>
          <CardTitle
            aria-controls="externalServices"
            aria-expanded="true"
            role="button"
            title={t("shopSettings.options")}
            actAsExpander={true}
            showExpandableButton={true}
            titleStyle={styles.title}
          />
          <CardText
            id="paymentMethods"
            role="tabpanel"
            aria-labelledby="paymentMethods"
            expandable={true}
            style={styles.cardText}
          >
            <PaymentMethodsForm />
          </CardText>
        </Card>
      </div>
    );
  }
}

Settings.propTypes = {

};

const options = {
  title: "app.shopSettings"
};

// We need to send t() to HOC to translate title
export default translate("core")(ActionBarWrapper(Settings, options));
