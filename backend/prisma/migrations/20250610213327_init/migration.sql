-- CreateTable
CREATE TABLE "userType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userType" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userTypeId" INTEGER NOT NULL,
    "personId" INTEGER,
    "active" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "userPhones" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "phone" TEXT,
    "businessPhone" TEXT,
    "cellPhone" TEXT
);

-- CreateTable
CREATE TABLE "person" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpf" TEXT NOT NULL,
    "rg" TEXT,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "birthDate" DATETIME,
    "email" TEXT,
    "phonesId" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "user_login_key" ON "user"("login");

-- CreateIndex
CREATE UNIQUE INDEX "user_personId_key" ON "user"("personId");

-- CreateIndex
CREATE UNIQUE INDEX "person_cpf_key" ON "person"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "person_rg_key" ON "person"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "person_phonesId_key" ON "person"("phonesId");
