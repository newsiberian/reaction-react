import React, { PropTypes } from "react";
import { StyleSheet } from "react-look";

const c = StyleSheet.combineStyles;
const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    minHeight: 80,
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e6e6e6",
    paddingLeft: "1rem"
  },
  label: {
    fontSize: "1.17em",
    fontWeight: 600
  }

});

const Header = props => {
  return (
    <header className={c(styles.container, StyleSheet.create(props.style || {}))}>
      {Boolean(props.children) && props.children}
      <span className={c(styles.label, StyleSheet.create(props.labelStyle || {}))}>
        {props.label}
      </span>
    </header>
  );
};

Header.propTypes = {
  children: PropTypes.node, // could be icon
  label: PropTypes.node,
  labelStyle: PropTypes.object, // label styles
  style: PropTypes.object // container styles
};

export default Header;

