/*
  Warnings:

  - Added the required column `tel` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "tel" TEXT NOT NULL;
