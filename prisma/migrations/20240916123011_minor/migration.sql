/*
  Warnings:

  - Made the column `vehicleId` on table `Service` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_vehicleId_fkey";

-- AlterTable
ALTER TABLE "Service" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "vehicleId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
