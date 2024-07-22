/*
  Warnings:

  - You are about to drop the column `city` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phno` on the `User` table. All the data in the column will be lost.
  - Added the required column `address` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ServiceStatus" ADD VALUE 'PICKING_UP';
ALTER TYPE "ServiceStatus" ADD VALUE 'INSPECTING';
ALTER TYPE "ServiceStatus" ADD VALUE 'WORKING';

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "city",
DROP COLUMN "street",
ADD COLUMN     "address" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "vehicleId" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
DROP COLUMN "phno",
ADD COLUMN     "phoneNumber" TEXT;

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" SERIAL NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;
