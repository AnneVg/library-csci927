/*
  Warnings:

  - You are about to drop the column `category` on the `borrowing_book` table. All the data in the column will be lost.
  - You are about to drop the column `isbn` on the `borrowing_book` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `borrowing_book` table. All the data in the column will be lost.
  - You are about to drop the column `short_description` on the `borrowing_book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "borrowing_book" DROP COLUMN "category",
DROP COLUMN "isbn",
DROP COLUMN "location",
DROP COLUMN "short_description";
