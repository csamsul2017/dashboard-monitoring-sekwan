-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nip" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role_id" INTEGER,
    "dept_id" INTEGER,
    "status" INTEGER,
    "last_login" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "password" TEXT NOT NULL,
    CONSTRAINT "User_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "User_dept_id_fkey" FOREIGN KEY ("dept_id") REFERENCES "Department" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("created_at", "dept_id", "email", "id", "last_login", "name", "nip", "password", "role_id", "status", "updated_at") SELECT "created_at", "dept_id", "email", "id", "last_login", "name", "nip", "password", "role_id", "status", "updated_at" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_nip_key" ON "User"("nip");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
