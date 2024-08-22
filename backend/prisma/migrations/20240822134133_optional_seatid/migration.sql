-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_seatId_fkey";

-- AlterTable
ALTER TABLE "Ticket" ALTER COLUMN "seatId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "SeatMap"("id") ON DELETE SET NULL ON UPDATE CASCADE;
