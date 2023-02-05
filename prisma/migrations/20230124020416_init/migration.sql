/*
  Warnings:

  - A unique constraint covering the columns `[value]` on the table `roles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "roles_value_key" ON "roles"("value");
