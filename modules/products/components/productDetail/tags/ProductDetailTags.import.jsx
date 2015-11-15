/**
 * @classdesc ProductDetailTags
 */
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
            <a
              className="ui large label"
              href={ FlowRouter.path('/product/tag', { _id: tag.slug }) }
            >
              { tag.name }
            </a>
          </div>
        );
      }) }
    </div>
  </div>
);
