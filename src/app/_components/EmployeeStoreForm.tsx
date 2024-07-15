"use client";

import React, { useState } from "react";
import Select, { type SingleValue } from "react-select";
import "../../styles/globals.css";
import type { Option } from "types/Option";
import { submitFormData } from "~/server/actions/submitData";

interface Props {
  empsOptions: Option[];
  storesOptions: Option[];
}

const EmployeeStoreForm = ({ empsOptions, storesOptions }: Props) => {
  const [selectedEmployee, setSelectedEmployee] =
    useState<SingleValue<Option>>(null);
  const [selectedStore, setSelectedStore] = useState<SingleValue<Option>>(null);
  const [filteredStoresOptions, setFilteredStoresOptions] =
    useState<Option[]>(storesOptions);
  const [amount, setAmount] = useState(0);
  const [referenceNumber, setReferenceNumber] = useState(0);

  const filterStores = (employeeId: number) => {
    if (employeeId === 0) {
      setFilteredStoresOptions([]);
      return;
    }
    console.log(employeeId);
    console.log(storesOptions[0]);
    console.log(storesOptions[0]?.parent === employeeId);
    setFilteredStoresOptions(
      storesOptions.filter((store) => store.parent === employeeId),
    );
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      window.confirm(
        `Are you sure you want to add ${amount} LYD to "${selectedStore!.label}" for "${selectedEmployee!.label}"?`,
      )
    ) {
      await submitFormData({
        selectedEmployee,
        selectedStore,
        amount,
        referenceNumber,
      });
      setSelectedStore(null);
      setAmount(0);
      setReferenceNumber(0);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="flex items-center space-x-4">
        <label className="w-1/4 text-right" htmlFor="employeeSelect">
          Employee
        </label>
        <div className="w-3/4">
          <Select
            id="employeeSelect"
            options={empsOptions}
            value={selectedEmployee}
            onChange={(option) => {
              setSelectedEmployee(option);
              filterStores(option ? option.value : 0); // Filter stores based on the selected employee
            }}
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <label className="w-1/4 text-right" htmlFor="storeSelect">
          Select Store
        </label>
        <div className="w-3/4">
          <Select
            id="storeSelect"
            options={filteredStoresOptions}
            value={selectedStore}
            styles={{
              control: (provided) => ({
                ...provided,
                width: "100%",
              }),
            }}
            onChange={(option) => setSelectedStore(option)}
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <label className="w-1/4 text-right" htmlFor="amount">
          Amount
        </label>
        <div className="w-3/4">
          <input
            id="amount"
            type="number"
            className="w-full rounded border border-gray-300 px-4 py-2"
            value={amount}
            onChange={(e) => {
              Number(e.target.value) >= 0 && setAmount(Number(e.target.value));
            }}
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <label className="w-1/4 text-right" htmlFor="referenceNumber">
          Reference Number
        </label>
        <div className="w-3/4">
          <input
            id="referenceNumber"
            type="number"
            className="w-full rounded border border-gray-300 px-4 py-2"
            value={referenceNumber}
            onChange={(e) => {
              Number(e.target.value) >= 0 &&
                setReferenceNumber(Number(e.target.value));
            }}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default EmployeeStoreForm;
