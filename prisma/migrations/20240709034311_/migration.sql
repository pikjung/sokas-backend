/*
  Warnings:

  - Made the column `isSales` on table `Cart` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Cart" ALTER COLUMN "isSales" SET NOT NULL;
