/*
  Warnings:

  - Made the column `userId` on table `userTokens` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `userTokens_routeId_userId_key` ON `userTokens`;

-- DropIndex
DROP INDEX `users_email_password_type_key` ON `users`;

-- AlterTable
ALTER TABLE `userTokens` MODIFY `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `userTokens` ADD CONSTRAINT `userTokens_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
