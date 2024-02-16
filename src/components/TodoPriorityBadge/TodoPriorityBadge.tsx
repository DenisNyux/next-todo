import { Badge } from "react-bootstrap";

import { TodoPriorities } from "@/requests/todos/types/Todo";

function TodoPriorityBadge({ priority }: { priority: TodoPriorities }) {
  switch (priority) {
    case "critical":
      return <Badge bg="danger">Критическая</Badge>;
    case "important":
      return <Badge bg="warning">Важная</Badge>;
    case "standart":
      return <Badge bg="primary">Обычная</Badge>;
    case "unimportant":
      return <Badge bg="secondary">Незначительная</Badge>;
  }
}

export default TodoPriorityBadge;
