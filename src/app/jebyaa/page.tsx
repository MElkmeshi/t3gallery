import { db } from "~/server/db";
import React from "react";
import EmployeeStoreForm from "../_components/EmployeeStoreForm";

const AboutPage = async () => {
  const employeesData = await db.query.employees.findMany();
  const storesData = await db.query.pos.findMany();

  const empsOptions = employeesData.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const storesOptions = storesData.map((item) => ({
    value: item.id,
    label: item.name,
    parent: item.employeeId,
  }));

  return (
    <div className="container mx-auto mt-10 flex justify-center">
      <div className="w-full max-w-xl">
        <h1 className="mb-6 text-center text-2xl font-bold">
          Employee and Store Selection
        </h1>
        <EmployeeStoreForm
          empsOptions={empsOptions}
          storesOptions={storesOptions}
        />
      </div>
    </div>
  );
};

export default AboutPage;
