import React, { Component, PropTypes } from "react";

const Products = props => <div>{props.children}</div>;

Products.propTypes = {
  children: PropTypes.node
};

export default Products;
