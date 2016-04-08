import React, { Component, PropTypes } from "react";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { Accounts } from "meteor/accounts-base";
import { translate } from "react-i18next/lib";
import { StyleSheet } from "react-look";
import Paper from "material-ui/lib/paper";
import DashboardHeader from "../../../dashboard/components/DashboardHeader.jsx";
import ProfileAboutForm from "./ProfileAboutForm.jsx";
import ChangePasswordForm from "./ChangePasswordForm.jsx";

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
    const { profileActions, t } = this.props;
    // this won't be reactive. It's ok.
    const account = ReactionCore.Collections.Accounts.findOne({
      _id: Accounts.userId()
    });
    return (
      <div className={c(styles.container, "container-fluid")}>
        <Paper className={styles.segment}>
          <DashboardHeader title={t("profile.about")} />
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
          <DashboardHeader title={t("accountsUI.changePassword")} />
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
          <DashboardHeader title={t("accountsUI.yourOrders")} />
          <div className={styles.innerContainer}>
            {"TODO: implement this component"}
          </div>
        </Paper>
        <Paper className={styles.segment}>
          <DashboardHeader title={t("accountsUI.addressBook")} />
          <div className={styles.innerContainer}>
            {"TODO: implement this component"}
          </div>
        </Paper>
      </div>
    );
  }
}

Profile.propTypes = {
  profileActions: PropTypes.shape({
    changePassword: PropTypes.func,
    changeProfileFields: PropTypes.func
  }).isRequired,
  t: PropTypes.func
};

export default translate(["core", "reaction-react"])(Profile);
