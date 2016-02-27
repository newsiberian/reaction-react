import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import SignIn from "../../accounts/components/SignIn.jsx";

const styles = {
  header: {
    marginTop: "1rem"
  }
};

const Unauthorized = props => {
  const { accountsActions, location, t } = props;
  return (
    <section>
      <div className="row center-xs">
        <h1 className="col-xs-6" style={styles.header}>
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
      </div>
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
