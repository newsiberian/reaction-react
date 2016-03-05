import { combineReducers } from "redux";
import product from "./product";
import productsGrid from "./productsGrid";

const shopReducer = combineReducers({
  product,
  productsGrid
});

export default shopReducer;
