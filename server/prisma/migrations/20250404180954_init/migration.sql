/*
  Warnings:

  - You are about to drop the column `messageIds` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `messageIds` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Conversation" DROP COLUMN "messageIds";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "messageIds";
