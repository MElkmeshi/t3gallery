"use server";

import { eq, and, gte, lte, sql } from "drizzle-orm";
import { db } from "~/server/db";
import { collections, employees } from "~/server/db/schema";
import { DateRange } from "react-day-picker";

export async function getEmployeeSummary(
  date: DateRange,
  selectedEmployee: number,
) {
  if (!date.from || !selectedEmployee) {
    throw new Error("Both date range and employee must be specified.");
  }

  const [employee] = await db
    .select({
      name: employees.name,
      id: employees.id,
    })
    .from(employees)
    .where(eq(employees.id, selectedEmployee));
  if (!employee) {
    throw new Error("Employee not found.");
  }
  // @ts-ignore
  const [result]: {
    totalAmount: number;
  }[] = await db
    .select({ totalAmount: sql`SUM(${collections.amount})` })
    .from(collections)
    .where(
      and(
        eq(collections.employeeId, selectedEmployee),
        gte(collections.createdAt, date.from),
        lte(collections.createdAt, date.to!),
      ),
    );
  if (!result) {
    throw new Error("No collections found.");
  }
  return {
    employee,
    totalAmount: result.totalAmount,
    empAmount: result.totalAmount * 0.005,
  };
}
