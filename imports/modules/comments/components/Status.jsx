import React, { PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { StyleSheet } from "react-look";

const c = StyleSheet.combineStyles;
const styles = StyleSheet.create({
  label: {
    display: "inline-block",
    lineHeight: 1,
    verticalAlign: "baseline",
    margin: "0 .14285714em",
    padding: ".5833em .833em",
    textTransform: "none",
    fontWeight: 700,
    fontSize: 10,
    border: "0 solid transparent",
    borderRadius: ".28571429rem",
    color: "#fff"
  },
  new: {
    backgroundColor: "#975b33",
    borderColor: "#975b33"
  },
  approved: {
    backgroundColor: "#009c95",
    borderColor: "#009c95"
  }
});

const Status = ({ status, t }) => (
  <span
    className={status === "new" ? c(styles.label, styles.new) :
     c(styles.label, styles.approved)}
  >
    {t(`comments.ui.${status}`)}
  </span>
);

Status.propTypes = {
  status: PropTypes.string.isRequired,
  t: PropTypes.func
};

export default translate("reaction-react")(Status);
