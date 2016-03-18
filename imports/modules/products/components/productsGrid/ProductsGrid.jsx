import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import LeftNav from "material-ui/lib/left-nav";
import ProductsGridItem from "./ProductsGridItem.jsx";
//import { styles } from "../../styles/productsGrid"
import { layoutStyles } from "../../../layout/styles/layout";

const styles = {
  container: {
    marginTop: "1rem",
    marginBottom: "1rem",
    marginLeft: "2rem",
    marginRight: "2rem"
  }
};

class ProductsGrid extends Component {
  //generateLayouts(products) {
  //  return {
  //    lg: products.map((product, i) => {
  //      let y = Math.ceil(Math.random() * 4) + 1;
  //      return { x: i * 2 % 12, y: Math.floor(i / 6) * y, w: 2, h: 3, i: product._id };
  //    }),
  //    md: products.map((product, i) => {
  //      let y = Math.ceil(Math.random() * 4) + 1;
  //      return { x: i * 2 % 12, y: Math.floor(i / 6) * y, w: 2, h: 3, i: product._id };
  //    })
  //  };
  //}

  render() {
    // const productsInLine = NUMBERS[4];
    const {
      layoutSettingsActions, products, productActions, selectedProducts
    } = this.props;
    //const products = this.products();
    // const layouts = this.generateLayouts(products);

    // const name = classNames("item", {"active": true});
    // todo добавить sortable для админа
    //console.log("ProductGrid: rendering..."); // layouts={ layouts } _grid={ layouts.lg[index] }
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
      <div>
        <section className="row" style={styles.container}>
          {products.length && products.map(product => (
            <ProductsGridItem
              key={product._id}
              layoutSettingsActions={layoutSettingsActions}
              product={product}
              productActions={productActions}
              selectedProducts={selectedProducts}
            />
          ))}
        </section>
      </div>
    );
  }
}

ProductsGrid.propTypes = {
  layoutSettingsActions: PropTypes.shape({
    openSettings: PropTypes.func,
    closeSettings: PropTypes.func
  }).isRequired,
  products: PropTypes.array.isRequired,
  productActions: PropTypes.shape({
    publishProduct: PropTypes.func,
    selectProduct: PropTypes.func,
    unselectProduct: PropTypes.func,
    flushProductsList: PropTypes.func
  }).isRequired,
  selectedProducts: PropTypes.arrayOf(PropTypes.string)
};

export default translate("core")(ProductsGrid);
