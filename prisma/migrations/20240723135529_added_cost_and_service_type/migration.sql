/*
  Warnings:

  - Added the required column `cost` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceType` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('OIL_CHANGE', 'TIRE_ROTATION', 'BRAKE_INSPECTION', 'BATTERY_REPLACEMENT', 'ENGINE_DIAGNOSTIC', 'GENERAL_MAINTENANCE');

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "cost" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "serviceType" "ServiceType" NOT NULL;
