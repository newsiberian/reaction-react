import React, { PropTypes } from "react";
import { Link } from "react-router";

/**
 * @function ProductDetailTags
 * @description Stateless Functional Component which renders tag labels
 * for end-user
 */
const ProductDetailTags = ({ tags }) => (
  <div>
    <div className="ui horizontal list">
      {tags.map((tag) => (
        <div /*className="item"*/>
          <Link
            //className="ui large label"
            to={`/shop/product/tag/${ tag.slug }`}
          >
            {tag.name}
          </Link>
        </div>
      ))}
    </div>
  </div>
);

ProductDetailTags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ProductDetailTags;
