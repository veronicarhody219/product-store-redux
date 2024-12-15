import "./App.css";
import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "./context/ThemeContext";
import { store } from "./redux/store";
import ThemedLayout from "./components/ThemedLayout";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import CartLink from "./components/CartLink";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <Provider store={store}>
          <ThemedLayout>
            <Router>
              <nav>
                <Link to="/">Products</Link> | <CartLink />
              </nav>
              <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </Router>
          </ThemedLayout>
        </Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
