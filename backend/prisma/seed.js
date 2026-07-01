import prisma from "../src/config/db.js";
import bcrypt from "bcrypt";

const hashedPassword = await bcrypt.hash("admin1234", 10);

await prisma.department.createMany({
  data: [
    { id: 0, deptCode: "umum", name: "Bagian Umum" },
    { id: 1, deptCode: "humas", name: "Bagian Humas" },
    { id: 2, deptCode: "keuangan", name: "Bagian Keuangan" },
    { id: 3, deptCode: "persidangan", name: "Bagian Persidangan" },
  ],
});

await prisma.role.createMany({
  data: [
    { id: 0, roleCode: "superadmin", title: "Super Administrator" },
    { id: 1, roleCode: "kabag", title: "Kepala Bagian" },
    { id: 2, roleCode: "staf", title: "Staf Pelaksana" },
    { id: 3, roleCode: "viewer", title: "Pemantau Data" },
  ],
});

await prisma.user.createMany({
  data: [
    {
      id: "usr-100",
      name: "admin",
      email: "admin@admin.com",
      isActive: true,
      password: hashedPassword,
    },
  ],
});
