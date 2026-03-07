# CRM Backend

A modern, production-ready REST API backend for a CRM system built with Express 5, Drizzle ORM, and PostgreSQL.

## 🚀 Technologies Used

- **Framework**: [Express.js 5](https://expressjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Security**: `helmet`, `cors`, `express-rate-limit`
- **Logging & Utilities**: `morgan`, `compression`, `dotenv`

## 📁 Project Structure

```text
├── src/
│   ├── config/       # Environment variables & runtime configurations
│   ├── controllers/  # Route handler functions
│   ├── db/           # Database connection & schema definitions
│   ├── middlewares/  # Custom Express middlewares (error handling, auth, etc.)
│   ├── routes/       # Express route definitions
│   └── app.js        # Express app initialization & middleware setup
├── index.js          # Entry point & server listener
├── drizzle.config.js # Drizzle ORM configuration
├── package.json      # Project dependencies & scripts
└── .env              # Environment variables
```

## 🛠️ Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL database

## ⚙️ Getting Started

### 1. Clone & Install

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory and configure the necessary variables (use `.env.example` as a reference if available).

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
# Add other necessary variables
```

### 3. Database Setup

Using Drizzle Kit, generate migrations and push them to your database:

```bash
# Generate SQL migration files based on your schema
npm run db:generate

# Apply migrations to the database
npm run db:migrate

# Open Drizzle Studio to view and manage data
npm run db:studio
```

### 4. Running the Server

**Development Mode:**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

## 📜 Available Scripts

- `npm run dev`: Starts the server in development mode using `nodemon`.
- `npm start`: Starts the application in production mode.
- `npm run db:generate`: Generates database migrations using Drizzle ORM.
- `npm run db:migrate`: Executes database migrations.
- `npm run db:studio`: Opens Drizzle Studio for database management.

## 🔒 Security & Performance Features

- **Express 5**: Leveraging the latest Express version with native async/await error handling.
- **Helmet**: Secures apps by setting various HTTP headers.
- **Rate Limiting**: Protects routes against basic DDoS and brute-force attacks via `express-rate-limit`.
- **CORS**: Configurable Cross-Origin Resource Sharing.
- **Compression**: Gzip compression for response bodies.
- **Morgan**: Detailed HTTP request logging.
