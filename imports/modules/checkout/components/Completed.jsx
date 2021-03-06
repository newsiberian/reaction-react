import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { StyleSheet } from "react-look";
import Helmet from "react-helmet";
import Paper from "material-ui/Paper";
import GuestEmailForm from "./GuestEmailForm.jsx";

const c = StyleSheet.combineStyles;
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "80vh",
    maxWidth: 1200
  },
  paper: {
    padding: "1rem"
  }
});

const getOrderStatus = order => {
  if (order.workflow.status === "new") {
    return "cartCompleted.submitted";
  }
  return `cartCompleted.${order.workflow.status}`;
};

class Completed extends Component {
  render() {
    const { checkoutActions, order, t } = this.props;
    return (
      <div className={c(styles.container, "container-fluid")}>
        <Helmet
          title={t("pageTitles.yourOrder")}
          titleTemplate={`${ReactionCore.getShopName()} • ${t("pageTitles.yourOrder")}`}
          meta={[
            {charset: "utf-8"}
          ]}
        />
        <h2>{t("cartCompleted.thankYou")}</h2>
        <p>
          {t("cartCompleted.yourOrderIsNow")}
          {t(getOrderStatus(order))}
          {"."}
        </p>
        {!Boolean(order.email) ?
          <Paper className={styles.paper}>
            <p>{t("cartCompleted.registerGuest")}</p>
            <GuestEmailForm
              onSubmit={values => checkoutActions.addOrderEmail(order.cartId, values.email)}
            />
          </Paper> :
          `${t("cartCompleted.trackYourDelivery")} ${order.email}`
        }
      </div>
    );
  }
}

Completed.propTypes = {
  checkoutActions: PropTypes.shape({
    addOrderEmail: PropTypes.func
  }).isRequired,
  order: PropTypes.object.isRequired,
  t: PropTypes.func
};

export default translate(["core", "reaction-react"])(Completed);
