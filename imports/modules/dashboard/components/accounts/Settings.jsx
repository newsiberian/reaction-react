import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import { Card, CardTitle, CardText } from "material-ui/Card";
import FontIcon from "material-ui/FontIcon";
import Toggle from "material-ui/Toggle";
import { ActionBarWrapper } from
  "../../../layout/components/ActionBarWrapper.jsx";
import ServiceForm from "./ServiceForm.jsx";
import { styles } from "../../styles/settings";

const iconStyles = {
  fontSize: 18
};

/**
 * getInitialValues
 * @summary build an object `initialValues` to redux-form
 * @param {Object} service
 * @return {Object} `initialValues`
 */
const getInitialValues = service => {
  const values = {};
  service.fields && service.fields.forEach(field => {
    values[field.property] = service[field.property] || "";
  });
  return values;
};

/**
 * getFields
 * @summary build an object `values` to redux-form
 * @param {Object} service
 * @return {Object} `values`
 */
const getFields = service => {
  return service.fields && service.fields.map(field => field.property);
};

/**
 * @class Settings
 * @classdesc
 */
class Settings extends Component {
  handleSubmit(name, values) {
    this.props.oauthServicesActions.submitForm(name, values);
  }

  renderTitle(name) {
    const { t } = this.props;
    return (
      <div>
        <FontIcon
          className={`fa fa-${name === "ok" ? "odnoklassniki" : name}`}
          style={iconStyles}
        />
        {" " + t("accountsUI.signInService",
          { service: t(`social.${name}`) })}
      </div>
    );
  }

  render() {
    const { oauthServicesActions, services } = this.props;
    return (
      <div id="accountsSettingsAccordion" role="tablist">
        {services.map((service, index) => {
          const enabled = service.enabled ? service.enabled : false;
          return (
            <Card
              key={index}
              initiallyExpanded={enabled}
              onExpandChange={
                () => oauthServicesActions.toggleOauthService(service)
              }
            >
              <CardTitle
                aria-controls={service.name}
                aria-expanded="true"
                role="button"
                title={
                  <Toggle
                    toggled={enabled}
                    label={this.renderTitle(service.name)}
                  />
                }
                actAsExpander={true}
                titleStyle={styles.title}
              />
              <CardText
                id={service.name}
                role="tabpanel"
                aria-labelledby={service.name}
                expandable={true}
                style={styles.cardText}
              >
                <ServiceForm
                  initialValues={getInitialValues(service)}
                  fields={getFields(service)}
                  formKey={service.name}
                  service={service}
                  onSubmit={values => this.handleSubmit(service.name, values)}
                />
              </CardText>
            </Card>
          );
        })}
      </div>
    );
  }
}

Settings.propTypes = {
  oauthServicesActions: PropTypes.shape({
    toggleOauthService: PropTypes.func,
    submitForm: PropTypes.func
  }).isRequired,
  services: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired
};

const options = {
  title: "admin.settings.accountSettingsLabel"
};

export default translate("core")(ActionBarWrapper(Settings, options));
