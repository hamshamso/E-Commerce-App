# E-Commerce App (MERN Stack)

A full-stack e-commerce web application built from scratch, focused on a simple, COD-based (cash on delivery) shopping flow for the Algerian market — no online payment gateway, delivery organized by wilaya.

## Tech Stack

- **Frontend:** React (Vite), React Router, Context API (Auth + Cart), pure CSS (no Tailwind/CSS frameworks)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Atlas), Mongoose
- **Auth:** JWT (stored in localStorage), bcrypt password hashing

## Features

### Customer
- Browse products (category filtering via a fixed enum, no separate Category collection)
- Register / Login (JWT-based)
- Add to cart with quantity selection, respecting live stock
- Checkout — registered users only (no guest checkout), delivery by wilaya + phone (COD)
- View personal order history

### Admin
- Product management: create, update, delete (soft-protected via role-based middleware)
- Order management: view all orders, update order status (`pending → confirmed → shipped → delivered → cancelled`)

## Project Structure

```
ecommerce-app/
├── client/                  # React (Vite) frontend
│   └── src/
│       ├── components/      # Reusable UI (ProductCard, etc.)
│       ├── context/         # AuthContext, CartContext (React Context API)
│       ├── pages/           # Home, Login, Register, NavBar
│       ├── services/        # api.js — centralized fetch calls to the backend
│       └── styles/          # Plain CSS per page/component
│
├── server/                  # Express backend
│   └── src/ (or root, depending on setup)
│       ├── config/          # db.js — MongoDB connection
│       ├── controllers/     # authController, productController, orderController
│       ├── middleware/      # ValidateUser (JWT check), adminOnly (role check)
│       ├── models/          # User, Product, Order (Mongoose schemas)
│       └── routes/          # authRoute, productRoute, orderRoute
│
└── README.md
```

## Data Models

**User:** `name, email, password (hashed), phone, role ('user' | 'admin')`

**Product:** `name, price, quantity, category (enum), image (URL)`

**Order:** `user (ref), items[] (product ref + snapshot name/price/quantity), total, wilaya, phone, status (enum)`

> Order line items snapshot the product's `name` and `price` at the time of purchase, rather than referencing live product data — so past orders remain accurate even if a product's price or name changes later.

## API Overview

### Auth (`/api/auth`)
| Method | Endpoint | Access |
|---|---|---|
| POST | `/register` | Public |
| POST | `/login` | Public |

### Products (`/api/products`)
| Method | Endpoint | Access |
|---|---|---|
| GET | `/products` | Public |
| GET | `/products/:id` | Public |
| POST | `/products` | Admin |
| PUT | `/products/:id` | Admin |
| DELETE | `/products/:id` | Admin |

### Orders (`/api/orders`)
| Method | Endpoint | Access |
|---|---|---|
| POST | `/orders` | Logged-in user |
| GET | `/orders/my` | Logged-in user (own orders) |
| GET | `/orders/:id` | Owner or Admin |
| GET | `/orders` | Admin (all orders) |
| PATCH | `/orders/:id/status` | Admin |

## Security Notes

- Passwords are hashed with bcrypt before storage — never stored or returned in plain text.
- JWT payloads are kept minimal (`{ id }` only) — role and other user data are always freshly looked up from the database on each request, never trusted from a stale token.
- Order `total` and item `price`/`name` are always calculated server-side from the live database, never trusted from client input — preventing price manipulation.
- Product create/update/delete routes are protected by both authentication (`ValidateUser`) and role verification (`adminOnly`).

## Setup

```bash
# Backend
cd server
npm install
# create a .env file with: PORT, MONGO_URI, JWT_SECRET
npm run dev

# Frontend
cd client
npm install
npm run dev
```

## Status

Backend: Auth, Product CRUD, and Order CRUD complete.
Frontend: Auth pages, product catalog (on the Home page), cart context complete. Checkout page, order history page, and admin dashboard UI in progress.
