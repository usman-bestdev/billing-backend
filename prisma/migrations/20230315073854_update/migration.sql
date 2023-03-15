/*
  Warnings:

  - Made the column `routeId` on table `userTokens` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `userTokens` MODIFY `routeId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `userTokens` ADD CONSTRAINT `userTokens_routeId_fkey` FOREIGN KEY (`routeId`) REFERENCES `routes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
