import * as types from "../constants";

export default function forms(state = {}, action) {
  switch (action.type) {
  case types.LOAD:
    return {
      data: action.data
    };
  default:
    return state;
  }
}
