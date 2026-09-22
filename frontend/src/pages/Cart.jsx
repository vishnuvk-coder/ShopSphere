import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Cart() {
  const [cart, setCart] = useState([]);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);
  }, []);

  const updateQuantity = (id, change) => {
    const updatedCart = cart
      .map((item) => {
        if (item._id === id) {
          return {
            ...item,
            quantity: item.quantity + change
          };
        }

        return item;
      })
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter(
      (item) => item._id !== id
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ========================================
  // CHECKOUT
  // ========================================

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      setCheckoutLoading(true);

      const orderItems = cart.map((item) => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }));

      const response = await axios.post(
        "https://shopsphere-zys1.onrender.com/api/orders",
        {
          items: orderItems,
          totalAmount: total
        }
      );

      console.log("Order created:", response.data);

      // Clear cart
      localStorage.removeItem("cart");
      setCart([]);

      alert(
        "Order placed successfully! 🎉"
      );
    } catch (error) {
      console.error("Checkout error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to place order. Please try again."
      );
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <div>
      {/* Navbar */}

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

      {/* Cart Page */}

      <section className="cart-page">
        <p className="hero-tag">SHOPPING CART</p>

        <h1>Your Cart</h1>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <div>🛒</div>

            <h2>Your cart is empty</h2>

            <p>
              Add some products to your cart and they
              will appear here.
            </p>

            <Link
              to="/products"
              className="primary-btn"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="cart-container">

            {/* Cart Items */}

            <div className="cart-items">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="cart-item"
                >
                  <div className="cart-item-image">
                    {item.emoji}
                  </div>

                  <div className="cart-item-info">
                    <small>
                      {item.category}
                    </small>

                    <h3>{item.name}</h3>

                    <p>
                      ₹
                      {item.price.toLocaleString(
                        "en-IN"
                      )}
                    </p>

                    {/* Quantity */}

                    <div className="quantity-controls">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item._id,
                            -1
                          )
                        }
                      >
                        −
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(
                            item._id,
                            1
                          )
                        }
                      >
                        +
                      </button>
                    </div>

                    {/* Remove */}

                    <button
                      className="remove-btn"
                      onClick={() =>
                        removeItem(item._id)
                      }
                    >
                      Remove
                    </button>
                  </div>

                  {/* Item Total */}

                  <div className="item-total">
                    ₹
                    {(
                      item.price *
                      item.quantity
                    ).toLocaleString("en-IN")}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}

            <div className="cart-summary">
              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Items</span>

                <span>
                  {cart.reduce(
                    (sum, item) =>
                      sum + item.quantity,
                    0
                  )}
                </span>
              </div>

              <div className="summary-row">
                <span>Subtotal</span>

                <span>
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="summary-row total-row">
                <strong>Total</strong>

                <strong>
                  ₹{total.toLocaleString("en-IN")}
                </strong>
              </div>

              {/* Checkout */}

              <button
                className="primary-btn checkout-btn"
                onClick={handleCheckout}
                disabled={checkoutLoading}
              >
                {checkoutLoading
                  ? "Processing..."
                  : "Proceed to Checkout"}
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Cart;
