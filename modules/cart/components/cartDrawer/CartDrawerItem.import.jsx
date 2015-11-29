import { checkObjectFitSupported } from '/common/helpers/utilities';
import {
  fakeImage, linkStyles, primatyImage, realImage
} from '../../styles/cartDrawerItem';

const { Component, PropTypes } = React;
const { Link } = ReactRouter;

/**
 * @class CartDrawerItems
 * @classdesc
 */
export default class CartDrawerItem extends Component {
  render() {
    let image;
    const { item, media: getMedia } = this.props;
    const media = getMedia(item);
    const isObjectFitSupported = checkObjectFitSupported();

    if (isObjectFitSupported) {
      if (media instanceof FS.File) {
        image = <img style={ realImage } src={ media.url({ store: 'small' }) } alt={ media.name() } />;
      } else {
        image = <img style={ realImage } src="resources/placeholder.gif" alt="" />;
      }
    } else {
      if (media instanceof FS.File) {
        // todo looks like this is a wrong way to get media store from FS.File
        image = <div style={ [fakeImage, { backgroundImage: `url(${media.url({ store: 'small' })})` }] }></div>;
      } else {
        image = <div style={ [fakeImage, { backgroundImage: 'url(resources/placeholder.gif)' }] }></div>;
      }
    }

    console.log('CartDrawerItem rendering...');
    return (
      <div className="ui card">
        <Link
          className="image"
          to={ `/shop/product/` }
          style={ linkStyles }
        >
          <div style={ primatyImage }>
            { image }
          </div>
        </Link>
      </div>
    );
  }
}

CartDrawerItem.propTypes = {
  item: PropTypes.object.isRequired,
  media: PropTypes.func.isRequired
};
