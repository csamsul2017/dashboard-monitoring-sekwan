/*
  Warnings:

  - You are about to drop the column `headId` on the `Department` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Department" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dept_code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "head_id" TEXT,
    CONSTRAINT "Department_head_id_fkey" FOREIGN KEY ("head_id") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Department" ("dept_code", "id", "name") SELECT "dept_code", "id", "name" FROM "Department";
DROP TABLE "Department";
ALTER TABLE "new_Department" RENAME TO "Department";
CREATE UNIQUE INDEX "Department_dept_code_key" ON "Department"("dept_code");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
