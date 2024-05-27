/*
  Warnings:

  - You are about to drop the column `brandId` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the `CartDetail` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `qty` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_brandId_fkey";

-- DropForeignKey
ALTER TABLE "CartDetail" DROP CONSTRAINT "CartDetail_cartId_fkey";

-- DropForeignKey
ALTER TABLE "CartDetail" DROP CONSTRAINT "CartDetail_productId_fkey";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "brandId",
ADD COLUMN     "productId" TEXT,
ADD COLUMN     "qty" INTEGER NOT NULL;

-- DropTable
DROP TABLE "CartDetail";

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
