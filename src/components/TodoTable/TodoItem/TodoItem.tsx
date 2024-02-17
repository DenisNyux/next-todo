"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { Button, FormCheck } from "react-bootstrap";

import { useFirstRender } from "@/hooks/useFirstRender";
import ChangeTodoModal from "@/modals/ChangeTodoModal/ChangeTodoModal";
import {
  TodoPriorities,
  TodoDescription,
} from "@/requests/todos/types/Todo";
import { PutTodoRequestBody } from "@/requests/todos/types/Todo";

import ChangeItemButton from "./ChangeItemButton/ChangeItemButton";
import styles from "./TodoItem.module.css";
import TodoPriorityBadge from "../../TodoPriorityBadge/TodoPriorityBadge";

type TodoItemProps = {
  title: string;
  todoId: string;
  priority: TodoPriorities;
  todoDescription: TodoDescription;
  todoDone: boolean;
};

function TodoItem({
  title,
  priority,
  todoDescription,
  todoId,
  todoDone,
}: TodoItemProps) {
  const [markedDone, setMarkedDone] = useState(todoDone);

  const firstRender = useFirstRender();

  useEffect(() => {
    const putData = async () => {
      const requestBody: PutTodoRequestBody = {
        data: {
          todoDone: markedDone,
        },
      };

      const requestParams = {
        method: "PUT",
        next: { revalidate: 0 },
        body: JSON.stringify(requestBody),
      };

      const resp = await fetch(`/api/?todoId=${todoId}`, requestParams).then(
        (data) => data.json()
      );
    };
    if (!firstRender) {
      putData();
    }
  }, [markedDone, firstRender, todoId]);

  return (
    <div className={styles.todoItem}>
      <div className={styles.todoItemHeader}>
        <Link href={`/${todoId}`}>
          <h3 className={markedDone ? styles.crossed : ""}>{title}</h3>
        </Link>
      </div>
      <div className={styles.todoItemButtons}>
        <div>
          <TodoPriorityBadge priority={priority} />
        </div>
        <ChangeItemButton
          title={title}
          priority={priority}
          todoDescription={todoDescription}
          todoId={todoId}
          todoDone={todoDone}
        />
        <FormCheck
          className={styles.checkbox}
          checked={markedDone}
          onChange={() => setMarkedDone(!markedDone)}
        ></FormCheck>
      </div>
    </div>
  );
}

export default TodoItem;
