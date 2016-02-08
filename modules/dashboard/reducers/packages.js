import * as types from "../constants";

export default function packages(state = [], action) {
  switch (action.type) {
  case types.GET_PACKAGES:
    return [
      {
        label: action.label,
        enabled: action.enabled
      },
      ...state
    ];
  default:
    return state;
  }
}
