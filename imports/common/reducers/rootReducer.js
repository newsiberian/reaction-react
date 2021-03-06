import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import { combineReducers } from "redux";
import layout from "../../modules/layout/reducers";
import account from "../../modules/accounts/reducers";
import dashboard from "../../modules/dashboard/reducers";
import shop from "../../modules/products/reducers";
import cart from "../../modules/cart/reducers";
import checkout from "../../modules/checkout/reducers";
import comments from "../../modules/comments/reducers";
import shipping from "../../modules/shipping/reducers";
import tags from "../../modules/tags/reducers";

const rootReducer = combineReducers({
  layout,
  account,
  dashboard,
  shop,
  cart,
  checkout,
  comments,
  shipping,
  tags,
  form: formReducer,
  routing: routerReducer
});

export default rootReducer;
