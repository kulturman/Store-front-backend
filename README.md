# Storefront Backend Project

This repository contains a TypeScript/Express API that powers the backend for a simple storefront. It exposes endpoints for managing users, products, and orders and includes scripts for database migrations, fixtures, and automated tests.

## Prerequisites

The following tooling is required for local development:

- [Node.js](https://nodejs.org/) (v16 or later recommended) and npm
- [Docker](https://www.docker.com/) with Docker Compose for running PostgreSQL

> **Note:** The project expects PostgreSQL to be available on port `5432`. The provided Docker Compose configuration exposes the database on that port.

## Environment variables

Application configuration is managed through environment variables. Copy the sample file and adjust the values for your environment:

```bash
cp .env.example .env
cp .env.example .env.test    # optional: separate settings for test runs
```

The following variables are read by the application scripts:

| Variable | Description |
| --- | --- |
| `POSTGRES_USER` | PostgreSQL user used for migrations and fixtures. |
| `POSTGRES_PASSWORD` | Password for the above user. |
| `DB_NAME` | Name of the development database. |
| `JWT_SECRET_KEY` | Secret used when signing JSON Web Tokens. |

## Getting started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Build the TypeScript sources** – the database and fixture scripts expect compiled JavaScript in the `dist` directory.
   ```bash
   npm run build
   ```
3. **Start PostgreSQL** – this runs a database container in the background.
   ```bash
   docker-compose up -d
   ```
4. **Create the development and test databases**
   ```bash
   npm run db-create
   npm run db-create-test
   ```
5. **Seed sample data (optional but recommended)**
   ```bash
   npm run fixture
   npm run fixture-test
   ```

## Available scripts

- `npm run dev` – run the TypeScript compiler in watch mode alongside the Express server (listens on port `3000`).
- `npm test` – build the project and execute the Jest test suite (runs in watch mode; press `q` to quit).
- `npm run migrate` / `npm run migrate:rollback` – apply or roll back database migrations.
- `npm run db-drop` / `npm run db-drop-test` – drop the development or test databases.
- `npm run db-restore` / `npm run db-restore-test` – drop and recreate the respective database including migrations.
- `npm run fixture` / `npm run fixture-test` – populate the database with sample data (requires a build).

## API exploration

A Postman collection is provided at `Store front collection.postman_collection.json`. Import it to quickly explore the available endpoints once the server is running.

## Stopping and cleaning up

To stop the PostgreSQL container, run:

```bash
docker-compose down
```

This leaves your application code untouched while stopping and removing the database container.
