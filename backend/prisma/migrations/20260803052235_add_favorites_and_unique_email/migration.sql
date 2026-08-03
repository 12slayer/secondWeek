/*
  Warnings:

  - You are about to drop the column `jobTitle` on the `profiles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "jobTitle",
ADD COLUMN     "is_favorite" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "job_title" TEXT DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "profiles_email_key" ON "profiles"("email");
