import CheckoutContainer from "./containers/CheckoutContainer";
import CompletedContainer from "./containers/CompletedContainer";

export default {
  path: "/cart",
  indexRoute: { component: CheckoutContainer },
  childRoutes: [
    {
      path: "checkout",
      component: CheckoutContainer
    },
    {
      path: "completed/:_id",
      component: CompletedContainer
    }
  ]
};
