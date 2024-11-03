-- CreateTable
CREATE TABLE "Kules" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "date_kules" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "sales_id" TEXT,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "approval" TEXT NOT NULL DEFAULT 'N',

    CONSTRAINT "Kules_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Kules" ADD CONSTRAINT "Kules_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kules" ADD CONSTRAINT "Kules_sales_id_fkey" FOREIGN KEY ("sales_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
