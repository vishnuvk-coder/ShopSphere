import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Admin() {
  const emptyForm = {
    name: "",
    category: "",
    price: "",
    rating: "",
    description: "",
    emoji: "🛍️"
  };

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  // ========================================
  // LOAD DASHBOARD
  // ========================================

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const [productsResponse, ordersResponse] =
        await Promise.all([
          axios.get("https://shopsphere-zys1.onrender.com/api/products"),
          axios.get("https://shopsphere-zys1.onrender.com/api/orders")
        ]);

      setProducts(productsResponse.data);
      setOrders(ordersResponse.data);
    } catch (error) {
      console.error("Dashboard error:", error);

      setError("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // FORM HANDLING
  // ========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value
    });
  };

  // ========================================
  // OPEN ADD FORM
  // ========================================

  const openAddForm = () => {
    setEditingId(null);

    setForm({
      ...emptyForm
    });

    setShowForm(true);
  };

  // ========================================
  // OPEN EDIT FORM
  // ========================================

  const openEditForm = (product) => {
    setEditingId(product._id);

    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      rating: product.rating,
      description: product.description,
      emoji: product.emoji
    });

    setShowForm(true);
  };

  // ========================================
  // CLOSE FORM
  // ========================================

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);

    setForm({
      ...emptyForm
    });
  };

  // ========================================
  // ADD / UPDATE PRODUCT
  // ========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !form.name ||
      !form.category ||
      !form.price ||
      !form.description
    ) {
      alert(
        "Please fill in name, category, price and description."
      );

      return;
    }

    try {
      setSaving(true);

      const productData = {
        name: form.name,
        category: form.category,
        price: Number(form.price),
        rating: Number(form.rating) || 4.5,
        description: form.description,
        emoji: form.emoji || "🛍️"
      };

      // UPDATE
      if (editingId) {
        await axios.put(
          `https://shopsphere-zys1.onrender.com/api/products/${editingId}`,
          productData
        );

        alert("Product updated successfully!");
      }

      // ADD
      else {
        await axios.post(
          "https://shopsphere-zys1.onrender.com/api/products",
          productData
        );

        alert("Product added successfully!");
      }

      closeForm();

      await loadDashboard();

    } catch (error) {
      console.error("Save product error:", error);

      console.error(
        "Server response:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to save product."
      );
    } finally {
      setSaving(false);
    }
  };

  // ========================================
  // DELETE PRODUCT
  // ========================================

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(
        `https://shopsphere-zys1.onrender.com/api/products/${id}`
      );

      alert("Product deleted successfully!");

      await loadDashboard();

    } catch (error) {
      console.error("Delete error:", error);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete product."
      );
    }
  };

  // ========================================
  // DASHBOARD CALCULATIONS
  // ========================================

  const totalProducts = products.length;

  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );

  const maxSales =
    orders.length > 0
      ? Math.max(
          ...orders.map(
            (order) => order.totalAmount
          )
        )
      : 0;

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <div className="admin-loading">
        <h2>Loading Admin Dashboard...</h2>

        <p>Please wait.</p>
      </div>
    );
  }

  // ========================================
  // ERROR
  // ========================================

  if (error) {
    return (
      <div className="admin-error">
        <h2>{error}</h2>

        <button
          className="primary-btn"
          onClick={loadDashboard}
        >
          Try Again
        </button>
      </div>
    );
  }

  // ========================================
  // DASHBOARD
  // ========================================

  return (
    <div className="admin-page">

      {/* NAVBAR */}

      <nav className="navbar">

        <Link
          to="/"
          className="logo"
        >
          Shop<span>Sphere</span>
        </Link>

        <div className="nav-links">

          <Link to="/">
            Store
          </Link>

          <Link to="/products">
            Products
          </Link>

          <Link to="/cart">
            Cart
          </Link>

          <Link to="/admin">
            Admin
          </Link>

        </div>

      </nav>


      {/* HEADER */}

      <section className="admin-header">

        <p className="hero-tag">
          SHOPSPHERE ADMIN
        </p>

        <h1>
          Dashboard
        </h1>

        <p>
          Monitor your store performance,
          orders, revenue and inventory.
        </p>

      </section>


      {/* STAT CARDS */}

      <section className="admin-stats">

        <div className="admin-stat-card">

          <div className="stat-icon">
            📦
          </div>

          <div>

            <p>
              Total Products
            </p>

            <h2>
              {totalProducts}
            </h2>

          </div>

        </div>


        <div className="admin-stat-card">

          <div className="stat-icon">
            🛒
          </div>

          <div>

            <p>
              Total Orders
            </p>

            <h2>
              {totalOrders}
            </h2>

          </div>

        </div>


        <div className="admin-stat-card">

          <div className="stat-icon">
            💰
          </div>

          <div>

            <p>
              Total Revenue
            </p>

            <h2>
              ₹
              {totalRevenue.toLocaleString(
                "en-IN"
              )}
            </h2>

          </div>

        </div>

      </section>


      {/* SALES ANALYTICS */}

      <section className="admin-chart">

        <div className="admin-section-title">

          <div>

            <p className="hero-tag">
              ANALYTICS
            </p>

            <h2>
              Sales Overview
            </h2>

          </div>

        </div>


        {orders.length === 0 ? (

          <div className="no-data">

            <p>
              No sales data available yet.
            </p>

          </div>

        ) : (

          <div className="sales-chart">

            {orders
              .slice()
              .reverse()
              .map((order, index) => {

                const barHeight =
                  maxSales > 0
                    ? Math.max(
                        30,
                        (order.totalAmount /
                          maxSales) *
                          250
                      )
                    : 30;

                return (
                  <div
                    className="chart-column"
                    key={order._id}
                  >

                    <div className="chart-value">
                      ₹
                      {order.totalAmount.toLocaleString(
                        "en-IN"
                      )}
                    </div>

                    <div
                      className="chart-bar"
                      style={{
                        height:
                          `${barHeight}px`
                      }}
                    />

                    <div className="chart-label">
                      Order {index + 1}
                    </div>

                  </div>
                );
              })}

          </div>

        )}

      </section>


      {/* ORDERS */}

      <section className="admin-orders">

        <div className="admin-section-title">

          <div>

            <p className="hero-tag">
              ORDERS
            </p>

            <h2>
              Recent Orders
            </h2>

          </div>

        </div>


        {orders.length === 0 ? (

          <div className="no-data">

            <p>
              No orders yet.
            </p>

          </div>

        ) : (

          <div className="admin-table-wrapper">

            <table className="admin-table">

              <thead>

                <tr>

                  <th>
                    Order ID
                  </th>

                  <th>
                    Products
                  </th>

                  <th>
                    Amount
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Date
                  </th>

                </tr>

              </thead>


              <tbody>

                {orders
                  .slice(0, 10)
                  .map((order) => (

                    <tr
                      key={order._id}
                    >

                      <td>
                        #
                        {order._id.slice(-6)}
                      </td>

                      <td>
                        {order.items.length}
                      </td>

                      <td>
                        ₹
                        {order.totalAmount.toLocaleString(
                          "en-IN"
                        )}
                      </td>

                      <td>

                        <span className="status-badge">
                          {order.status}
                        </span>

                      </td>

                      <td>
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString(
                          "en-IN"
                        )}
                      </td>

                    </tr>

                  ))}

              </tbody>

            </table>

          </div>

        )}

      </section>


      {/* INVENTORY */}

      <section className="admin-products">

        <div className="admin-section-title">

          <div>

            <p className="hero-tag">
              INVENTORY
            </p>

            <h2>
              Products
            </h2>

          </div>


          <button
            className="primary-btn"
            onClick={openAddForm}
          >
            + Add Product
          </button>

        </div>


        <div className="admin-product-grid">

          {products.map((product) => (

            <div
              className="admin-product-card"
              key={product._id}
            >

              <div className="admin-product-image">
                {product.emoji}
              </div>


              <div className="admin-product-content">

                <small>
                  {product.category}
                </small>

                <h3>
                  {product.name}
                </h3>

                <p>
                  ⭐ {product.rating}
                </p>

                <strong>
                  ₹
                  {product.price.toLocaleString(
                    "en-IN"
                  )}
                </strong>


                <div className="admin-product-actions">

                  <button
                    className="edit-btn"
                    onClick={() =>
                      openEditForm(product)
                    }
                  >
                    Edit
                  </button>


                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(
                        product._id,
                        product.name
                      )
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* ADD / EDIT MODAL */}

      {showForm && (

        <div className="admin-modal-overlay">

          <div className="admin-modal">

            <div className="admin-modal-header">

              <div>

                <p className="hero-tag">
                  INVENTORY
                </p>

                <h2>
                  {editingId
                    ? "Edit Product"
                    : "Add Product"}
                </h2>

              </div>


              <button
                className="modal-close"
                onClick={closeForm}
              >
                ×
              </button>

            </div>


            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="admin-form"
            >

              {/* PRODUCT NAME */}

              <label>

                Product Name

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Wireless Headphones"
                />

              </label>


              {/* CATEGORY */}

              <label>

                Category

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >

                  <option value="">
                    Select category
                  </option>

                  <option value="Electronics">
                    Electronics
                  </option>

                  <option value="Fashion">
                    Fashion
                  </option>

                  <option value="Home">
                    Home
                  </option>

                  <option value="Beauty">
                    Beauty
                  </option>

                  <option value="Sports">
                    Sports
                  </option>

                </select>

              </label>


              {/* PRICE + RATING */}

              <div className="form-row">

                <label>

                  Price

                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="1999"
                    min="1"
                  />

                </label>


                <label>

                  Rating

                  <input
                    type="number"
                    name="rating"
                    value={form.rating}
                    onChange={handleChange}
                    placeholder="4.5"
                    min="1"
                    max="5"
                    step="0.1"
                  />

                </label>

              </div>


              {/* EMOJI */}

              <label>

                Emoji

                <input
                  type="text"
                  name="emoji"
                  value={form.emoji}
                  onChange={handleChange}
                  placeholder="🎧"
                  maxLength="4"
                />

              </label>


              {/* DESCRIPTION */}

              <label>

                Description

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe the product..."
                  rows="4"
                />

              </label>


              {/* FORM BUTTONS */}

              <div className="form-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closeForm}
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="primary-btn"
                  disabled={saving}
                >

                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Product"
                    : "Add Product"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Admin;
