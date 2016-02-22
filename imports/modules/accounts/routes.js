import AccountsContainer from "./containers/AccountsContainer.jsx";
import Combo from "./components/Combo.jsx";

export default {
  path: "accounts",
  component: AccountsContainer,
  childRoutes: [
    { path: "/login", component: Combo },
    //{ path: "/register", component: RegisterBox },
    //{ path: "/reset_password", component: ResetPasswordBox }
  ]
};

//if (Meteor.isClient) {
//  let lastLoggedInUserId = Meteor.userId();
//  Tracker.autorun(() => {
//    if (Meteor.userId() !== lastLoggedInUserId) {
//      lastLoggedInUserId = Meteor.userId();
//      // this will execute after login/logout/relogin without hot push side-effects
//      // FlowRouter.go("shop");
//    }
//  });
//}
