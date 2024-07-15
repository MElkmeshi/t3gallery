"use server";
import type { Option } from "types/Option";
import { type SingleValue } from "react-select";
import { db } from "../db";
import { Collections } from "../db/schema";

interface FormData {
  selectedEmployee: SingleValue<Option>;
  selectedStore: SingleValue<Option>;
  amount: number;
  referenceNumber: number;
}

export const submitFormData = async ({
  selectedEmployee,
  selectedStore,
  amount,
  referenceNumber,
}: FormData) => {
  console.log("Form data submitted:", {
    selectedEmployee,
    selectedStore,
    amount,
    referenceNumber,
  });

  try {
    await db.insert(Collections).values({
      employeeId: selectedEmployee!.value,
      posId: selectedStore!.value,
      amount: amount,
      referenceNumber: referenceNumber,
    });
    return { success: true };
  } catch (error) {
    console.error("Error saving data to the database:", error);
    return { success: false };
  }
};
