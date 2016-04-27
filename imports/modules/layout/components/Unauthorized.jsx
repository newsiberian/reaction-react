import React, { PropTypes } from "react";
import { translate } from "react-i18next";
import SignIn from "../../accounts/components/SignIn.jsx";
import FontIcon from "material-ui/FontIcon";

const styles = {
  container: {
    minHeight: "80vh"
  },
  header: {
    fontSize: "2rem",
    marginTop: "2rem"
  },
  icon: {
    fontSize: "4rem"
  }
};

const Unauthorized = props => (
  <section className="row center-xs" style={styles.container}>
    <h1 className="col-xs-10" style={styles.header}>
      <FontIcon
        className="fa fa-exclamation-triangle"
        style={styles.icon}
      />
      <br />
      {props.t("app.warning")}
      {" "}
      {props.t("app.unauthorizedMessage")}
    </h1>
    <figure>
      <SignIn
        login={props.accountsActions.login}
        prevPath={props.location.state.prevPath}
        showOauth={false}
      />
    </figure>
  </section>
);


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
