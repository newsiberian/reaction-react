import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { StyleSheet } from "react-look";
import Helmet from "react-helmet";
import Paper from "material-ui/lib/paper";

const c = StyleSheet.combineStyles;
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "80vh",
    maxWidth: 1200
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
    const { order, t } = this.props;
    debugger;
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
        {!Boolean(order.email) &&
          <Paper></Paper>
        }
      </div>
    );
  }
}

Completed.propTypes = {
  order: PropTypes.object.isRequired,
  t: PropTypes.func
};

export default translate(["core", "reaction-react"])(Completed);
