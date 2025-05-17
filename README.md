# VServ

This project is a **Vehicle Service Management System** designed for a workshop environment. It supports three types of users: Admin, Mechanic, and Customer. The system is built using **Next.js** and **NextAuth** for authentication, with **Prisma** as the ORM for managing the PostgreSQL database.

## Features

### Customer

- Sign up / Login
- Register/Request service for a vehicle
- View service status
- Schedule service once a mechanic is assigned by the admin
- View service history

### Admin

- Login via email and password
- Manage mechanics (create, update, delete mechanic accounts)
- Assign mechanics to customer service requests
- View mechanics' status
- Dashboard with workshop statistics (number of mechanics, completed services, etc.)
- View all pending and ongoing customer requests

### Mechanic

- Login via credentials provided by the admin
- View assigned work details
- Access customer information related to assigned services

## Technologies Used

- **Frontend:** Next.js, React, ShadCn
- **Backend:** Next.js API Routes (Full-stack capabilities)
- **Authentication:** NextAuth
- **ORM/Database:** Prisma with PostgreSQL
- **Deployment:** Vercel (or local development)

---

## Getting Started

### Prerequisites

- **Node.js**: Ensure that you have Node.js version 14 or later installed.
- **PostgreSQL**: Ensure you have access to a PostgreSQL database (either locally or via a cloud service).

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Habeel-Shamsudeen/Vehicle-Service-Management-Software.git
   cd vehicle-service-management-system

   ```

2. **Install dependencies:**

   ```bash
   npm install

   ```

3. **Set up environment variables:**
   Create a `.env` file in the root of your project directory and include the following environment variables:

   ```bash
   # .env file example
   DATABASE_URL="DB connection String"
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_secret_key
   ```

   - **DATABASE_URL:** Your PostgreSQL connection string.
   - **NEXTAUTH_URL**: The URL of your running application (adjust for production if necessary).
   - **NEXTAUTH_SECRET**: A strong secret for securing NextAuth sessions. You can generate one using `openssl rand -base64 32`.

4. **Set up Prisma:**

   Prisma is already configured in this project. You only need to apply the database migrations and seed the database.

   To apply the migrations and set up the database schema, run:

   ```bash
   npx prisma migrate dev --name init

   ```

   If needed, you can manually generate the Prisma client by running the following command:

   ```bash
   npx prisma generate

   ```

   This will ensure that the Prisma client is up to date with your schema.

5. **Seed the Database**

   You can seed the database with initial data (such as predefined admin and mechanic users) using the provided seed file.

   Run the following command to seed the database:

   ```bash
   npx prisma db seed
   ```
6. **Run the application:**

    Once everything is set up, start the development server:

   ```bash
   npm run dev
   ```

   Your app should now be running at `http://localhost:3000`.

