/*
  Warnings:

  - Made the column `paid` on table `Service` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Service" ALTER COLUMN "paid" SET NOT NULL,
ALTER COLUMN "paid" SET DEFAULT false;
