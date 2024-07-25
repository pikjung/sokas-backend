-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "sales_id" TEXT;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_sales_id_fkey" FOREIGN KEY ("sales_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
