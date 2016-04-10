import React, { PropTypes } from "react";
import { translate } from "react-i18next/lib";

const CheckoutLoggedIn = props => {
  return (
    <div className="ui attached segment">
      <h3 className="ui header" style={{ padding: "1rem" }}>
        {props.t("checkoutLogin.welcome")}
      </h3>
    </div>
  );
};

CheckoutLoggedIn.propTypes = {
  t: PropTypes.func
};

export default translate("core")(CheckoutLoggedIn);
