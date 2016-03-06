import React, { Component, PropTypes } from "react";

const Products = props => <div style={{ flex: "1 1 auto" }}>{props.children}</div>;

Products.propTypes = {
  children: PropTypes.node
};

export default Products;
