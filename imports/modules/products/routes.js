import ProductsContainer from "./containers/ProductsContainer.jsx";

/*
FlowRouter.route("/shop", {
    name: "shop",
    action() {
        ReactLayout.render(Layout, {
            content: <ProductsContainer content={ AdminControls } />
            //content2: <AdminControls />
        });
    }
});

FlowRouter.route("/shop/product/:_id/:variant?", {
    name: "product",
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
};*/

// fixme
//export default {
//  path: "/shop",
//  component: ProductsContainer,
//  // indexRoute: { component: ProductsContainer },
//  childRoutes: [
//    // { path: "tag/:_id", component: ProductsContainer },
//    // { path: "product/:_id", component: ProductDetailContainer }
//  ]
//};