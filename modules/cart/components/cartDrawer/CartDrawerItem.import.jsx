import { checkObjectFitSupported } from "/common/helpers/utilities";
import {
  fakeImage, primaryImage, realImage, titleStyles, removeButtonStyle,
  removeButtonIconStyle
} from "../../styles/cartDrawerItem";
import { cardStyles } from "../../styles/cartDrawer";

const { Component, PropTypes } = React;
const { Link } = ReactRouter;

/**
 * @class CartDrawerItems
 * @classdesc
 */
export default class CartDrawerItem extends Component {
  render() {
    let image;
    const { item, media: getMedia, onRemoveCartItemClick } = this.props;
    const media = getMedia(item);
    const isObjectFitSupported = checkObjectFitSupported();

    if (isObjectFitSupported) {
      if (media instanceof FS.File) {
        image = (
          <img
            style={ realImage }
            src={ media.url({ store: "small" }) }
            alt={ media.name() }
          />
        );
      } else {
        image = (
          <img style={ realImage } src="resources/placeholder.gif" alt="" />
        );
      }
    } else {
      if (media instanceof FS.File) {
        // todo looks like this is a wrong way to get media store from FS.File
        image = <div style={ [fakeImage, { backgroundImage: `url(${media.url({ store: "small" })})` }] }></div>;
      } else {
        image = <div style={ [fakeImage, { backgroundImage: "url(resources/placeholder.gif)" }] }></div>;
      }
    }
// style={ linkStyles }
    console.log("CartDrawerItem rendering...");
    return (
      <div className="ui card" style={ cardStyles }>
        <div className="image" style={ primaryImage }>
          { image }
        </div>
        <button
          className="ui basic brown circular icon button"
          onClick={ () => onRemoveCartItemClick(item._id) }
          style={ removeButtonStyle }
        >
          <i className="big remove icon" style={ removeButtonIconStyle }></i>
        </button>
        <div className="center aligned content" style={ titleStyles }>
          <Link to={ `/shop/product/` }>
            <span className="ui grey circular label">{ item.quantity }</span>
            <span>{ item.variants.title }</span>
          </Link>
        </div>
      </div>
    );
  }
}

CartDrawerItem.propTypes = {
  item: PropTypes.object.isRequired,
  media: PropTypes.func.isRequired,
  onRemoveCartItemClick: PropTypes.func.isRequired
};
