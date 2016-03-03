import React, { PropTypes } from "react";
import { translate } from "react-i18next/lib";
import SignIn from "../../accounts/components/SignIn.jsx";
import FontIcon from "material-ui/lib/font-icon";

const styles = {
  header: {
    fontSize: "2rem",
    marginTop: "2rem"
  },
  icon: {
    fontSize: "4rem"
  }
};

const Unauthorized = props => {
  const { accountsActions, location, t } = props;
  return (
    <section className="row center-xs">
      <h1 className="col-xs-10" style={styles.header}>
        <FontIcon
          className="fa fa-exclamation-triangle"
          style={styles.icon}
        />
        <br />
        {t("app.warning")}
        {" "}
        {t("app.unauthorizedMessage")}
      </h1>
      <figure>
        <SignIn
          login={accountsActions.login}
          prevPath={location.state.prevPath}
          showOauth={false}
        />
      </figure>
    </section>
  );
};

Unauthorized.propTypes = {
  accountsActions: PropTypes.shape({
    login: PropTypes.func
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.object
  }).isRequired,
  t: PropTypes.func.isRequired
};

export default translate("core")(Unauthorized);