/*
  Warnings:

  - You are about to drop the column `storeId` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `storeId` on the `ProductFavorite` table. All the data in the column will be lost.
  - You are about to drop the column `storeId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `Store` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_storeId_fkey";

-- DropForeignKey
ALTER TABLE "ProductFavorite" DROP CONSTRAINT "ProductFavorite_storeId_fkey";

-- DropForeignKey
ALTER TABLE "Store" DROP CONSTRAINT "Store_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_storeId_fkey";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "storeId",
ADD COLUMN     "customerId" TEXT;

-- AlterTable
ALTER TABLE "ProductFavorite" DROP COLUMN "storeId",
ADD COLUMN     "customerId" TEXT;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "storeId",
ADD COLUMN     "customerId" TEXT;

-- DropTable
DROP TABLE "Store";

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" TEXT,
    "longitude" TEXT,
    "kode" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "term_of_payment" INTEGER,
    "addressId" TEXT,
    "full_address" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductFavorite" ADD CONSTRAINT "ProductFavorite_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
