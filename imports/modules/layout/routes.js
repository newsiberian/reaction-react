import Layout from "./containers/CoreLayout.jsx";
// import Shop from "../products/routes";
// import Accounts from "../accounts/routes";
import Dashboard from "../dashboard/routes";
// import ProductDetail from "../products/components/productDetail/routes";
// import Checkout from "/modules/checkout/routes";


// fixme
export default {
  path: "/",
  component: Layout,
  childRoutes: [
    Dashboard
    // Accounts,
    // Shop,
    // ProductDetail,
    // Checkout
  ]
};
