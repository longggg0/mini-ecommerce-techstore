# TechStore 🛍️

A full-stack mini e-commerce web application for browsing and purchasing tech products (iPhones & Laptops).

**Live Demo:** [mini-ecommerce-techstore-5v3b.vercel.app](https://mini-ecommerce-techstore-5v3b.vercel.app)

---

## Features

- 🔍 **Product Browsing & Search** — Browse products with category filtering and debounced search
- 🛒 **Shopping Cart & Checkout** — Add to cart, adjust quantities, and place orders
- 🔐 **User Authentication** — Customer register/login with JWT tokens
- 🛡️ **Auth Middleware** — Protected admin routes using JWT verification on the backend
- 👨‍💼 **Admin Dashboard** — Manage products, categories, customers, and orders
- 📦 **Order Management** — View and manage all customer orders
- 🧾 **Invoice Generation** — Admin can generate and download order invoices as `.docx`
- 📲 **Telegram Notifications** — New orders are sent instantly to a Telegram bot

---

## Tech Stack

### Frontend
- React + TypeScript (Vite)
- Tailwind CSS + shadcn/ui
- TanStack Query
- React Router DOM

### Backend
- Node.js + Express
- Sequelize ORM + PostgreSQL
- JWT Authentication
- bcryptjs + express-fileupload

---

## Getting Started

### Prerequisites
- Node.js v18+
- PostgreSQL

### Frontend Setup

```bash
git clone https://github.com/longggg0/mini-ecommerce-techstore.git
cd mini-ecommerce-techstore
npm install
```

Create a `.env` file:
```env
VITE_API_URL=http://localhost:3000
```

```bash
npm run dev
```

### Backend Setup

```bash
git clone https://github.com/longggg0/techstore_backend.git
cd techstore_backend
npm install
```

Update `config/config.json` with your PostgreSQL credentials, then run:

```bash
npx sequelize-cli db:migrate
node index.js
```

---

## Deployment

| Service | Platform |
|---------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | Render PostgreSQL |

---

## Environment Variables

### Frontend (Vercel)
| Key | Description |
|-----|-------------|
| `VITE_API_URL` | Backend API URL |

### Backend (Render)
| Key | Description |
|-----|-------------|
| `DATABASE_URL` | PostgreSQL connection string |

---

## Admin Access

To create an admin account, insert a user with `role: "admin"` into the `Customers` table directly via database or seeder.
