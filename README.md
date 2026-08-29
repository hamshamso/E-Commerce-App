# 🛍️ E-Commerce App — MERN Stack

A full-stack e-commerce web application built from the ground up with the MERN stack, designed around a cash-on-delivery (COD) shopping experience tailored for the Algerian market — customers order by wilaya, no online payment gateway required.

![Status](https://img.shields.io/badge/status-InProgress-orange)  ![Stack](https://img.shields.io/badge/stack-MERN-61DAFB)

## ✨ Features

### For Customers
- 🔐 Secure registration and login (JWT authentication, bcrypt-hashed passwords)
- 🛒 Browse the full product catalog with category filtering
- 🧺 Add products to cart with live quantity selection, respecting real stock levels
- 📦 Checkout with delivery by wilaya + phone number (COD)
- 📜 View personal order history and track order status

### For Admins
- 🗂️ Full product management — create, update, delete
- 📋 Order management — view all customer orders, update order status through their lifecycle (`pending → confirmed → shipped → delivered`), or mark as `cancelled`
- 🔒 All admin actions protected by role-based access control

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), React Router, Context API |
| Styling | Pure CSS (component-scoped, no framework) |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Auth | JSON Web Tokens (JWT), bcrypt |

## 🏗️ Architecture

```
ecommerce-app/
├── client/                  # React (Vite) frontend
│   └── src/
│       ├── components/      # Reusable UI components (ProductCard, etc.)
│       ├── context/         # AuthContext & CartContext (global state)
│       ├── pages/           # Home, Login, Register, Cart, Checkout, Orders, Admin
│       ├── services/        # Centralized API layer (api.js)
│       └── styles/          # Component and page-level CSS
│
├── server/                  # Express backend
│   ├── config/               # Database connection
│   ├── controllers/          # Business logic (auth, product, order)
│   ├── middleware/            # Authentication & authorization guards
│   ├── models/                # Mongoose schemas (User, Product, Order)
│   └── routes/                 # REST API route definitions
│
└── README.md
```

## 🗃️ Data Models

**User**
```
name, email (unique), password (hashed), phone, role: 'user' | 'admin'
```

**Product**
```
name, price, quantity, category (enum), image (URL)
```

**Order**
```
user (ref), items[] (product ref + snapshotted name/price/quantity), total, wilaya, phone,
status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
```

> Order line items snapshot each product's name and price at the moment of purchase, so historical orders stay accurate even if a product's details change later.

## 🔌 API Reference

### Auth — `/api/auth`
| Method | Endpoint | Access |
|---|---|---|
| `POST` | `/register` | Public |
| `POST` | `/login` | Public |

### Products — `/api/products`
| Method | Endpoint | Access |
|---|---|---|
| `GET` | `/products` | Public |
| `GET` | `/products/:id` | Public |
| `POST` | `/products` | Admin |
| `PUT` | `/products/:id` | Admin |
| `DELETE` | `/products/:id` | Admin |

### Orders — `/api/orders`
| Method | Endpoint | Access |
|---|---|---|
| `POST` | `/orders` | Authenticated user |
| `GET` | `/orders/my` | Authenticated user (own orders) |
| `GET` | `/orders/:id` | Order owner or Admin |
| `GET` | `/orders` | Admin (all orders) |
| `PATCH` | `/orders/:id/status` | Admin |

## 🔒 Security

- Passwords are hashed with bcrypt and never stored or transmitted in plain text.
- JWT payloads are kept minimal — user role and details are always freshly verified against the database on every request, never trusted from the token alone.
- Order totals and item prices are always computed server-side from live database records, preventing any client-side price manipulation.
- All write operations on products and orders require both authentication and role verification.

## 🚀 Getting Started

```bash
# Clone the repository
git clone <your-repo-url>
cd ecommerce-app

# Backend setup
cd server
npm install
# Create a .env file:
#   PORT=5000
#   MONGO_URI=<your MongoDB Atlas connection string>
#   JWT_SECRET=<your secret>
npm run dev

# Frontend setup (new terminal)
cd client
npm install
npm run dev
```

The app will be running at `http://localhost:5173` (frontend) and `http://localhost:5000` (backend API).

## 📄 License

This project is available for educational and portfolio purposes.

---

Built as a hands-on learning project covering the full MERN stack — from database design and secure authentication to a complete customer shopping flow and an admin management system.
