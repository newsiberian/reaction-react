// import { Component } from '{react}'
// import ReactMixin from '/myPackages/react-mixin'
// import { ResponsiveReactGridLayout } from '{universe:react-grid-layout}'
// import {ReactGridLayout} from '{universe:react-grid-layout}'
// import { Responsive as ResponsiveReactGridLayout } from '/myPackages/react-grid-layout'
// import Radium from '/myPackages/radium'
// import { styles } from '../../styles/productGrid'
import ProductGridItem from './ProductGridItem';

const { Component, PropTypes } = React;
const { Products } = ReactionCore.Collections;

// We can't use Radium in combo with ResponsiveReactGridLayout
// @Radium
/**
 * @class ProductGrid
 */
export default class ProductGrid extends Component {
	/**
	 * @summary this method is a clean copy from Template.productGrid.helpers
	 * @return {Array}
	 */
  products() {
    /*
     * take natural sort, sorting by updatedAt
     * then resort using positions.position for this tag
     * retaining natural sort of untouched items
     */
    let hashtags;
    let newRelatedTags;
    let position;
    let relatedTags;

    // function to compare and sort position
    function compare(a, b) {
      if (a.position.position === b.position.position) {
        let x = a.position.updatedAt;
        let y = b.position.updatedAt;

        if (x > y) {
          return -1;
        } else if (x < y) {
          return 1;
        }

        return 0;
      }
      return a.position.position - b.position.position;
    }

    // todo что в данном случае будет this. разобраться с этим. this возникает,
    // если мы заходим через маршрут /tag/
    let tag = this.tag && this._id;
    let selector = {};

    if (tag) {
      hashtags = [];
      relatedTags = [tag];
      while (relatedTags.length) {
        newRelatedTags = [];
        for (let relatedTag of relatedTags) {
          if (hashtags.indexOf(relatedTag._id) === -1) {
            hashtags.push(relatedTag._id);
          }
        }
        relatedTags = newRelatedTags;
      }
      selector.hashtags = {
        $in: hashtags
      };
    }

    let gridProducts = Products.find(selector).fetch();

    for (let index in gridProducts) {
      if ({}.hasOwnProperty.call(gridProducts, index)) {
        let gridProduct = gridProducts[index];
        if (gridProduct.positions) {
          let _results = [];
          for (position of gridProduct.positions) {
            if (position.tag === ReactionCore.getCurrentTag(
                this.props.location,
                this.props.params
              )) {
              _results.push(position);
            }
            gridProducts[index].position = _results[0];
          }
        }
        if (!gridProduct.position) {
          gridProducts[index].position = {
            position: 0,
            weight: 0,
            pinned: false,
            updatedAt: gridProduct.updatedAt
          };
        }
      }
    }

    return gridProducts.sort(compare);
  }

  generateLayouts(products) {
    return {
      lg: products.map((product, i) => {
        let y = Math.ceil(Math.random() * 4) + 1;
        return { x: i * 2 % 12, y: Math.floor(i / 6) * y, w: 2, h: 3, i: product._id };
      }),
      md: products.map((product, i) => {
        let y = Math.ceil(Math.random() * 4) + 1;
        return { x: i * 2 % 12, y: Math.floor(i / 6) * y, w: 2, h: 3, i: product._id };
      })
    };
  }

  render() {
    const productsInLine = NUMBERS[4];
    const products = this.products();
    const layouts = this.generateLayouts(products);

    // const name = classNames('item', {'active': true});
    // todo добавить sortable для админа
    console.log('ProductGrid: rendering...'); // layouts={ layouts } _grid={ layouts.lg[index] }
    /*return (
      <Responsive className="layout"
       breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
       cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
       rowHeight={30}>
        <div key={1} _grid={{x: 0, y: 0, w: 1, h: 2}}>1</div>
        <div key={2} _grid={{x: 1, y: 0, w: 1, h: 2}}>2</div>
        <div key={3} _grid={{x: 2, y: 0, w: 1, h: 2}}>3</div>
      </Responsive>
    );*/
    /*return (
      <ResponsiveReactGridLayout
        className="layout"
        layouts={ layouts }
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        isResizable={ false }
      >
        { /!*products.map((product) => {
          return <ProductGridItem
            key={ product._id }
            data={ product }
            />
        })*!/ }
        { products.map((product) => {
          return <div key={ product._id }><ProductGridItem data={ product }/></div>;
        }) }
      </ResponsiveReactGridLayout>
    );*/
    return (
      // class="product-grid-list list-unstyled"
      <div className={ `ui ${ productsInLine } cards` }>
        { products.map((product) => {
          return <ProductGridItem key={ product._id } data={ product } />;
        }) }
      </div>
    );
  }
}

ProductGrid.propTypes = {
  location: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};

const NUMBERS = {
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six'
};
