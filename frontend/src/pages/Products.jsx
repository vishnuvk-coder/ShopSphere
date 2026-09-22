import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://shopsphere-zys1.onrender.com/api/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to load products.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="products-page">
      <nav className="navbar">
        <Link to="/" className="logo">
          Shop<span>Sphere</span>
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>

        <Link to="/cart" className="cart-btn">
          🛒 Cart
        </Link>
      </nav>

      <section className="products-page-header">
        <p>SHOPSPHERE STORE</p>
        <h1>All Products</h1>
        <span>Discover products selected for everyday life.</span>
      </section>

      <section className="products-list">
        {loading && <p>Loading products...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && (
          <div className="product-grid">
            {products.map((product) => (
              <div className="product-card" key={product._id}>
                <div className="product-image">{product.emoji}</div>

                <div className="product-info">
                  <small>{product.category}</small>

                  <h3>{product.name}</h3>

                  <p>⭐ {product.rating}</p>

                  <strong>
                    ₹{product.price.toLocaleString("en-IN")}
                  </strong>

                  <Link
                    to={`/product/${product._id}`}
                    className="view-product-btn"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Products;
