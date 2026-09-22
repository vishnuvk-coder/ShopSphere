# ShopSphere

ShopSphere is a full-stack e-commerce web application built as a technical assignment for a Full Stack Web Developer role.

It provides a customer-facing shopping experience along with an admin dashboard for product and order management.

## Live Demo

- **Frontend:** https://shop-sphere-kdx5.vercel.app
- **Admin Dashboard:** https://shop-sphere-kdx5.vercel.app/admin
- **Backend API:** https://shopsphere-zys1.onrender.com
- **Products API:** https://shopsphere-zys1.onrender.com/api/products
- **GitHub Repository:** https://github.com/vishnuvk-coder/ShopSphere

## Features

### Customer Side
- Responsive landing page
- Product listing
- Product details page
- Add products to cart
- Increase/decrease cart quantity
- Remove products from cart
- Simulated checkout
- Automatic order creation through the backend

### Admin Dashboard
- Total products, orders and revenue
- Sales overview visualization
- Recent orders
- Inventory overview
- Add products
- Edit products
- Delete products
- Product and order data loaded from the backend API

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv

### Deployment
- Vercel — Frontend
- Render — Backend
- MongoDB Atlas — Database
- GitHub — Source Code

## Project Structure

```text
ShopSphere/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Admin.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   └── Products.jsx
│   │   ├── App.jsx
│   │   ├── Home.jsx
│   │   ├── App.css
│   │   └── index.css
│   ├── vercel.json
│   └── package.json
│
├── backend/
│   ├── models/
│   │   ├── Product.js
│   │   └── Order.js
│   ├── server.js
│   ├── seed.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## API Endpoints

### Products

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get a single product |
| POST | `/api/products` | Create a product |
| PUT | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |

### Orders

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/orders` | Get all orders |
| POST | `/api/orders` | Create an order |

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/vishnuvk-coder/ShopSphere.git
cd ShopSphere
```

### 2. Start the backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Then start the server:

```bash
node server.js
```

The backend will run locally on:

```text
http://localhost:5000
```

### 3. Start the frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

## Database Seeding

The backend includes a seed script for sample products.

From the `backend` directory:

```bash
node seed.js
```

This creates sample products such as:

- Wireless Headphones
- Smart Watch
- Travel Backpack
- Running Shoes
- Desk Lamp
- Bluetooth Speaker

## Application Flow

```text
Customer
   ↓
Landing Page
   ↓
Products
   ↓
Product Details
   ↓
Add to Cart
   ↓
Checkout
   ↓
POST /api/orders
   ↓
MongoDB

Admin
   ↓
Admin Dashboard
   ↓
Products / Orders / Revenue
   ↓
Product CRUD
   ↓
Backend API
   ↓
MongoDB
```

## Notes

- Checkout is implemented as a simulated checkout flow for the assignment.
- No real payment gateway is connected.
- Authentication and authorization are not included because they were outside the core assignment scope.
- Environment variables and `node_modules` are excluded from Git using `.gitignore`.

## Testing

The application was tested for:

- Product listing
- Product details
- Add to cart
- Cart quantity changes
- Product removal
- Checkout/order creation
- Admin dashboard metrics
- Product creation
- Product editing
- Product deletion
- Backend API connectivity
- MongoDB Atlas connectivity
- Production frontend/backend deployment
- React Router routes on the deployed frontend

## Author

**Vishnukant Vishnu**

GitHub: https://github.com/vishnuvk-coder
