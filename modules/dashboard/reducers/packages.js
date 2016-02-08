import * as types from "../constants/grid";

export default function packages(state = [], action) {
  switch (action.type) {
  case types.GET_PACKAGES:
    return state;
  default:
    return state;
  }
}
