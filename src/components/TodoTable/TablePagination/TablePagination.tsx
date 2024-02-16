"use client";
import Pagination from "react-bootstrap/Pagination";

import { usePagination } from "@/contexts/paginationContext";

import styles from './TablePagination.module.css'

type PaginationProps = {
  amountOfPages: number;
};

function TablePagination({ amountOfPages }: PaginationProps) {
  const { currentPage, nextPage, prevPage, changePage } =
    usePagination();

  const pages = Array.from({ length: amountOfPages }, (_, index) => index + 1);

  return (
    <div className={styles.paginationWrapper}>
      <Pagination>
        <Pagination.First onClick={() => changePage(1)} />
        <Pagination.Prev onClick={prevPage} />
        {pages.map((page) => (
          <Pagination.Item
            key={page}
            active={page === currentPage}
            onClick={() => changePage(page)}
          >
            {page}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={nextPage} />
        <Pagination.Last onClick={() => changePage(amountOfPages)} />
      </Pagination>
    </div>
  );
}

export default TablePagination;
