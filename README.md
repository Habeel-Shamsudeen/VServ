# Vehicle Service Management System

This project is a Vehicle Service Management System for a workshop. It includes three types of users: Admin, Mechanic, and Customer. The application is built using Next.js and NextAuth for authentication, with Prisma as the ORM to manage the database.

## Features

### Customer
- Sign up / Login (Google login)
- Register / Request service for a vehicle
- View service status
- Schedule service once a mechanic is appointed by the admin
- View service history

### Admin
- Login (email and password)
- Manage mechanics (add, remove, create, and delete accounts)
- Assign mechanics to customer service requests
- View mechanics' status
- Dashboard with statistics (number of mechanics, completed work, etc.)
- View all pending and ongoing customer requests

### Mechanic
- Login (credentials provided by admin)
- View details of assigned work and customer information

## Technologies Used

- **Frontend:** Next.js, React
- **Backend:** Next.js API Routes
- **Authentication:** NextAuth
- **Database:** Prisma with PostgreSQL
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- PostgreSQL
