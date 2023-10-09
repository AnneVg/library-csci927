/*
  Warnings:

  - You are about to drop the column `category` on the `book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "book" DROP COLUMN "category",
ADD COLUMN     "category_id" TEXT;

-- AddForeignKey
ALTER TABLE "book" ADD CONSTRAINT "book_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
