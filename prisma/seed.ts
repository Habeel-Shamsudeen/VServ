import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: 'admin',
      role: 'ADMIN',
    },
  })

  // Create some customer users
  const customer1 = await prisma.user.create({
    data: {
      email: 'customer1@example.com',
      name: 'John Doe',
      password: 'password123', 
      role: 'CUSTOMER',
      customer: {
        create: {
          address: '123 Main St',
          vehicles: {
            create: [
              {
                make: 'Honda',
                model: 'Civic',
                year: 2023,
              },
              {
                make: 'Toyota',
                model: 'Corolla',
                year: 2021,
              },
            ],
          },
        },
      },
    },
  })

  const customer2 = await prisma.user.create({
    data: {
      email: 'customer2@example.com',
      name: 'Jane Smith',
      password: 'password123',
      role: 'CUSTOMER',
      customer: {
        create: {
          address: '456 Elm St',
          vehicles: {
            create: [
              {
                make: 'Ford',
                model: 'Focus',
                year: 2020,
              },
            ],
          },
        },
      },
    },
  })

  // Create mechanic users
  const mechanic1 = await prisma.user.create({
    data: {
      email: 'mechanic1@example.com',
      name: 'Bob Mechanic',
      password: 'password123',
      role: 'MECHANIC',
      mechanic: {
        create: {},
      },
    },
  })

  const mechanic2 = await prisma.user.create({
    data: {
      email: 'mechanic2@example.com',
      name: 'Alice Mechanic',
      password: 'password123',
      role: 'MECHANIC',
      mechanic: {
        create: {},
      },
    },
  })

  console.log('Seed data created!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })