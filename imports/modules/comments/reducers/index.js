import { combineReducers } from "redux";
import commentEditor from "./commentEditor";
//import productsGrid from "./productsGrid";

const commentsReducer = combineReducers({
  commentEditor,
  // productsGrid
});

export default commentsReducer;
