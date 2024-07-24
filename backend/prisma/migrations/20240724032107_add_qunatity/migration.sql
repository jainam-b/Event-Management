-- CreateEnum
CREATE TYPE "userRole" AS ENUM ('user', 'admin', 'eventPlanner');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "userRole" NOT NULL DEFAULT 'user';
