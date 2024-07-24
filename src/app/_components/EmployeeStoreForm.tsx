"use client";

import React, { useState } from "react";
import "../../styles/globals.css";
import type { Option } from "types/Option";
import { submitFormData } from "~/server/actions/submitData";
import { Combobox } from "~/components/ui/combobox";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { useToast } from "~/components/ui/use-toast";

interface Props {
  empsOptions: Option[];
  posOptions: Option[];
}

const EmployeeStoreForm = ({ empsOptions, posOptions }: Props) => {
  const { toast } = useToast();
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [selectedPos, setSelectedPos] = useState<string>("");
  const [filteredStoresOptions, setFilteredStoresOptions] = useState<Option[]>(
    [],
  );
  const [amount, setAmount] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const filterStores = (employeeId: string) => {
    if (employeeId === "") {
      setFilteredStoresOptions([]);
      return;
    }
    setFilteredStoresOptions(
      posOptions.filter((store) => store.parent === employeeId),
    );
  };
  const handleSubmit = async () => {
    setSubmitting(true);
    const res = await submitFormData({
      selectedEmployee: parseInt(selectedEmployee),
      selectedPos: parseInt(selectedPos),
      amount: parseInt(amount),
      referenceNumber: parseInt(referenceNumber),
    });
    setSubmitting(false);
    if (res.success) {
      toast({
        title: "You did it!",
      });
      setSelectedPos("");
      setAmount("");
      setReferenceNumber("");
    } else {
      toast({
        title: "Something went wrong",
        description: "The Reference number may already exists",
        variant: "destructive",
      });
    }
  };

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="flex items-center space-x-4">
        <label className="w-1/4 text-right" htmlFor="employeeSelect">
          Employee
        </label>
        <div className="w-3/4">
          <Combobox
            options={empsOptions}
            name="Employee"
            onChange={(value) => {
              setSelectedEmployee(value);
              console.log(value);
              filterStores(value);
            }}
            value={selectedEmployee || ""}
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <label className="w-1/4 text-right" htmlFor="storeSelect">
          Select POS
        </label>
        <div className="w-3/4">
          <Combobox
            options={filteredStoresOptions}
            name="POS"
            onChange={(value) => {
              setSelectedPos(value);
              console.log(value);
            }}
            value={selectedPos || ""}
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <label className="w-1/4 text-right" htmlFor="amount">
          Amount
        </label>
        <div className="w-3/4">
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => {
              Number(e.target.value) >= 0 && setAmount(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <label className="w-1/4 text-right" htmlFor="referenceNumber">
          Reference Number
        </label>
        <div className="w-3/4">
          <Input
            id="referenceNumber"
            type="number"
            value={referenceNumber}
            onChange={(e) => {
              Number(e.target.value) >= 0 && setReferenceNumber(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <AlertDialog>
          <AlertDialogTrigger
            disabled={
              !selectedEmployee ||
              !selectedPos ||
              parseInt(amount) <= 0 ||
              amount == "" ||
              referenceNumber == "" ||
              parseInt(referenceNumber) <= 0
            }
          >
            <Button
              type="submit"
              disabled={
                !selectedEmployee ||
                !selectedPos ||
                parseInt(amount) <= 0 ||
                amount == "" ||
                referenceNumber == "" ||
                parseInt(referenceNumber) <= 0 ||
                isSubmitting
              }
            >
              Submit
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                {`Are you sure you want to add ${amount} LYD to "${selectedPos}"?`}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSubmit}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </form>
  );
};

export default EmployeeStoreForm;
