-- AlterTable
ALTER TABLE "Cart" ALTER COLUMN "discount" DROP NOT NULL,
ALTER COLUMN "discount" DROP DEFAULT,
ALTER COLUMN "discount" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "salesNote" TEXT;

-- AlterTable
ALTER TABLE "TransactionDetail" ALTER COLUMN "discount" SET DATA TYPE TEXT;
