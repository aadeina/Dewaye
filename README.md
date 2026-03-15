# Dewaye Backend API

Dewaye is a Django + DRF backend for managing pharmacies, medicines, and inventory with secure JWT authentication and OpenAPI documentation.

## Problem

Pharmacies need a simple way to track medicines and stock across locations, while exposing clean APIs for a frontend dashboard.

## Tech Stack

- Django 6
- Django REST Framework
- PostgreSQL (`psycopg2`)
- JWT auth (`djangorestframework-simplejwt`)
- CORS headers
- Swagger/OpenAPI (`drf-spectacular`)

## Core Modules

- `pharmacies`: pharmacy profile and contact data
- `medicines`: medicine catalog (name, category, price, stock)
- `inventory`: stock quantity per pharmacy per medicine

## API Endpoints

- `GET/POST /api/pharmacies/`
- `GET/POST /api/medicines/`
- `GET/POST /api/inventory/`
- `POST /api/auth/register/`
- `POST /api/auth/token/`
- `POST /api/auth/token/refresh/`
- `GET /api/auth/me/`
- `GET /api/schema/` (OpenAPI schema)
- `GET /api/docs/` (Swagger UI)

## Quick Start

1. Create and activate virtual environment.
2. Install dependencies:
   - `pip install -r backend/requirements.txt`
3. Configure environment variables in `backend/.env` (do not commit this file):
   - `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`
4. Run migrations:
   - `python backend/manage.py migrate`
5. Create superuser:
   - `python backend/manage.py createsuperuser`
6. Start server:
   - `python backend/manage.py runserver`

## JWT Usage Example

1. Get token pair:
   - `POST /api/auth/token/` with `username` and `password`
2. Use `access` token in header:
   - `Authorization: Bearer <access_token>`
3. Refresh token:
   - `POST /api/auth/token/refresh/`

## Notes

- `.env` is intentionally ignored by git.
- `backend/.env.example` is only a safe template for demo setup.
- API rate limiting is enabled (`anon`, `user`, plus stricter `login`/`register` scopes) to reduce brute-force risk.
