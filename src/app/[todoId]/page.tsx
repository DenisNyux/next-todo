import Link from "next/link";

import TodoDescription from "@/components/TodoDescription/TodoDescription";
import TodoParameters from "@/components/TodoParameters/TodoParameters";
import TodoPriorityBadge from "@/components/TodoPriorityBadge/TodoPriorityBadge";
import ChangeItemButton from "@/components/TodoTable/TodoItem/ChangeItemButton/ChangeItemButton";
import getSingleTodo from "@/requests/todos/getSingleTodo";
import { SingleTodoResponse } from "@/requests/todos/types/Todo";

import styles from "./SingleTodoPage.module.css";

type singleTodoPageProps = {
  params: {
    todoId: string;
  };
};

async function SingleTodoPage({ params }: singleTodoPageProps) {
  const todo: SingleTodoResponse = await getSingleTodo({
    todoId: params.todoId,
  });

  const todoData = todo.data.attributes;

  const descriptionArr = todoData.todoDescription.map((item) => {
    return item.children.map((item) => {
      return item.text;
    });
  });

  return (
    <main className={styles.container}>
      <div className={styles.backButton}>
        <Link href={"/"}>← Вернуться к списку заметок</Link>
      </div>
      <section className={styles.headerSection}>
        <h3>{todoData.todoTitle}</h3>
        <div className={styles.headerButtons}>
          <div className={styles.priorityWrap}>
            <TodoPriorityBadge priority={todoData.todoPriority} />
          </div>
          <ChangeItemButton
            title={todoData.todoTitle}
            priority={todoData.todoPriority}
            todoDescription={todoData.todoDescription}
            todoId={params.todoId}
            todoDone={todoData.todoDone}
          />
        </div>
      </section>
      <section className={styles.mainSection}>
        <div>
          <TodoDescription description={descriptionArr} />
        </div>
        <div>
          <TodoParameters
            createdAt={todoData.createdAt}
            updatedAt={todoData.updatedAt}
            todoDone={todoData.todoDone}
          />
        </div>
      </section>
    </main>
  );
}

export default SingleTodoPage;
