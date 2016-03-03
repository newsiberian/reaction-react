import ProductsGridContainer from "./containers/ProductsGridContainer.jsx";

export default {
  path: "/shop",
  component: ProductsGridContainer,
  // indexRoute: { component: ProductsContainer },
  childRoutes: [
    // { path: "tag/:_id", component: ProductsContainer },
    // { path: "product/:_id", component: ProductDetailContainer }
  ]
};
