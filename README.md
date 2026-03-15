# 💊 Dewaye - Pharmacy Management System

> A modern, full-stack pharmacy management platform that enables public medicine discovery and secure inventory management across multiple pharmacy locations.

🌐 **Live Demo**: [https://dewaye.vercel.app/](https://dewaye.vercel.app/)

---

## ✨ Overview

Dewaye is a comprehensive pharmacy management system designed to bridge the gap between public medicine discovery and pharmacy administration. The platform offers:

- 🔍 **Public Browsing** - Anyone can search and explore medicines and pharmacies without creating an account
- 🔐 **Secure Management** - Administrators can manage inventory, medicines, and pharmacy locations with JWT authentication
- 📊 **Real-time Dashboard** - Track statistics and inventory levels across all locations
- 🏥 **Multi-location Support** - Manage stock levels across multiple pharmacy branches

---

## 🎯 Problem Statement

Pharmacies need a simple, modern way to:
- Allow customers to discover available medicines and find nearby pharmacies
- Track medicines and stock levels across multiple locations
- Provide administrators with an intuitive dashboard for inventory management
- Expose clean, well-documented APIs for integration

Dewaye solves these challenges with a user-friendly interface and robust backend architecture.

---

## 🚀 Features

### Public Features (No Login Required)
- 🔎 **Browse Medicines** - Search by name, filter by category, check availability
- 📍 **Find Pharmacies** - Discover pharmacy locations with contact information
- 🔍 **Smart Search** - Real-time filtering and search functionality
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

### Management Features (Login Required)
- 📊 **Dashboard** - Overview of pharmacies, medicines, and inventory statistics
- 💊 **Medicine Management** - Add, view, and manage medicine catalog
- 🏥 **Pharmacy Management** - Manage pharmacy locations and contact details
- 📦 **Inventory Tracking** - Monitor stock levels across all pharmacy locations
- 🔐 **Secure Authentication** - JWT-based authentication with token refresh

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ **React 18** - Modern UI library
- 🔷 **TypeScript** - Type-safe development
- ⚡ **Vite** - Fast build tool and dev server
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🧭 **React Router** - Client-side routing
- 🌐 **Deployed on Vercel** - [Live Site](https://dewaye.vercel.app/)

### Backend
- 🐍 **Django 6** - High-level Python web framework
- 🔌 **Django REST Framework** - Powerful REST API toolkit
- 🗄️ **PostgreSQL** - Robust relational database
- 🔑 **JWT Authentication** - Secure token-based auth (`djangorestframework-simplejwt`)
- 📚 **OpenAPI/Swagger** - API documentation (`drf-spectacular`)
- 🌍 **CORS Headers** - Cross-origin resource sharing support

---

## 📁 Project Structure

```
Dewaye/
├── frontend/                 # React + TypeScript frontend
│   ├── src/
│   │   ├── features/         # Feature-based organization
│   │   │   ├── auth/         # Authentication pages
│   │   │   ├── dashboard/    # Dashboard & home pages
│   │   │   ├── medicines/    # Medicine browsing & management
│   │   │   ├── pharmacies/   # Pharmacy browsing & management
│   │   │   └── inventory/    # Inventory management
│   │   ├── components/       # Reusable components
│   │   └── lib/              # Utilities & API client
│   └── package.json
│
└── backend/                  # Django REST API
    ├── config/               # Django settings & URLs
    ├── pharmacies/           # Pharmacy management module
    ├── medicines/            # Medicine catalog module
    ├── inventory/            # Inventory tracking module
    └── requirements.txt
```

---

## 🔌 API Endpoints

### Public Endpoints (Read-only, no auth required)
- `GET /api/pharmacies/` - List all pharmacies
- `GET /api/medicines/` - List all medicines
- `GET /api/inventory/` - List all inventory items

### Protected Endpoints (Requires authentication)
- `POST /api/pharmacies/` - Create new pharmacy
- `POST /api/medicines/` - Add new medicine
- `POST /api/inventory/` - Add inventory item

### Authentication
- `POST /api/auth/register/` - Register new user
- `POST /api/auth/token/` - Get JWT token pair
- `POST /api/auth/token/refresh/` - Refresh access token
- `GET /api/auth/me/` - Get current user info

### Documentation
- `GET /api/schema/` - OpenAPI schema
- `GET /api/docs/` - Swagger UI documentation

---

## 🚀 Quick Start

### Prerequisites
- Python 3.8+ 
- Node.js 16+ and npm
- PostgreSQL database

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create and activate virtual environment**
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate
   
   # Linux/Mac
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables** (optional)
   
   The backend uses environment variables with defaults. Create a `.env` file in the `backend/` directory if you need custom database settings:
   ```env
   DB_NAME=dewaye_db
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_HOST=localhost
   DB_PORT=5432
   ```
   
   Default values are used if environment variables are not set.

5. **Run migrations**
   ```bash
   python manage.py migrate
   ```

6. **Create superuser** (optional, for admin access)
   ```bash
   python manage.py createsuperuser
   ```

7. **Start development server**
   ```bash
   python manage.py runserver
   ```
   
   Backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   
   Frontend will be available at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

---

## 🔐 Authentication Flow

1. **Get Token Pair**
   ```bash
   POST /api/auth/token/
   {
     "username": "your_username",
     "password": "your_password"
   }
   ```

2. **Use Access Token**
   ```bash
   Authorization: Bearer <access_token>
   ```

3. **Refresh Token** (when access token expires)
   ```bash
   POST /api/auth/token/refresh/
   {
     "refresh": "<refresh_token>"
   }
   ```

---

## 📊 Core Modules

### 🏥 Pharmacies Module
- Store pharmacy profile information
- Contact details (phone, email, location)
- Multi-location support

### 💊 Medicines Module
- Medicine catalog management
- Category organization
- Price and stock tracking

### 📦 Inventory Module
- Track stock levels per pharmacy per medicine
- Real-time inventory updates
- Last updated timestamps

---

## 🔒 Security Features

- ✅ **JWT Authentication** - Secure token-based authentication using `djangorestframework-simplejwt`
- ✅ **CORS Protection** - Configured to allow requests from frontend origins
- ✅ **Rate Limiting** - Prevents brute-force attacks via DRF throttling
  - Anonymous: 60 requests/minute
  - Authenticated: 300 requests/minute
  - Login/Register: 10 requests/minute
- ✅ **Read-only Public Access** - Public endpoints use `IsAuthenticatedOrReadOnly` permission class

---

## 🌐 Deployment

### Frontend
- **Platform**: Vercel
- **Live URL**: [https://dewaye.vercel.app/](https://dewaye.vercel.app/)
- **Build Command**: `npm run build`

### Backend
- Set up PostgreSQL database
- Configure environment variables for production
- Run migrations: `python manage.py migrate`
- Deploy using a production WSGI server

---

## 📝 Notes

- API rate limiting is enabled:
  - Anonymous users: 60 requests/minute
  - Authenticated users: 300 requests/minute
  - Login/Register endpoints: 10 requests/minute
- Public endpoints support read-only access without authentication (`IsAuthenticatedOrReadOnly`)
- Management endpoints (POST/PUT/DELETE) require JWT authentication
- OpenAPI/Swagger documentation available at `/api/docs/` when backend is running
- CORS is configured to allow requests from `http://localhost:5173` and `http://127.0.0.1:5173`

---

**🌐 Live Demo**: [Visit Dewaye](https://dewaye.vercel.app/)

**📚 API Documentation**: Available at `/api/docs/` when backend is running
