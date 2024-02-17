'use client'

import { useState } from "react";

import { Form } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { TodoPriorities } from "@/requests/todos/types/Todo";

import createTodo from "./actions";

type CreateTodoModalProps = {
  show: boolean;
  handleClose: () => void;
};


function CreateTodoModal({ show, handleClose }: CreateTodoModalProps) {

  // Сообщения об ошибке
  const [alertMessage, setAlertMessage] = useState<string | undefined>()

  // Оборачиваем server action, чтобы можно было получить ошибки при неправильных параметрах
  const clientAction = async (formData: FormData) => {
    const result = await createTodo(formData);
    if (result?.error) {
      setAlertMessage(result.error.message)
    } else {
      setAlertMessage(undefined)
      handleClose()
    }
  }


  return (
    <Modal show={show} onHide={handleClose} animation={true}>
      <Modal.Header closeButton>
        <Modal.Title>Создать задачу</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form action={clientAction}>
          <Form.Group className="mb-3">
            <Form.Label>Заголовок</Form.Label>
            <Form.Control type="text" name="todoTitle" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Приоритет</Form.Label>
            <Form.Select name="todoPriority">
              {priorityEnum.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Описание</Form.Label>
            <Form.Control as="textarea" rows={5} name="todoDescription" />
          </Form.Group>

          {alertMessage && <Alert variant="danger">{alertMessage}</Alert>}

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose} >
              Закрыть
            </Button>
            <Button variant="primary" type="submit">
              Создать задачу
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}


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

export default CreateTodoModal;
