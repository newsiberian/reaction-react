import * as types from "../constants";

// export default function topVariants(state = {}, action) {
//   switch (action.type) {
//   case types.GET_TOP_VARIANTS:
//     return Object.assign({}, state, action.variants);
//   case types.ADD_TOP_VARIANT:
//     return Object.assign({}, state, {
//       [action.variantId]: {
//         visible: false
//       }
//     });
//   case types.REMOVE_TOP_VARIANT:
//     return
//   case types.CHANGE_VARIANT_FORM_VISIBILITY:
//     return Object.assign({}, state, {
//       [action.variantId]: {
//         visible: !state[action.variantId].visible
//       }
//     });
//   default:
//     return state;
//   }
// }

export default function topVariantsArray(state = [], action) {
  switch (action.type) {
  case types.GET_TOP_VARIANTS:
    return [
      ...state,
      ...action.variants
    ];
  case types.ADD_TOP_VARIANT:
    return [
      ...state,
      {
        _id: action.variantId,
        visible: false
      }
    ];
  case types.REMOVE_TOP_VARIANT:
    return state.filter(variant => variant._id !== action.variantId);
  case types.CHANGE_VARIANT_FORM_VISIBILITY:
    return state.map(variant => variant._id === action.variantId ?
      Object.assign({}, variant, { visible: !variant.visible }) :
      variant);
  default:
    return state;
  }
}
