import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`https://shopsphere-zys1.onrender.com/api/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Product not found.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        <h2>Loading product...</h2>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        <h1>Product not found</h1>
        <p>The product you are looking for does not exist.</p>

        <Link to="/products" className="primary-btn">
          ← Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <nav className="navbar">
        <Link to="/" className="logo">
          Shop<span>Sphere</span>
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
        </div>

        <Link to="/cart" className="cart-btn">
          🛒 Cart
        </Link>
      </nav>

      <section className="product-details">
        <div className="details-image">
          {product.emoji}
        </div>

        <div className="details-content">
          <small>{product.category}</small>

          <h1>{product.name}</h1>

          <p className="rating">
            ⭐ {product.rating} / 5
          </p>

          <h2>
            ₹{product.price.toLocaleString("en-IN")}
          </h2>

          <p>{product.description}</p>

          <button
  className="primary-btn"
  onClick={() => {
    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = existingCart.find(
      (item) => item._id === product._id
    );

    let updatedCart;

    if (existingProduct) {
      updatedCart = existingCart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [
        ...existingCart,
        {
          ...product,
          quantity: 1
        }
      ];
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    alert(`${product.name} added to cart!`);
  }}
>
  Add to Cart
</button>

          <Link to="/products" className="back-link">
            ← Back to Products
          </Link>
        </div>
      </section>
    </div>
  );
}

export default ProductDetails;
