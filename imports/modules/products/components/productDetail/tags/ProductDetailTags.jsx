import { Link } from "react-router";

/**
 * @function ProductDetailTags
 * @description Stateless Functional Component which renders tag labels
 * for end-user
 */
export default ({ tags }) => (
  <div>
    <div className="ui horizontal list">
      { tags.map((tag) => {
        return (
          <div className="item">
            <Link
              className="ui large label"
              to={ `/shop/product/tag/${ tag.slug }` }
            >
              { tag.name }
            </Link>
          </div>
        );
      }) }
    </div>
  </div>
);
