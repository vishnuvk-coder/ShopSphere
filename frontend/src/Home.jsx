import "./App.css";

function Home() {
  return (
    <div className="app">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          Shop<span>Sphere</span>
        </div>

        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <a href="/cart" className="cart-btn">
          🛒 Cart
        </a>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">

          <p className="hero-tag">
            WELCOME TO SHOPSPHERE
          </p>

          <h1>
            Everything you need,
            <span> all in one place.</span>
          </h1>

          <p className="hero-description">
            Discover quality products at great prices.
            Shop smarter, faster and easier with ShopSphere.
          </p>

          <div className="hero-buttons">
            <a
              href="/products"
              className="primary-btn"
            >
              Shop Now
            </a>

            <a
              href="/products"
              className="secondary-btn"
            >
              Explore Products
            </a>
          </div>

        </div>

        <div className="hero-card">
          <div className="product-icon">
            🛍️
          </div>

          <h2>Fresh Picks</h2>

          <p>
            Discover our latest products
          </p>

          <div className="discount">
            Up to 30% OFF
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories" id="about">

        <div className="section-heading">
          <p>SHOP BY CATEGORY</p>

          <h2>Find what you need</h2>
        </div>

        <div className="category-grid">

          <div className="category-card">
            <div>💻</div>
            <h3>Electronics</h3>
            <p>Latest gadgets and devices</p>
          </div>

          <div className="category-card">
            <div>👕</div>
            <h3>Fashion</h3>
            <p>Style for every occasion</p>
          </div>

          <div className="category-card">
            <div>🏠</div>
            <h3>Home</h3>
            <p>Make your home better</p>
          </div>

          <div className="category-card">
            <div>🎧</div>
            <h3>Accessories</h3>
            <p>Complete your setup</p>
          </div>

        </div>
      </section>

      {/* Featured Products */}
      <section className="products" id="products">

        <div className="section-heading">
          <p>FEATURED PRODUCTS</p>

          <h2>Popular this week</h2>
        </div>

        <div className="product-grid">

          {/* Product 1 */}
          <div className="product-card">

            <div className="product-image">
              🎧
            </div>

            <h3>Wireless Headphones</h3>

            <p>
              Premium sound experience
            </p>

            <strong>
              ₹2,499
            </strong>

            <a
              href="/products"
              className="view-product-btn"
            >
              View Products
            </a>

          </div>

          {/* Product 2 */}
          <div className="product-card">

            <div className="product-image">
              ⌚
            </div>

            <h3>Smart Watch</h3>

            <p>
              Track your day smarter
            </p>

            <strong>
              ₹3,999
            </strong>

            <a
              href="/products"
              className="view-product-btn"
            >
              View Products
            </a>

          </div>

          {/* Product 3 */}
          <div className="product-card">

            <div className="product-image">
              🎒
            </div>

            <h3>Travel Backpack</h3>

            <p>
              Perfect for everyday travel
            </p>

            <strong>
              ₹1,299
            </strong>

            <a
              href="/products"
              className="view-product-btn"
            >
              View Products
            </a>

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer id="contact">

        <div>
          <h2>ShopSphere</h2>

          <p>
            Your everyday shopping destination.
          </p>
        </div>

        <p>
          © 2026 ShopSphere. All rights reserved.
        </p>

      </footer>

    </div>
  );
}

export default Home;