/*
  Warnings:

  - A unique constraint covering the columns `[eventId]` on the table `SeatMap` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[row]` on the table `SeatMap` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[column]` on the table `SeatMap` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `column` to the `SeatMap` table without a default value. This is not possible if the table is not empty.
  - Added the required column `row` to the `SeatMap` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SeatMap" ADD COLUMN     "column" INTEGER NOT NULL,
ADD COLUMN     "row" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SeatMap_eventId_key" ON "SeatMap"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "SeatMap_row_key" ON "SeatMap"("row");

-- CreateIndex
CREATE UNIQUE INDEX "SeatMap_column_key" ON "SeatMap"("column");
