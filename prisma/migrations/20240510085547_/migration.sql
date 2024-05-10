/*
  Warnings:

  - You are about to drop the column `top` on the `Store` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Store" DROP COLUMN "top",
ADD COLUMN     "term_of_payment" INTEGER;
