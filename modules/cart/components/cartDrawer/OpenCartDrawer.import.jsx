import i18n from '{universe:i18n}';
import CartSubTotals from './CartSubTotals';
import CartDrawerItem from './CartDrawerItem';
import Slider from '{universe:carousel}';
import { openCartStyles as styles } from '../../styles/cartDrawer';

const T = i18n.createComponent('reaction.core.cartDrawer');
const { Component, PropTypes } = React;
const { Link } = ReactRouter;

/**
 * @class OpenCartDrawer
 * @classdesc
 */
export default class OpenCartDrawer extends Component {
  componentDidMount() {
    const elem = document.getElementsByClassName('slick-track');
    if (elem[0] instanceof HTMLDivElement) {
      elem[0].classList.add('ui');
      elem[0].classList.add('cards');
    }
  }

  render() {
    const { cart, media } = this.props;
    const settings = {
      adaptiveHeight: false,
      arrows: false,
      // className: 'ui cards',
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4, // todo calculate this number
      slidesToScroll: 4,
      swipe: true,
      swipeToSlide: true,
      vertical: false
    };
    console.log('OpenCartDrawer rendering...'); //  className="ui cards"
    return (
      <div>
        <Slider { ...settings }>
          <CartSubTotals cart={ cart }/>
          { cart.items.map(item => {
            return (
              <CartDrawerItem
                key={ item._id }
                item={ item }
                media={ media }
              />
            );
          }) }
        </Slider>
        <Link
          to="/shop"
          query={ 1 }
          className="ui green fluid large button"
          onClick={ console.log() }
        >
          <T>checkout</T>
        </Link>
      </div>
    );
  }
}

OpenCartDrawer.propTypes = {
  cart: PropTypes.object.isRequired,
  media: PropTypes.func.isRequired
};
