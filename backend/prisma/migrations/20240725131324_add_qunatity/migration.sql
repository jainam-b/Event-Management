-- DropForeignKey
ALTER TABLE "SeatMap" DROP CONSTRAINT "SeatMap_userId_fkey";

-- AlterTable
ALTER TABLE "SeatMap" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "SeatMap" ADD CONSTRAINT "SeatMap_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
