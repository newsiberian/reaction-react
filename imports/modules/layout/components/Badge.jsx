import React, { PropTypes } from "react";
import look, { StyleSheet } from "react-look";

const c = StyleSheet.combineStyles;
// taken from: http://mdbootstrap.com/components/badges/
const styles = StyleSheet.create({
  badge: {
    background: props => {
      return props.backgroundColor ? props.backgroundColor : "#4285f4";
    },
    color: props => {
      return props.color ? props.color : "#fff";
    },
    boxSizing: "border-box",
    borderRadius: 2,
    fontSize: "0.8rem",
    fontWeight: 300,
    minWidth: "3rem",
    padding: "0 6px",
    textAlign: "center"
  }
});

const Badge = props => {
  let className;
  if (props.style) {
    // FIXME: this have a bug. This is not apply `style` immediately, but only after
    // page reload
    className = c(styles.badge, StyleSheet.create(props.style));
  } else {
    className = styles.badge;
  }
  return <span className={className}>{props.badgeContent}</span>;
};

Badge.propTypes = {
  badgeContent: PropTypes.node,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  style: PropTypes.object
};

export default look(Badge);
