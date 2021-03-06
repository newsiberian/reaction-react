import React, { Component, PropTypes } from "react";
// import { translate } from "react-i18next";
// import LeftNav from "material-ui/lib/left-nav";
import ProductsGridItem from "./ProductsGridItem.jsx";
// import { styles } from "../../styles/productsGrid"
import { layoutStyles } from "../../../layout/styles/layout";
import SidebarButton from "../../../layout/components/SidebarButton.jsx";
import TagsNavContainer from "../../../tags/containers/TagsNavContainer.jsx";

const styles = {
  container: {
    marginTop: "1rem",
    marginBottom: "1rem",
    marginLeft: "2rem",
    marginRight: "2rem",
    flex: "1 1 auto"
  }
};

class ProductsGrid extends Component {
  render() {
    const {
      layoutSettingsActions, locale, params, products, productActions,
      selectedProducts, tagsActions, location
    } = this.props;

    console.log("ProductGrid: rendering...");
    return (
      <div style={layoutStyles.parent}>
        {/* Tags menu toggle button */}
        <SidebarButton handleClick={tagsActions.toggleTagsNav} />
        <TagsNavContainer location={location} />

        <section className="row" style={styles.container}>
          {products.length && products.map(product => (
            <ProductsGridItem
              key={product._id}
              layoutSettingsActions={layoutSettingsActions}
              locale={locale}
              location={location}
              params={params}
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
  locale: PropTypes.shape({
    currency: PropTypes.object,
    language: PropTypes.string,
    locale: PropTypes.object,
    shopCurrency: PropTypes.object
  }).isRequired,
  location: PropTypes.object.isRequired,
  params: PropTypes.shape({
    slug: PropTypes.string
  }).isRequired,
  products: PropTypes.array.isRequired,
  productActions: PropTypes.shape({
    publishProduct: PropTypes.func,
    selectProduct: PropTypes.func,
    unselectProduct: PropTypes.func,
    flushProductsList: PropTypes.func
  }).isRequired,
  selectedProducts: PropTypes.arrayOf(PropTypes.string),
  tagsActions: PropTypes.shape({
    toggleTagsNav: PropTypes.func
  }).isRequired
};

export default ProductsGrid;
