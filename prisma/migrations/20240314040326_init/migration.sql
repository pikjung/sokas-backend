/*
  Warnings:

  - The primary key for the `Address` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Area` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Brand` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Cart` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CartDetail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `MasterArea` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ProductFavorite` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ProductPopularName` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Store` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Transaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TransactionDetail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_multi_id_fkey";

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_tr_id_fkey";

-- DropForeignKey
ALTER TABLE "Area" DROP CONSTRAINT "Area_masterAreaId_fkey";

-- DropForeignKey
ALTER TABLE "Area" DROP CONSTRAINT "Area_sales_id_fkey";

-- DropForeignKey
ALTER TABLE "Area" DROP CONSTRAINT "Area_sales_support_id_fkey";

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_brandId_fkey";

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_storeId_fkey";

-- DropForeignKey
ALTER TABLE "CartDetail" DROP CONSTRAINT "CartDetail_cartId_fkey";

-- DropForeignKey
ALTER TABLE "CartDetail" DROP CONSTRAINT "CartDetail_productId_fkey";

-- DropForeignKey
ALTER TABLE "MasterArea" DROP CONSTRAINT "MasterArea_spv_id_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_brandId_fkey";

-- DropForeignKey
ALTER TABLE "ProductFavorite" DROP CONSTRAINT "ProductFavorite_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductFavorite" DROP CONSTRAINT "ProductFavorite_storeId_fkey";

-- DropForeignKey
ALTER TABLE "ProductPopularName" DROP CONSTRAINT "ProductPopularName_productId_fkey";

-- DropForeignKey
ALTER TABLE "Store" DROP CONSTRAINT "Store_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_brandId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_storeId_fkey";

-- DropForeignKey
ALTER TABLE "TransactionDetail" DROP CONSTRAINT "TransactionDetail_productId_fkey";

-- DropForeignKey
ALTER TABLE "TransactionDetail" DROP CONSTRAINT "TransactionDetail_transactionId_fkey";

-- AlterTable
ALTER TABLE "Address" DROP CONSTRAINT "Address_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "tr_id" SET DATA TYPE TEXT,
ALTER COLUMN "multi_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Address_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Address_id_seq";

-- AlterTable
ALTER TABLE "Area" DROP CONSTRAINT "Area_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "masterAreaId" SET DATA TYPE TEXT,
ALTER COLUMN "sales_id" SET DATA TYPE TEXT,
ALTER COLUMN "sales_support_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Area_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Area_id_seq";

-- AlterTable
ALTER TABLE "Brand" DROP CONSTRAINT "Brand_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Brand_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Brand_id_seq";

-- AlterTable
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "brandId" SET DATA TYPE TEXT,
ALTER COLUMN "storeId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Cart_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Cart_id_seq";

-- AlterTable
ALTER TABLE "CartDetail" DROP CONSTRAINT "CartDetail_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "cartId" SET DATA TYPE TEXT,
ALTER COLUMN "productId" SET DATA TYPE TEXT,
ADD CONSTRAINT "CartDetail_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "CartDetail_id_seq";

-- AlterTable
ALTER TABLE "MasterArea" DROP CONSTRAINT "MasterArea_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "spv_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "MasterArea_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "MasterArea_id_seq";

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "brandId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Product_id_seq";

-- AlterTable
ALTER TABLE "ProductFavorite" DROP CONSTRAINT "ProductFavorite_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "storeId" SET DATA TYPE TEXT,
ALTER COLUMN "productId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ProductFavorite_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ProductFavorite_id_seq";

-- AlterTable
ALTER TABLE "ProductPopularName" DROP CONSTRAINT "ProductPopularName_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "productId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ProductPopularName_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ProductPopularName_id_seq";

-- AlterTable
ALTER TABLE "Role" DROP CONSTRAINT "Role_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Role_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Role_id_seq";

-- AlterTable
ALTER TABLE "Store" DROP CONSTRAINT "Store_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "addressId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Store_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Store_id_seq";

-- AlterTable
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "storeId" SET DATA TYPE TEXT,
ALTER COLUMN "brandId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Transaction_id_seq";

-- AlterTable
ALTER TABLE "TransactionDetail" DROP CONSTRAINT "TransactionDetail_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "transactionId" SET DATA TYPE TEXT,
ALTER COLUMN "productId" SET DATA TYPE TEXT,
ADD CONSTRAINT "TransactionDetail_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "TransactionDetail_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "MasterArea" ADD CONSTRAINT "MasterArea_spv_id_fkey" FOREIGN KEY ("spv_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Area" ADD CONSTRAINT "Area_masterAreaId_fkey" FOREIGN KEY ("masterAreaId") REFERENCES "MasterArea"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Area" ADD CONSTRAINT "Area_sales_id_fkey" FOREIGN KEY ("sales_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Area" ADD CONSTRAINT "Area_sales_support_id_fkey" FOREIGN KEY ("sales_support_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_tr_id_fkey" FOREIGN KEY ("tr_id") REFERENCES "Area"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_multi_id_fkey" FOREIGN KEY ("multi_id") REFERENCES "Area"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductFavorite" ADD CONSTRAINT "ProductFavorite_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductFavorite" ADD CONSTRAINT "ProductFavorite_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPopularName" ADD CONSTRAINT "ProductPopularName_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionDetail" ADD CONSTRAINT "TransactionDetail_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionDetail" ADD CONSTRAINT "TransactionDetail_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartDetail" ADD CONSTRAINT "CartDetail_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartDetail" ADD CONSTRAINT "CartDetail_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
