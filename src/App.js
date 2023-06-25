import React from "react";
import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { productsReducer } from "./redux/reducers/productsReducer";
import Products from "./components/Products";

const store = configureStore(
  {
    reducer: { products: productsReducer },
  },
  applyMiddleware(thunk)
);

function App() {
  return (
    <Provider store={store}>
      <Products />
    </Provider>
  );
}

export default App;
