import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Nav } from "./components";
import { Home, ProductsPage, Cart, SingleProduct } from "./pages";
import { CartContext } from "./CartContext";
import { useState, useEffect } from "react";
import { getCart, storeCart } from "./helper";

function App() {
  const [cart, setCart] = useState({});

  useEffect(() => {
    getCart().then((cart) => {
      setCart(JSON.parse(cart));
    });
  }, []);

  useEffect(() => {
    storeCart(cart);
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
