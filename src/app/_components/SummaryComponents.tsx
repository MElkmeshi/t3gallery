"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Option } from "types/Option";
import { DatePickerWithRange } from "~/components/ui/DatePickerWithRange";
import { Combobox } from "~/components/ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

interface Props {
  empsOptions: Option[];
}

function SummaryComponents({ empsOptions }: Props) {
  const form = useForm();
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="Employee"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Employee</FormLabel>
            <FormControl>
              <Combobox
                options={empsOptions}
                name="Employee"
                onChange={(value) => {
                  setSelectedEmployee(value);
                }}
                value={selectedEmployee || ""}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="Date"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Date</FormLabel>
            <FormControl>
              <DatePickerWithRange />
            </FormControl>
          </FormItem>
        )}
      />
    </Form>
  );
}

export default SummaryComponents;
