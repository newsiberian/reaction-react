import React, { PropTypes } from "react";
import { translate } from "react-i18next";

const CheckoutLoggedIn = props => {
  return (
    <div style={{ padding: "1rem 1rem 1rem 2rem" }}>
      <h3>{props.t("checkoutLogin.welcome")}</h3>
    </div>
  );
};

CheckoutLoggedIn.propTypes = {
  t: PropTypes.func
};

export default translate("core")(CheckoutLoggedIn);
