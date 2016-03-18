import React, { PropTypes } from "react";
import { Link } from "react-router";
import { StyleSheet } from "react-look";

// fixme: switch to material-chips then they'll be ready
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "flex-start",
    alignContent: "space-around"
  },
  chip: {
    height: 32,
    fontSize: 13,
    fontWeight: 500,
    color: "rgba(0,0,0,0.6)",
    lineHeight: "32px",
    padding: "0 12px",
    borderRadius: 16,
    backgroundColor: "#e4e4e4",
    textDecoration: "none",
    margin: 3
  }
});

/**
 * @function ProductDetailTags
 * @description Renders tag labels for end-user
 */
const ProductDetailTags = ({ tags }) => (
  <div className={styles.container}>
    {tags.map((tag) => (
      <Link
        key={tag._id}
        className={styles.chip}
        to={`/shop/product/tag/${ tag.slug }`}
      >
        {tag.name}
      </Link>
    ))}
  </div>
);

ProductDetailTags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ProductDetailTags;
