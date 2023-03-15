/*
  Warnings:

  - A unique constraint covering the columns `[routeId,userId]` on the table `userTokens` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email,password,type]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `userTokens_routeId_userId_key` ON `userTokens`(`routeId`, `userId`);

-- CreateIndex
CREATE UNIQUE INDEX `users_email_password_type_key` ON `users`(`email`, `password`, `type`);
