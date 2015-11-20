import Layout from 'layout';
import Shop from '/modules/products/routes';
import Accounts from '/modules/accounts/routes';
import ProductDetail from '/modules/products/components/productDetail/routes';

export default {
  path: '/',
  component: Layout,
  childRoutes: [
    Accounts,
    Shop,
    ProductDetail
  ]
};
