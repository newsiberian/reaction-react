import Layout from 'layout';
import Shop from '/modules/products/routes';
import Accounts from '/modules/accounts/routes';

Object.prototype.toString.call(Shop) === '[object Array]' && Shop.push(Accounts);

export default {
  path: '/',
  component: Layout,
  childRoutes: Shop
};

/*{ path: 'accounts',
 component: Accounts,
 childRoutes: [
 { path: '/login', component: ComboBox },
 { path: '/register', component: RegisterBox },
 { path: '/reset_password', component: ResetPasswordBox }
 ]
 }*/
