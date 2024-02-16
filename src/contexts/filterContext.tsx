"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

import { TodoPriorities } from "@/requests/todos/types/Todo";

import { SortingField } from "../components/TodoTable/TodoControls/types/sortingTypes";

const FilterContext = createContext({
  priorityField: "all",
  changePriorityField: (value: "all" | TodoPriorities) => {},
  sortingField: "updatedAt",
  changeSortingField: (value: SortingField) => {},
});

export const useFilter = () => useContext(FilterContext);

type FilterProviderProps = {
  children: ReactNode;
};

export const FilterProvider = ({ children }: FilterProviderProps) => {
  const [sortingField, setSortingField] = useState("updatedAt");
  const [priorityField, setPriorityField] = useState<"all" | TodoPriorities>("all");

  const changeSortingField = (value: SortingField) => {
    setSortingField(value);
  };

  const changePriorityField = (value: "all" | TodoPriorities) => {
    setPriorityField(value);
  };

  return (
    <FilterContext.Provider
      value={{
        sortingField,
        priorityField,
        changeSortingField,
        changePriorityField
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
