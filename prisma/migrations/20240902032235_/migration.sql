/*
  Warnings:

  - You are about to drop the column `pendingNote` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "pendingNote",
ADD COLUMN     "pending_note" TEXT;
