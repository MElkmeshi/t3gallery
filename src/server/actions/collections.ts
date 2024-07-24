"use server";

import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { collections } from "~/server/db/schema";

export async function fetchCollection(referenceNumber: string) {
  if (!referenceNumber) {
    throw new Error("Reference number is required");
  }
  const result = await db.query.collections.findFirst({
    with: { employee: true, pos: true },
    where: eq(collections.referenceNumber, parseInt(referenceNumber)),
  });
  if (!result) {
    throw new Error("Collection not found");
  }

  return result;
}

//https://chatgpt.com/c/c1b5a3ad-333f-4888-901b-fc15ba917f76
