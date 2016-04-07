import AccountsContainer from "./containers/AccountsContainer";
import ProfileContainer from "./containers/ProfileContainer";
import Combo from "./components/Combo";

export default {
  path: "account",
  component: AccountsContainer,
  childRoutes: [
    { path: "/login", component: Combo },
    //{ path: "/register", component: RegisterBox },
    //{ path: "/reset_password", component: ResetPasswordBox }
    { path: "profile", component: ProfileContainer }
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
