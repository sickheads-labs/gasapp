/*
  Warnings:

  - Added the required column `coupon_quantity` to the `Outcome` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'AUDITOR', 'MANAGER', 'SELLER', 'GUEST');

-- AlterTable
ALTER TABLE "Outcome" ADD COLUMN     "coupon_quantity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SalePaymentLine" ADD COLUMN     "brand" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'GUEST';
