import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { StyleSheet } from "react-look";

const c = StyleSheet.combineStyles;
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "80vh",
    maxWidth: 1200
  }
});

class Completed extends Component {
  render() {
    const { order, t } = this.props;
    return (
      <div className={c(styles.container, "container-fluid")}>
        <h3>{t("cartCompleted.thankYou")}</h3>
        <p>
          {t("cartCompleted.yourOrderIsNow")}
          &nbsp;
          {orderStatus}
        </p>
      </div>
    );
  }
}

Completed.propTypes = {
  t: PropTypes.func
};

export default translate(["core", "reaction-react"])(Completed);
