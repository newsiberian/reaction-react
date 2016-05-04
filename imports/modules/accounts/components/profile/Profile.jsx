import React, { Component, PropTypes } from "react";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { Accounts } from "meteor/accounts-base";
import { translate } from "react-i18next";
import { StyleSheet } from "react-look";
import Paper from "material-ui/Paper";
// import DashboardHeader from "../../../dashboard/components/DashboardHeader.jsx";
import Header from "../../../layout/components/Header.jsx";
import ProfileAboutForm from "./ProfileAboutForm.jsx";
import ChangePasswordForm from "./ChangePasswordForm.jsx";
import AddressBookContainer from "../../containers/AddressBookContainer.jsx";
import OrderList from "./OrdersList.jsx";

const c = StyleSheet.combineStyles;
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 1200
  },
  segment: {
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    ":first-child": {
      marginTop: "1rem"
    },
    ":last-child": {
      marginBottom: "1rem"
    }
  },
  innerContainer: {
    margin: "1rem 2rem 1rem 2rem"
  }
});

class Profile extends Component {
  render() {
    const { locale, orders, profileActions, t } = this.props;
    // this won't be reactive. It's ok.
    const account = ReactionCore.Collections.Accounts.findOne({
      _id: Accounts.userId()
    });
    return (
      <div className={c(styles.container, "container-fluid")}>
        <Paper className={styles.segment}>
          <Header label={t("profile.about")} />
          <div className={styles.innerContainer}>
            <ProfileAboutForm
              initialValues={{
                name: account.profile ? account.profile.name : null
              }}
              onSubmit={profileActions.changeProfileFields}
            />
          </div>
        </Paper>
        <Paper className={styles.segment}>
          <Header label={t("accountsUI.changePassword")} />
          <div className={styles.innerContainer}>
            <ChangePasswordForm
              // initialValues={{
              //   name: account.profile ? account.profile.name : null
              // }}
              onSubmit={profileActions.changePassword}
            />
          </div>
        </Paper>
        <Paper className={styles.segment}>
          <Header label={t("accountsUI.yourOrders")} />
          <div className={styles.innerContainer}>
            <OrderList orders={orders} locale={locale} />
          </div>
        </Paper>
        <Paper className={styles.segment}>
          <Header label={t("accountsUI.addressBook")} />
          <div className={styles.innerContainer}>
            <AddressBookContainer />
          </div>
        </Paper>
      </div>
    );
  }
}

Profile.propTypes = {
  locale: PropTypes.shape({
    currency: PropTypes.object,
    language: PropTypes.string,
    locale: PropTypes.object,
    shopCurrency: PropTypes.object
  }).isRequired,
  orders: PropTypes.arrayOf(PropTypes.object),
  profileActions: PropTypes.shape({
    changePassword: PropTypes.func,
    changeProfileFields: PropTypes.func
  }).isRequired,
  t: PropTypes.func
};

export default translate(["core", "reaction-react"])(Profile);
