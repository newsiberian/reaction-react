import React, { Component, PropTypes } from "react";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { Accounts } from "meteor/accounts-base";
import { translate } from "react-i18next/lib";
import { StyleSheet } from "react-look";
import Paper from "material-ui/lib/paper";
import DashboardHeader from "../../../dashboard/components/DashboardHeader.jsx";
import ProfileAboutForm from "./ProfileAboutForm.jsx";

const c = StyleSheet.combineStyles;
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 1200
  },
  segment: {
    marginTop: "1rem",
    marginBottom: "1rem",
    ":first-child": {
      marginTop: "2rem"
    },
    ":last-child": {
      marginBottom: "2rem"
    }
  },
  innerContainer: {
    margin: "1rem 2rem 1rem 2rem"
  }
});

class Profile extends Component {
  render() {
    const { profileActions, t } = this.props;
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
        </Paper>
        <Paper className={styles.segment}>
          <DashboardHeader title={t("accountsUI.yourOrders")} />
        </Paper>
        <Paper className={styles.segment}>
          <DashboardHeader title={t("accountsUI.addressBook")} />
        </Paper>
      </div>
    );
  }
}

Profile.propTypes = {
  profileActions: PropTypes.shape({
    changeProfileFields: PropTypes.func
  }).isRequired,
  t: PropTypes.func
};

export default translate(["core", "reaction-react"])(Profile);
