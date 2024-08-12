/*
  Warnings:

  - You are about to drop the column `salesNotes` on the `Cart` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "salesNotes",
ADD COLUMN     "salesNote" TEXT;
