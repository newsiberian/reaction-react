import Products from "./containers/Products.jsx";
import ProductsGridContainer from "./containers/ProductsGridContainer.jsx";
import ProductDetailContainer from "./containers/ProductDetailContainer.jsx";
import ProductsSettings from "./components/productsGrid/Settings.jsx";

export default {
  path: "/shop",
  component: Products,
  indexRoute: { component: ProductsGridContainer },
  childRoutes: [
    // not sure we need to put this here...
    {
      path: "catalog",
      component: ProductsGridContainer,
      childRoutes: [
        {
          path: "settings",
          component: ProductsSettings
        }
      ]
    },
    // { path: "tag/:_id", component: ProductsContainer },
    { path: "product/:handle(/:variantId)", component: ProductDetailContainer },
  ]
};
