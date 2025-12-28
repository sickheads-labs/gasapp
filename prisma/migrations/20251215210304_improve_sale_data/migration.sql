/*
  Warnings:

  - You are about to drop the column `details` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `discounts` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `payments` on the `Sale` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Sale" DROP COLUMN "details",
DROP COLUMN "discounts",
DROP COLUMN "payments";

-- CreateTable
CREATE TABLE "SaleDetailLine" (
    "id" TEXT NOT NULL,
    "sale_id" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_price" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "SaleDetailLine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalePaymentLine" (
    "id" TEXT NOT NULL,
    "sale_id" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "authorization_code" TEXT,
    "folio" TEXT,

    CONSTRAINT "SalePaymentLine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SaleDiscountLine" (
    "id" TEXT NOT NULL,
    "sale_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "description" TEXT,
    "total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "SaleDiscountLine_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SaleDetailLine" ADD CONSTRAINT "SaleDetailLine_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "Sale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalePaymentLine" ADD CONSTRAINT "SalePaymentLine_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "Sale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleDiscountLine" ADD CONSTRAINT "SaleDiscountLine_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "Sale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
