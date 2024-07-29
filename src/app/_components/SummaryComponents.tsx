"use client";
import { addDays, format, subDays } from "date-fns";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
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
import { Button } from "~/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { fetchCollection } from "~/server/actions/collections";
import { getEmployeeSummary } from "~/server/actions/summary";

interface Props {
  empsOptions: Option[];
}

function SummaryComponents({ empsOptions }: Props) {
  const form = useForm();
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 20),
    to: new Date(),
  });
  const [error, setError] = useState<string>("");
  const [empSummary, setEmpSummary] = useState({
    employee: { name: "", id: 0 },
    totalAmount: 0,
    empAmount: 0,
  });

  const fetchEmpSummary = async () => {
    if (!date) {
      return;
    }
    try {
      const result = await getEmployeeSummary(date, Number(selectedEmployee));
      setEmpSummary(result);
      console.log(result);
      setError("");
    } catch (err) {
      //@ts-ignore
      setError(err.message);
    }
  };

  return (
    <>
      <Form {...form}>
        <div className="flex items-center justify-center space-x-4">
          <div className="w-3/4">
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
                    <DatePickerWithRange date={date} setDate={setDate} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="mt-3 flex justify-end">
              <Button
                type="submit"
                onClick={() => {
                  fetchEmpSummary();
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </Form>
      {error && <p className="mt-2 text-red-500">{error}</p>}
      {empSummary.employee.id !== 0 && (
        <Card className="mt-6 w-[600px]">
          <CardHeader>
            <CardTitle>{empSummary.employee.name}</CardTitle>
            <CardDescription>{empSummary.empAmount}</CardDescription>
            <CardDescription>{empSummary.totalAmount} LYD</CardDescription>
          </CardHeader>
        </Card>
      )}
    </>
  );
}

export default SummaryComponents;
