import axios from "axios";

export const fetchProducts = (data) => {
  return {
    type: "FETCHPRODUCTS",
    payload: data,
  };
};

export const thunkAction = () => {
  return (dispatch) => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => dispatch(fetchProducts(response.data.products)));
  };
};
