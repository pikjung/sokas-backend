-- DropForeignKey
ALTER TABLE "Kules" DROP CONSTRAINT "Kules_storeId_fkey";

-- AlterTable
ALTER TABLE "Kules" ADD COLUMN     "isnoo" TEXT DEFAULT 'N',
ALTER COLUMN "storeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Kules" ADD CONSTRAINT "Kules_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE SET NULL ON UPDATE CASCADE;
