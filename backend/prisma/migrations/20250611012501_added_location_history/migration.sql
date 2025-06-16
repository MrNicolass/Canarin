-- CreateTable
CREATE TABLE "location_history" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "street" TEXT,
    "neighborhood" TEXT,
    "city" TEXT,
    "state" TEXT,
    "postalCode" TEXT,
    "country" TEXT,
    CONSTRAINT "location_history_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_person" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpf" TEXT NOT NULL,
    "rg" TEXT,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "birthDate" DATETIME,
    "email" TEXT,
    "phonesId" INTEGER,
    CONSTRAINT "person_phonesId_fkey" FOREIGN KEY ("phonesId") REFERENCES "userPhones" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_person" ("birthDate", "cpf", "email", "id", "lastName", "name", "phonesId", "rg") SELECT "birthDate", "cpf", "email", "id", "lastName", "name", "phonesId", "rg" FROM "person";
DROP TABLE "person";
ALTER TABLE "new_person" RENAME TO "person";
CREATE UNIQUE INDEX "person_cpf_key" ON "person"("cpf");
CREATE UNIQUE INDEX "person_rg_key" ON "person"("rg");
CREATE UNIQUE INDEX "person_phonesId_key" ON "person"("phonesId");
CREATE TABLE "new_user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userTypeId" INTEGER NOT NULL,
    "personId" INTEGER,
    "active" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "user_userTypeId_fkey" FOREIGN KEY ("userTypeId") REFERENCES "userType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "user_personId_fkey" FOREIGN KEY ("personId") REFERENCES "person" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_user" ("active", "id", "login", "password", "personId", "userTypeId") SELECT "active", "id", "login", "password", "personId", "userTypeId" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_login_key" ON "user"("login");
CREATE UNIQUE INDEX "user_personId_key" ON "user"("personId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
