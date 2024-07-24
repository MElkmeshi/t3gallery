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
    <div className="container mx-auto mt-10 flex justify-center">
      <div className="w-full max-w-xl">
        <h1 className="mb-6 text-center text-2xl font-bold">Jebyaa</h1>
        <SummaryComponents empsOptions={empsOptions} />
        <iframe
          title="ammmar"
          width="600"
          height="373.5"
          src="https://app.powerbi.com/view?r=eyJrIjoiOTg1MTllNGItNWVhNi00YTg1LTgwMGEtMjMwOGEzNDdhOWIwIiwidCI6ImUxY2JhZWEwLWY4YzgtNGNlNy1hNDg0LWFkZTY3MmY1NWY4ZCJ9"
          frameborder="0"
          allowFullScreen="true"
        ></iframe>
      </div>
    </div>
  );
}

export default Summary;
