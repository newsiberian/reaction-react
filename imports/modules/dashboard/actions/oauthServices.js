import * as types from "../constants";
import { displayAlert } from "../../layout/actions/alert";
import { ReactionServiceHelper } from "../../../client/helpers/utilities";
import i18next from "i18next";

export const toggleOauthService  = service => {
  return dispatch => {
    const enabled = service.enabled ? service.enabled : false;
    const fields = [{
      property: "enabled",
      value: !enabled
    }];
    Meteor.call("accounts/updateServiceConfiguration", service.name, fields,
      (error, result) => {
        dispatch({
          type: types.TOGGLE_OAUTH_SERVICE,
          name: service.label,
          enabled: result && result.numberAffected === 1 ? !enabled : enabled
        });
      });
  };
};

export const submitForm = (service, values) => {
  return dispatch => {
    const serviceHelper = new ReactionServiceHelper();
    let fields = serviceHelper.configFieldsForService(service);
    const niceName = serviceHelper.capitalizedServiceName(service);

    for (let field of fields) {
      field.value = values[field.property];
    }

    Meteor.call("accounts/updateServiceConfiguration", service, fields,
      (error, result) => {
        if (result) {
          dispatch(displayAlert({
            message: i18next.t(
              "accountsUI.updatedServiceConfiguration",
              { service: i18next.t(`social.${service}`) }
            )
          }));
        }
        dispatch({ type: types.SUBMIT_OAUTH_SERVICE_FORM, name: service });
      }
    );
  };
};
