import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { employees, pos } from "./schema";
import * as dotenv from "dotenv";
import employeesData from "../../../data/employees";
import posData from "../../../data/pos";
dotenv.config();

if (!("POSTGRES_URL" in process.env))
  throw new Error("POSTGRES_URL not found on .env.development");

const client = new Pool({
  connectionString: process.env.POSTGRES_URL,
});
const db = drizzle(client);

const employeesSeed = async () => {
  const data: (typeof employees.$inferInsert)[] = [];
  employeesData.map((employee) => {
    data.push({
      id: Number(employee.userId),
      name: employee.fullName,
      email: employee.userEmail,
      password: "123456",
      mobile: employee.userPhoneForLogIn,
      role: employee.accountTypeName.name_en,
    });
  });

  console.log("Seed start");
  await db.insert(employees).values(data);
  console.log("Seed done");
};

const posSeed = async () => {
  const data: (typeof pos.$inferInsert)[] = [];
  posData.map((POS) => {
    data.push({
      id: Number(POS.userId),
      name: POS.fullName,
      email: POS.userEmail,
      mobile: POS.userPhoneForLogIn,
      employeeId: Number(POS.posParentId),
    });
  });

  console.log("Seed start");
  await db.insert(pos).values(data);
  console.log("Seed done");
};

void employeesSeed();
void posSeed();
