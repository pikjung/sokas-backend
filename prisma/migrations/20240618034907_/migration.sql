-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "UserId" TEXT,
ADD COLUMN     "created_by" TEXT,
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
