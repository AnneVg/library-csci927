/*
  Warnings:

  - Added the required column `due_date` to the `borrowing_book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "borrowing_book" ADD COLUMN     "due_date" TIMESTAMPTZ NOT NULL;
