-- CreateTable
CREATE TABLE "monitoringFIle" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "filepath" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "monitoringFIle_pkey" PRIMARY KEY ("id")
);
