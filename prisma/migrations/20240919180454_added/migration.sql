-- DropForeignKey
ALTER TABLE "Mechanic" DROP CONSTRAINT "Mechanic_userId_fkey";

-- AddForeignKey
ALTER TABLE "Mechanic" ADD CONSTRAINT "Mechanic_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
