"use server";
import { db } from "../db";
import { collections } from "../db/schema";

interface FormData {
  selectedEmployee: number;
  selectedPos: number;
  amount: number;
  referenceNumber: number;
}

export const submitFormData = async ({
  selectedEmployee,
  selectedPos,
  amount,
  referenceNumber,
}: FormData) => {
  try {
    await db.insert(collections).values({
      amount: amount,
      referenceNumber: referenceNumber,
      employeeId: selectedEmployee,
      posId: selectedPos,
    });
    return { success: true };
  } catch (error) {
    console.error("Error saving data to the database:", error);
    return { success: false };
  }
};
