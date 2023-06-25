import { inintialState } from "../initialState";

export const productsReducer = (state = inintialState, action) => {
  switch (action.type) {
    case "FETCHPRODUCTS":
      return [...action.payload];
    default:
      return state;
  }
};
