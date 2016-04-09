import * as types from "../constants";
import { displayAlert } from "../../layout/actions/alert";

export const changeCurrentView = currentView => {
  return { type: types.CHANGE_CURRENT_VIEW, currentView };
};
