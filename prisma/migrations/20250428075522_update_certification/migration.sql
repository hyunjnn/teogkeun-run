/*
  Warnings:

  - You are about to drop the column `tags` on the `Certification` table. All the data in the column will be lost.
  - Added the required column `date` to the `Certification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `drawnTime` to the `Certification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Certification" DROP COLUMN "tags",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "drawnTime" TEXT NOT NULL,
ADD COLUMN     "tag" TEXT[],
ALTER COLUMN "imageUrl" DROP NOT NULL;
