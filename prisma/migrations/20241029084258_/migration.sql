/*
  Warnings:

  - The `isnoo` column on the `Kules` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Kules" DROP COLUMN "isnoo",
ADD COLUMN     "isnoo" BOOLEAN DEFAULT false;
