"use client";
import React, { useEffect, useState } from "react";

import { Offcanvas } from "react-bootstrap";
import { Button } from "react-bootstrap";

import { useFilter } from "@/contexts/filterContext";
import { usePagination } from "@/contexts/paginationContext";
import { TodoPriorities } from "@/requests/todos/types/Todo";

import styles from "./TodoControls.module.css";
import {
  SortingField,
  SortingFieldSelectOptions,
  PriorityFieldSelectOptions,
} from "./types/sortingTypes";

function TodoControls() {
  const [selectedItemsCount, setSelectedItemsCount] = useState(5);
  const [selectedSortingType, setSelectedSortingType] =
    useState<SortingField>("updatedAt");
  const [selectedPriorityType, setSelectedPriorityType] = useState<
    "all" | TodoPriorities
  >("all");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { changeItemsPerPage } = usePagination();
  const { changeSortingField, changePriorityField } = useFilter();

  useEffect(() => {
    changeItemsPerPage(selectedItemsCount);
  }, [selectedItemsCount, changeItemsPerPage]);

  useEffect(() => {
    changeSortingField(selectedSortingType);
  }, [selectedSortingType, changeSortingField]);

  useEffect(() => {
    changePriorityField(selectedPriorityType);
  }, [selectedPriorityType, changePriorityField]);

  return (
    <>
      <div className={styles.todoControlsContainer}>
        <div className={styles.todoDisplay}>
          <span>Количество заметок на странице: </span>
          <select
            value={selectedItemsCount}
            onChange={(e) => setSelectedItemsCount(Number(e.target.value))}
            className="form-select"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </div>
        <div className={styles.todoFilters}>
          <div>
            <span>Приоритет: </span>
            <select
              className="form-select"
              value={selectedPriorityType}
              onChange={(e) =>
                setSelectedPriorityType(
                  e.target.value as "all" | TodoPriorities
                )
              }
            >
              {priorityFieldEnum.map((field) => (
                <option key={field.value} value={field.value}>
                  {field.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <span>Сортировать по: </span>
            <select
              className="form-select"
              value={selectedSortingType}
              onChange={(e) =>
                setSelectedSortingType(e.target.value as SortingField)
              }
            >
              {sortingFieldEnum.map((field) => (
                <option key={field.value} value={field.value}>
                  {field.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className={styles.todoControlsOffcanvas}>
        <Button variant="primary" className="d-lg-none" onClick={handleShow}>
          Параметры вывода
        </Button>
        <Offcanvas show={show} onHide={handleClose} responsive="lg">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Параметры вывода</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className={styles.todoControlsOffcanvas}>
            <div >
              <span>Количество заметок на странице: </span>
              <select
                value={selectedItemsCount}
                onChange={(e) => setSelectedItemsCount(Number(e.target.value))}
                className="form-select"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </div>

            <div>
              <span>Приоритет: </span>
              <select
                className="form-select"
                value={selectedPriorityType}
                onChange={(e) =>
                  setSelectedPriorityType(
                    e.target.value as "all" | TodoPriorities
                  )
                }
              >
                {priorityFieldEnum.map((field) => (
                  <option key={field.value} value={field.value}>
                    {field.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <span>Сортировать по: </span>
              <select
                className="form-select"
                value={selectedSortingType}
                onChange={(e) =>
                  setSelectedSortingType(e.target.value as SortingField)
                }
              >
                {sortingFieldEnum.map((field) => (
                  <option key={field.value} value={field.value}>
                    {field.label}
                  </option>
                ))}
              </select>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
}

const priorityFieldEnum: PriorityFieldSelectOptions[] = [
  {
    value: "all",
    label: "Все",
  },
  {
    value: "critical",
    label: "Критический",
  },
  {
    value: "important",
    label: "Важный",
  },
  {
    value: "standart",
    label: "Стандартный",
  },
  {
    value: "unimportant",
    label: "Низкий",
  },
];

const sortingFieldEnum: SortingFieldSelectOptions[] = [
  {
    value: "todoTitle",
    label: "Заголовок",
  },
  {
    value: "todoPriority",
    label: "Приоритет",
  },
  {
    value: "createdAt",
    label: "Дата создания",
  },
  {
    value: "updatedAt",
    label: "Дата обновления",
  },
];

export default TodoControls;
