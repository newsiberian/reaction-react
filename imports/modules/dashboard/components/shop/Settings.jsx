import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { Card, CardTitle, CardText } from "material-ui/lib/card";
import { ActionBarWrapper } from
  "../../../layout/components/ActionBarWrapper.jsx";
import OptionsForm from "./OptionsForm.jsx";
import GeneralForm from "./GenaralForm.jsx";
import AddressForm from "./AddressForm.jsx";
import EmailForm from "./EmailForm.jsx";
import LocalizationForm from "./LocalizationForm.jsx";
import PaymentProvidersForm from "./PaymentProvidersForm.jsx";
import ExternalServicesForm from "./ExternalServicesForm.jsx";
import { styles } from "../../styles/settings";

/**
 * @class Settings
 * @classdesc Core Settings Action Bar
 */
class Settings extends Component {
  getPackageData() {
    return ReactionCore.Collections.Packages.findOne({ name: "core" }, {
      fields: {
        "settings.public.allowGuestCheckout": 1,
        "settings.mail": 1,
        "settings.openexchangerates": 1,
        "settings.google": 1
      }
    });
  }

  getShopData() {
    return ReactionCore.Collections.Shops.findOne({}, {
      fields: {
        "addressBook": 1,
        "name": 1,
        "emails.0.address": 1,
        "description": 1,
        "keywords": 1,
        "timezone": 1,
        "currency": 1,
        "baseUOM": 1,
        "defaultPaymentMethod": 1
      }
    });
  }

  //handleExpandChange(expanded) {
  //  console.log(expanded);
  //}

  render() {
    const { t, corePackageData, formsActions, shopData } = this.props;
    return (
      <div id="shopSettingsAccordion" role="tablist">
        { /* General */ }
        <Card
          //expanded={this.state.expanded}
          initiallyExpanded={true}
          //onExpandChange={this.handleExpandChange}
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
              //initialValues={{
              //  allowGuestCheckout: corePackageData.settings.public.
              //    allowGuestCheckout
              //}}
              //onSubmit={values => formsActions.submitForm("General", values)}
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
        <Card>
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
            <LocalizationForm
              initialValues={{
                timezone: shopData.timezone,
                currency: shopData.currency,
                baseUOM: shopData.baseUOM
              }}
              onSubmit={values => formsActions.submitForm(
                "Localization", values
              )}
            />
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
  corePackageData: PropTypes.object.isRequired,
  formsActions: PropTypes.shape({
    submitForm: PropTypes.func
  }).isRequired,
  shopData: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

const options = {
  title: "admin.settings.shopSettingsLabel"
};

// We need to send t() to HOC to translate title
export default translate("core")(ActionBarWrapper(Settings, options));
