"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

import { SortingField } from "../components/TodoTable/TodoControls/types/sortingTypes";

const PaginationContext = createContext({
  currentPage: 1,
  itemsPerPage: 5,
  amountOfPages: 1,
  changePage: (value:number) => {},
  changeAmountOfPages: (value: number) => {},
  changeItemsPerPage: (value: number) => {},
  nextPage: () => {},
  prevPage: () => {},
});

export const usePagination = () => useContext(PaginationContext);

type PaginationProviderProps = {
  children: ReactNode;
};

export const PaginationProvider = ({ children }: PaginationProviderProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [amountOfPages, setAmountOfPages] = useState(1);

  const nextPage = () =>
    setCurrentPage((prevPage) => {
      if (prevPage === amountOfPages) return prevPage;
      if (prevPage > amountOfPages) return amountOfPages;
      return prevPage + 1;
    });
  const prevPage = () =>
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  const changeItemsPerPage = (value: number) => {
    setItemsPerPage(value);
  };

  const changePage = (value: number) => {
    if (value > amountOfPages) setCurrentPage(amountOfPages);
    if (value < 1) setCurrentPage(1);
    setCurrentPage(value)
  }

  const changeAmountOfPages = (value: number) => {
    setAmountOfPages(value);
    if (currentPage > amountOfPages) setCurrentPage(amountOfPages);
  };


  return (
    <PaginationContext.Provider
      value={{
        currentPage,
        itemsPerPage,
        amountOfPages,
        changePage,
        changeAmountOfPages,
        changeItemsPerPage,
        nextPage,
        prevPage,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};
