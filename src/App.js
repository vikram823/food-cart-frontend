import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Nav } from "./components";
import { Home, ProductsPage, Cart, SingleProduct } from "./pages";
import { CartContext } from "./CartContext";
import { useState, useEffect } from "react";

function App(props) {
  const [cart, setCart] = useState({});

  useEffect(() => {
    const cart = window.localStorage.getItem("cart");
    setCart(JSON.parse(cart));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <Router>
        <CartContext.Provider value={{ cart, setCart }}>
          <Nav />
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/products" exact component={ProductsPage}></Route>
            <Route
              path="/products/:_id"
              exact
              component={SingleProduct}
            ></Route>
            <Route path="/cart" exact component={Cart}></Route>
          </Switch>
        </CartContext.Provider>
      </Router>
    </>
  );
}

export default App;
