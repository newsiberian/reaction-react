import React, { PropTypes } from "react";
import { translate } from "react-i18next/lib";

const styles = {
  container: {
    minHeight: "80vh"
  },
  header: {
    marginTop: "4rem",
    textAlign: "center"
  }
};

const EmptyCheckoutCart = props => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>
        {props.t("cartCheckout.surprise")}&nbsp;
        <small>{props.t("cartCheckout.emptyCheckoutCart")}</small>
      </h1>
    </div>
  );
};

EmptyCheckoutCart.propTypes = {
  t: PropTypes.func
};

export default translate("core")(EmptyCheckoutCart);
