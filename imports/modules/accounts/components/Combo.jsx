import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import SignIn from "./SignIn.jsx";
import SignUp from "./SignUp.jsx";

const styles = {
  base: {
    // height: "80vh", // moved to upper component
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    alignContent: "flex-start",
    textAlign: "center"
  },
  header: {
    height: "20vh",
    backgroundColor: "#d39b85",
    flex: "1 1 100%"
  },
  signIn: {
    //display: "flex",
    //flexDirection: "column"
    marginTop: "-3rem"
  },
  signUp: {
    //display: "flex",
    //flexDirection: "column"
    marginTop: "-3rem"
  },
  all: {
    flex: "1 1 100%"
  }

};

/**
 * @class Combo
 * @classdesc
 */
class Combo extends Component {
  render() {
    const { accountsActions, prevPath, t } = this.props;
    return (
      <section style={Object.assign(styles.base)}>
        <header style={styles.header}>
          {t("Site name")}
        </header>
        <SignIn
          login={accountsActions.login}
          loginWithService={accountsActions.loginWithService}
          prevPath={prevPath}
          styles={styles.signIn}
        />
        <SignUp
          createUser={accountsActions.createUser}
          prevPath={prevPath}
          styles={styles.signUp}
        />
      </section>
    );
  }
}

Combo.propTypes = {
  accountsActions: PropTypes.shape({
    createUser: PropTypes.func,
    login: PropTypes.func,
    loginWithService: PropTypes.func,
    logout: PropTypes.func
  }).isRequired,
  //alertActions: PropTypes.shape({
  //  displayAlert: PropTypes.func
  //}).isRequired,
  //routerActions: PropTypes.object.isRequired,
  prevPath: PropTypes.string.isRequired,
  t: PropTypes.func
};

export default translate("core")(Combo);
