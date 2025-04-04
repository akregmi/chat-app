-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN     "memberIds" TEXT[],
ADD COLUMN     "messageIds" TEXT[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "conversationIds" TEXT[],
ADD COLUMN     "messageIds" TEXT[];
