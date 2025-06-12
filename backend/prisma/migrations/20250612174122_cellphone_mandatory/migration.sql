/*
  Warnings:

  - Made the column `cellPhone` on table `userPhones` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_userPhones" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "phone" TEXT,
    "businessPhone" TEXT,
    "cellPhone" TEXT NOT NULL
);
INSERT INTO "new_userPhones" ("businessPhone", "cellPhone", "id", "phone") SELECT "businessPhone", "cellPhone", "id", "phone" FROM "userPhones";
DROP TABLE "userPhones";
ALTER TABLE "new_userPhones" RENAME TO "userPhones";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
