import ProductsContainer from "./containers/ProductsContainer.jsx";

// fixme
export default {
  path: "/shop",
  component: ProductsContainer,
  // indexRoute: { component: ProductsContainer },
  childRoutes: [
    // { path: "tag/:_id", component: ProductsContainer },
    // { path: "product/:_id", component: ProductDetailContainer }
  ]
};
