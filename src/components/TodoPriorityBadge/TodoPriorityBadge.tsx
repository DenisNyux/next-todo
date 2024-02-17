import { Badge } from "react-bootstrap";

import { TodoPriorities } from "@/requests/todos/types/Todo";

import styles from "./TodoPriorityBadge.module.css";

function TodoPriorityBadge({ priority }: { priority: TodoPriorities }) {
  switch (priority) {
    case "critical":
      return (
        <>
          <Badge bg="danger" className={styles.todoBadge}>
            Критическая
          </Badge>
          <div
            className={`${styles.roundIndicator} ${styles.dangerRound}`}
          ></div>
        </>
      );
    case "important":
      return (
        <>
          <Badge bg="warning" className={styles.todoBadge}>
            Важная
          </Badge>{" "}
          <div
            className={`${styles.roundIndicator} ${styles.warningRound}`}
          ></div>
        </>
      );
    case "standart":
      return (
        <>
          <Badge bg="primary" className={styles.todoBadge}>
            Обычная
          </Badge>{" "}
          <div
            className={`${styles.roundIndicator} ${styles.primaryRound}`}
          ></div>
        </>
      );
    case "unimportant":
      return (
        <>
          <Badge bg="secondary" className={styles.todoBadge}>
            Незначительная
          </Badge>{" "}
          <div
            className={`${styles.roundIndicator} ${styles.secondaryRound}`}
          ></div>
        </>
      );
  }
}

export default TodoPriorityBadge;
