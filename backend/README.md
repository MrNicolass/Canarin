<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Canarin Backend

Backend developed with [NestJS](https://nestjs.com/) using [Prisma ORM](https://www.prisma.io/) and SQLite database.

## Description

This project is the backend for the Canarin system, using NestJS for the application structure and Prisma for database access. The default database is SQLite, configured via the `.env` file.

## Project Setup

1. **Clone the repository and access the backend folder:**
   ```bash
   git clone <repo-url>
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Edit the `.env` file as needed. Example:
     ```
     LOG_LEVEL='log,error,warn'
     SERVER_PORT=3000
     DATABASE_URL="file:./canarin.db"
     ```

4. **Set up the database (Prisma):**
   - Generate the Prisma client:
     ```bash
     npx prisma generate
     ```
   - To create a new migration after changing the Prisma schema, run:
     ```bash
     npx prisma migrate dev --name <migration-name>
     ```
     Replace `<migration-name>` with a descriptive name for your migration (e.g., `add-user-table`).
   - To apply existing migrations and initialize the database:
     ```bash
     npx prisma migrate dev
     ```

## Running the Project

```bash
# Development mode
npm run start

# Watch mode (hot reload)
npm run start:dev

# Production mode
npm run start:prod
```

The server will start on the port defined in `SERVER_PORT` (default: 3000).

## Main Structure

- `src/app.module.ts`: Main application module.
- `src/database/`: Prisma configuration and database connection.
- `src/users/`: Users module.
- `src/person/`: Person module.
- `prisma/schema.prisma`: Database schema.

## Notes

- The default database is SQLite, stored in `canarin.db`.
- To change the database, modify the `DATABASE_URL` variable in `.env` and adjust the `provider` in `prisma/schema.prisma`.

## License

MIT
