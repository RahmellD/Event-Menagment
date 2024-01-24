/*
  Warnings:

  - Added the required column `end_registration` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_registration` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Event` ADD COLUMN `end_registration` DATETIME(3) NOT NULL,
    ADD COLUMN `start_registration` DATETIME(3) NOT NULL;
