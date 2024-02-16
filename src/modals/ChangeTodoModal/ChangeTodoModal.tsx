"use client";

import { useEffect, useState } from "react";

import { Form } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useFormState } from "react-dom";

import { TodoDescription, TodoPriorities } from "@/requests/todos/types/Todo";
import convertDescriptionToString from "@/utils/convertDescriptionToString";

import changeTodo from "./actions";

function ChangeTodoModal({
  show,
  handleClose,
  todoDescription,
  todoPriority,
  todoTitle,
  todoId,
  todoDone,
}: CreateTodoModalProps) {
  const [titleValue, setTitleValue] = useState(todoTitle);
  const [doneValue, setDoneValue] = useState(todoDone);

  const defaultPriotity = priorityEnum.find(
    (priority) => priority.value === todoPriority
  );
  const [priorityValue, setPriorityValue] = useState<
    PriorityEnumOption | undefined
  >(defaultPriotity);

  const [descriptionValue, setDescriptionValue] = useState(
    convertDescriptionToString(todoDescription)
  );

  const [alertMessage, setAlertMessage] = useState<string | undefined>();

  const clientAction = async (formData: FormData) => {
    const result = await changeTodo(formData);
    if (result?.error) {
      setAlertMessage(result.error.message);
    } else {
      setAlertMessage(undefined);
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} animation={true}>
      <Modal.Header closeButton>
        <Modal.Title>Изменить задачу</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form action={clientAction}>
          <input type="hidden" id="todoId" name="todoId" value={todoId} />

          <Form.Group className="mb-3">
            <Form.Label>Заголовок</Form.Label>
            <Form.Control
              type="text"
              name="todoTitle"
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Приоритет</Form.Label>
            <Form.Select
              name="todoPriority"
              value={priorityValue?.value}
              onChange={(e) =>
                setPriorityValue(
                  priorityEnum.find(
                    (priority) => priority.value === e.target.value
                  )
                )
              }
            >
              {priorityEnum.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Статус задачи</Form.Label>
            <Form.Check
              type="checkbox"
              name="todoDone"
              label="Задача завершена"
              checked={doneValue}
              onChange={(e) => setDoneValue(e.target.checked)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Описание</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="todoDescription"
              value={descriptionValue}
              onChange={(e) => setDescriptionValue(e.target.value)}
            />
          </Form.Group>

          {alertMessage && <Alert variant="danger">{alertMessage}</Alert>}

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Закрыть
            </Button>
            <Button variant="primary" type="submit">
              Сохранить
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

type CreateTodoModalProps = {
  show: boolean;
  handleClose: () => void;
  todoId: string;
  todoTitle: string;
  todoDescription: TodoDescription;
  todoPriority: TodoPriorities;
  todoDone: boolean;
};

type PriorityEnumOption = {
  value: TodoPriorities;
  label: string;
};

const priorityEnum: PriorityEnumOption[] = [
  {
    value: "critical",
    label: "Критическая",
  },
  {
    value: "important",
    label: "Важная",
  },
  {
    value: "standart",
    label: "Стандартная",
  },
  {
    value: "unimportant",
    label: "Незначительная",
  },
];

export default ChangeTodoModal;
