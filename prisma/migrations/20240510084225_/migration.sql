/*
  Warnings:

  - You are about to drop the column `lat` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `long` on the `Store` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Store" DROP COLUMN "lat",
DROP COLUMN "long",
ADD COLUMN     "latitude" TEXT,
ADD COLUMN     "longitude" TEXT;
