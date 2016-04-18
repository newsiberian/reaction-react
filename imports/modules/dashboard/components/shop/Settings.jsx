import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { Card, CardTitle, CardText } from "material-ui/Card";
import { ActionBarWrapper } from
  "../../../layout/components/ActionBarWrapper.jsx";
import OptionsForm from "./OptionsForm.jsx";
import GeneralForm from "./GenaralForm.jsx";
import AddressForm from "./AddressForm.jsx";
import EmailForm from "./EmailForm.jsx";
import PaymentProvidersForm from "./PaymentProvidersForm.jsx";
import ExternalServicesForm from "./ExternalServicesForm.jsx";
import { styles } from "../../styles/settings";

/**
 * @class Settings
 * @classdesc Core Settings Action Bar
 */
class Settings extends Component {
  render() {
    const {
      t, corePackageData, formsActions, shopData, settingsActions, activeCard
    } = this.props;
    return (
      <div id="shopSettingsAccordion" role="tablist">
        { /* General */ }
        <Card
          expanded={activeCard === "general"}
          initiallyExpanded={true}
          onExpandChange={() => settingsActions.toggleCard("general")}
        >
          <CardTitle
            aria-controls="general"
            aria-expanded="true"
            role="button"
            title={t("shopSettings.general")}
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
            <OptionsForm
              formsActions={formsActions}
              packageId={corePackageData._id}
              allowGuestCheckout={corePackageData.settings.public.
                allowGuestCheckout}
            />
            <GeneralForm
              initialValues={{
                name: shopData.name,
                email: shopData.emails[0].address,
                description: shopData.description,
                keywords: shopData.keywords
              }}
              onSubmit={values => formsActions.submitForm("General", values)}
            />
          </CardText>
        </Card>

        { /* Address */ }
        <Card
          expanded={activeCard === "address"}
          onExpandChange={() => settingsActions.toggleCard("address")}
        >
          <CardTitle
            aria-controls="address"
            aria-expanded="true"
            role="button"
            title={t("shopSettings.address")}
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
            <AddressForm
              initialValues={{
                company: shopData.addressBook[0].company,
                fullName: shopData.addressBook[0].fullName,
                address1: shopData.addressBook[0].address1,
                address2: shopData.addressBook[0].address2,
                city: shopData.addressBook[0].city,
                region: shopData.addressBook[0].region,
                postal: shopData.addressBook[0].postal,
                country: shopData.addressBook[0].country,
                phone: shopData.addressBook[0].phone
              }}
              onSubmit={values => formsActions.submitForm("Address", values)}
            />
          </CardText>
        </Card>

        { /* Email */ }
        <Card
          expanded={activeCard === "email"}
          onExpandChange={() => settingsActions.toggleCard("email")}
        >
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
            <EmailForm
              initialValues={{
                user: corePackageData.settings.mail.user,
                password: corePackageData.settings.mail.password,
                host: corePackageData.settings.mail.host,
                port: corePackageData.settings.mail.port
              }}
              onSubmit={values =>
               formsActions.submitForm("Mail", values, corePackageData._id)}
            />
          </CardText>
        </Card>

        { /* Payment Methods */ }
        <Card
          expanded={activeCard === "paymentMethods"}
          onExpandChange={() => settingsActions.toggleCard("paymentMethods")}
        >
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
            <PaymentProvidersForm
              initialValues={{
                defaultPaymentMethod: shopData.defaultPaymentMethod
              }}
              onSubmit={values => formsActions.submitForm(
                "PaymentProviders", values
              )}
            />
          </CardText>
        </Card>

        { /* External Services */ }
        <Card
          expanded={activeCard === "externalServices"}
          onExpandChange={() => settingsActions.toggleCard("externalServices")}
        >
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
            <ExternalServicesForm
              initialValues={{
                OXRAppId: corePackageData.settings.openexchangerates.appId,
                OXRRefreshPeriod: corePackageData.settings.openexchangerates.
                  refreshPeriod,
                googleClientId: corePackageData.settings.google &&
                 corePackageData.settings.google.clientId,
                googleApiKey: corePackageData.settings.google &&
                 corePackageData.settings.google.apiKey
              }}
              onSubmit={values => formsActions.submitForm(
                "ExternalServices", values, corePackageData._id
              )}
            />
          </CardText>
        </Card>
      </div>
    );
  }
}

Settings.propTypes = {
  activeCard: PropTypes.string,
  corePackageData: PropTypes.object.isRequired,
  formsActions: PropTypes.shape({
    submitForm: PropTypes.func
  }).isRequired,
  settingsActions: PropTypes.shape({
    toggleCard: PropTypes.func
  }).isRequired,
  shopData: PropTypes.object.isRequired,
  t: PropTypes.func
};

const options = {
  title: "admin.settings.shopSettingsLabel"
};

// We need to send t() to HOC to translate title
export default translate("core")(ActionBarWrapper(Settings, options));
