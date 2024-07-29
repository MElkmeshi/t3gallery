import React from "react";
import { Option } from "types/Option";
import { db } from "~/server/db";
import SummaryComponents from "../_components/SummaryComponents";

async function Summary() {
  const employeesData = await db.query.employees.findMany();
  const empsOptions: Option[] = employeesData.map((item) => ({
    label: item.name,
    value: item.id.toString(10),
  }));

  return (
    <div className="container mx-auto mt-5 flex justify-center">
      <div className="w-full max-w-xl">
        <h1 className="mb-6 text-center text-2xl font-bold ">Summary</h1>
        <SummaryComponents empsOptions={empsOptions} />
      </div>
    </div>
  );
}

export default Summary;
