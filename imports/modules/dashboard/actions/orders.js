import * as types from "../constants";
import { displayAlert } from "../../layout/actions/alert";
import i18next from "i18next";

export const changeOrdersFilter = filter => ({ type: types.CHANGE_ORDER_FILTER, filter });
