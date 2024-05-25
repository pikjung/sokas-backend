/*
  Warnings:

  - A unique constraint covering the columns `[kode]` on the table `Store` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Store_kode_key" ON "Store"("kode");
