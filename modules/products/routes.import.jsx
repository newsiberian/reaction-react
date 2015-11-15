import Layout from 'layout'
import ProductsContainer from './containers/ProductsContainer'
import ProductDetailContainer from './containers/ProductDetailContainer'
//import Unauthorized from './../layout/components/notice/Unauthorized'
import AdminControls from '/modules/layout/containers/AdminControls'

FlowRouter.route('/shop', {
    name: 'shop',
    action() {
        ReactLayout.render(Layout, {
            content: <ProductsContainer content={ AdminControls } />
            //content2: <AdminControls />
        });
    }
});

FlowRouter.route('/shop/product/:_id/:variant?', {
    name: 'product',
    action(params) {
        ReactLayout.render(Layout, {
            // todo: we can use FlowRouter.getParam(FlowRouter.current()) instead of
            // pushing params as props
            content: <ProductDetailContainer params={ params } />
        });
    }
});

FlowRouter.notFound = {
    action() {
        ReactLayout.render(Layout);
    }
};