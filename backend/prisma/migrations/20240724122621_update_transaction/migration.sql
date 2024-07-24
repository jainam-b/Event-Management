/*
  Warnings:

  - Added the required column `ticketTypesId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "ticketTypesId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_ticketTypesId_fkey" FOREIGN KEY ("ticketTypesId") REFERENCES "TicketType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
