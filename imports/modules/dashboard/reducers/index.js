import { combineReducers } from "redux";
import { ReactionCore } from "meteor/reactioncommerce:core";
//import { hasDashboardAccess } from "../../../client/main";
import forms from "./forms";
import packages from "./packages";
import settings from "./settings";

let dashboardReducer;
// TODO uncomment this after ReactionCOre become exported
if (ReactionCore.hasDashboardAccess()) {
  dashboardReducer = combineReducers({
    forms,
    packages,
    //packages: {
    //  accounts: {},
    //  core: {
    //    settings: {
    //      addressForm: {},
    //      emailForm: {},
    //      externalServicesForm: {},
    //      GuestCheckoutForm: {},
    //      LocalizationForm: {},
    //      PaymentMethodsForm: {}
    //    }
    //  },
    //  orders: {}
    //},
    settings
  });
} else {
  // we don't need to add dashboard reducers for non admin
  dashboardReducer = {};
}

export default dashboardReducer;
