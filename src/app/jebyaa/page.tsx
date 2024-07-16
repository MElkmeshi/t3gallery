import { db } from "~/server/db";
import React from "react";
import EmployeeStoreForm from "../_components/EmployeeStoreForm";
import type { Option } from "types/Option";

const AboutPage = async () => {
  const employeesData = await db.query.employees.findMany();
  const posData = await db.query.pos.findMany();

  const empsOptions: Option[] = employeesData.map((item) => ({
    label: item.name,
    value: item.id.toString(10),
  }));

  const posOptions: Option[] = posData.map((item) => ({
    value: item.id.toString(10),
    label: item.name,
    parent: item.employeeId.toString(10),
  }));

  return (
    <div className="container mx-auto mt-10 flex justify-center">
      <div className="w-full max-w-xl">
        <h1 className="mb-6 text-center text-2xl font-bold">Jebyaa</h1>
        <EmployeeStoreForm empsOptions={empsOptions} posOptions={posOptions} />
      </div>
    </div>
  );
};

export default AboutPage;
