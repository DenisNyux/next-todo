"use client";

import { useEffect, useState } from "react";

import { useFilter } from "@/contexts/filterContext";
import { usePagination } from "@/contexts/paginationContext";
import { AllTodosResponse } from "@/requests/todos/types/Todo";

import TableNotFoundFilters from "./TableNotFoundFilters/TableNotFoundFilters";
import TablePagination from "./TablePagination/TablePagination";
import TodoControls from "./TodoControls/TodoControls";
import TodoItem from "./TodoItem/TodoItem";
import styles from "./TodoTable.module.css";
import AnimatedLoader from "../AnimatedLoader/AnimatedLoader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function TodoTable({activeTodos=false}: {activeTodos?: boolean}) {
  const [todosData, setTodosData] = useState<
    AllTodosResponse | null | undefined
  >(undefined);
  const [amountOfPages, setAmountOfPages] = useState(0);
  const { currentPage, itemsPerPage, changeAmountOfPages } =
    usePagination();

  const { sortingField, priorityField } = useFilter();

  useEffect(() => {
    const getData = async () => {
      const todos = await fetch(
        `/api/?page=${currentPage}&pageSize=${itemsPerPage}&pageCount=true&sortingField=${sortingField}&priorityField=${priorityField}&activeTodos=${activeTodos}`,
        {
          method: "GET",
          next: { revalidate: 0 }
        }
      )
        .then((response) => response.json())
        .catch((error) => error.error.status);


      if (todos.cause) {
        console.error(
          `При отправке запроса произошла ошибка. Вероятно бэкенд-сервер отключен. Код: ${todos.cause.code}`
        );
        setTodosData(null);
      }

      if (todos.error) {
        console.error(
          `При отправке запроса произошла ошибка. Статус: ${todos.error.status}`
        );
        setTodosData(null);
      } 
      
      if (todos.data) {
        setTodosData(todos);
        setAmountOfPages(todos.meta.pagination.pageCount);
        changeAmountOfPages(todos.meta.pagination.pageCount);
      }
    };
    getData();
  }, [currentPage, itemsPerPage, amountOfPages, sortingField, priorityField, activeTodos, changeAmountOfPages]);

  return (
    <>
      {todosData === undefined && <AnimatedLoader/>}
      {todosData === null && <ErrorMessage/>}
      
      {todosData &&
        <>
          <TodoControls />
          <div className={styles.todosList}>
            {todosData?.data.length === 0 && <TableNotFoundFilters/>} 
            {todosData?.data.map((todoItem) => (
              <TodoItem
                key={`todo-${todoItem.id}`}
                todoId={String(todoItem.id)}
                title={todoItem.attributes.todoTitle}
                priority={todoItem.attributes.todoPriority}
                todoDone={todoItem.attributes.todoDone}
                todoDescription={todoItem.attributes.todoDescription}
              />
            ))}
          </div>
          <TablePagination amountOfPages={amountOfPages} />
        </>
      }
    </>
  );
}

export default TodoTable;
