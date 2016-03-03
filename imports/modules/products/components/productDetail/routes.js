import ProductDetailContainer from '../../containers/ProductDetailContainer';

export default {
  path: '/shop/product/:_id',
  component: ProductDetailContainer,
  // indexRoute: { component: ProductsContainer },
  childRoutes: [
   // { path: 'tag/:_id', component: ProductsContainer },
   // { path: ':variantId', component: ProductDetailContainer }
  ]
};