"use client";

import { Input } from "~/components/ui/input";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { InferSelectModel } from "drizzle-orm";
import { collections, employees, pos } from "~/server/db/schema";
import { KeyboardEventHandler, useState } from "react";
import { fetchCollection } from "~/server/actions/collections";
import { Form, useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";

type CollectionWithEmployeePos = InferSelectModel<typeof collections> & {
  employee: InferSelectModel<typeof employees>;
  pos: InferSelectModel<typeof pos>;
};

const InquiryComponet = () => {
  const form = useForm();

  const [referenceNumber, setReferenceNumber] = useState("");
  const [collection, setCollection] = useState<CollectionWithEmployeePos>({
    employee: { name: "", id: 0 },
    pos: { name: "", id: 0 },
    amount: 0,
    id: 0,
  } as CollectionWithEmployeePos);
  const [error, setError] = useState("");
  //@ts-ignore
  const handleInputChange = (e) => {
    setReferenceNumber(e.target.value);
  };

  const handleInputBlur = async () => {
    if (referenceNumber) {
      await fetchCollectionData();
    }
  };

  const fetchCollectionData = async () => {
    if (collection.referenceNumber === Number(referenceNumber)) {
      return;
    }
    setCollection({
      employee: { name: "", id: 0 },
      pos: { name: "", id: 0 },
      amount: 0,
      id: 0,
    } as CollectionWithEmployeePos);
    setError("");

    try {
      const result = await fetchCollection(referenceNumber);
      setCollection(result);
      setError("");
    } catch (err) {
      //@ts-ignore
      setError(err.message);
      setCollection({
        employee: { name: "", id: 0 },
        pos: { name: "", id: 0 },
        amount: 0,
        id: 0,
      } as CollectionWithEmployeePos);
    }
  };

  return (
    <>
      <Form
        {...form}
        onSubmit={async () => {
          await fetchCollectionData();
        }}
      >
        <Input
          type="number"
          placeholder="Reference Number"
          value={referenceNumber}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={async (e) => {
            if (e.key === "Enter" && referenceNumber) {
              await fetchCollectionData();
            }
          }}
          className="w-[570px]"
        />
        <div className="mt-3 flex justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </Form>
      {error && <p className="mt-2 text-red-500">{error}</p>}
      {collection.id !== 0 && (
        <Card className="mt-6 w-[600px]">
          <CardHeader>
            <CardTitle>{collection.pos.name}</CardTitle>
            <CardDescription>{collection.employee.name}</CardDescription>
            <CardDescription>{collection.amount} LYD</CardDescription>
          </CardHeader>
        </Card>
      )}
    </>
  );
};

export default InquiryComponet;
