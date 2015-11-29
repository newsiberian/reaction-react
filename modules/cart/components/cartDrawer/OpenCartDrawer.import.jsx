import i18n from '{universe:i18n}';
import CartSubTotals from './CartSubTotals';
import CartDrawerItem from './CartDrawerItem';
import { openCartStyles as styles } from '../../styles/cartDrawer';

const T = i18n.createComponent('reaction.core.cartDrawer');
const { Component, PropTypes } = React;
const { Link } = ReactRouter;

/**
 * @class OpenCartDrawer
 * @classdesc
 */
export default class OpenCartDrawer extends Component {
  render() {
    const { cart, media, swiperOptions, swiperIsInitialized } = this.props;

    console.log('OpenCartDrawer rendering...');
    return (
      <div>
        <div>
          <SwiperComponent
            className="ui cards"
            options={ swiperOptions }
            swiperIsInitialized={ swiperIsInitialized }
          >
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
          </SwiperComponent>
        </div>
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
  media: PropTypes.func.isRequired,
  swiperOptions: PropTypes.object,
  swiperIsInitialized: PropTypes.func
};
