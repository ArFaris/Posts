/*
  Warnings:

  - A unique constraint covering the columns `[serialNumber]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Post" ADD COLUMN     "serialNumber" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Post_serialNumber_key" ON "public"."Post"("serialNumber");
