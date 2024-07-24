"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import type { Option } from "types/Option";

interface Props {
  options: Option[];
  name: string;
  onChange: (value: string) => void;
  value: string;
}

export function Combobox({ options, name, onChange, value }: Props) {
  const [open, setOpen] = React.useState(false);

  const selectedOption = options.find((framework) => framework.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedOption ? selectedOption.label : `Select ${name}...`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-h-screen min-w-[5750px] overflow-y-auto p-0">
        <Command>
          <CommandInput placeholder={`Search ${name}s...`} />
          <CommandEmpty>No {name} found.</CommandEmpty>
          <CommandGroup className="max-h-[250px] overflow-y-auto">
            {options && options.length > 0 ? (
              options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={`${option.label} * ${option.value}`}
                  onSelect={(currentValue) => {
                    onChange(
                      currentValue === value
                        ? ""
                        : currentValue.split(" * ")[1]!,
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))
            ) : (
              <div>No {name}s available</div>
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
