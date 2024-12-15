import React, { useState } from "react";
import { useGetProductsQuery } from "../redux/ProductsSlice";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";

const ProductList = () => {
  const { data: productsData, error, isLoading } = useGetProductsQuery();
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load products...</p>;

  const products = productsData?.products || [];
  const filteredProducts = products.filter((product) => {
    const matchesTitle = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDescription = product.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const withinPriceRange =
      product.price >= priceRange.min && product.price <= priceRange.max;
    return (matchesTitle || matchesDescription) && withinPriceRange;
  });

  return (
    <div className="product-list">
      <h2>Product List</h2>
      <div className="search-filters">
        <input
          type="text"
          placeholder="search by title or description"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="price-filter">
          <label>Min Price: </label>
          <input
            type="number"
            placeholder="search by price range"
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange({ ...priceRange, min: parseFloat(e.target.value) })
            }
          />
          <label>Max price:</label>
          <input
            type="number"
            placeholder="search by price range"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange({ ...priceRange, max: parseFloat(e.target.value) })
            }
          />
        </div>
      </div>

      <ul className="product-card">
        {filteredProducts.map((product) => (
          <li key={product.id}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button
              onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}
            >
              Add to Cart
            </button>
            <Link to={`/products/${product.id}`}>View Detail</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ProductList;
