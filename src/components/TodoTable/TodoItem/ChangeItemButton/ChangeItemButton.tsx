'use client'

import { useState } from "react";

import Image from "next/image";
import { Button } from "react-bootstrap";

import ChangeTodoModal from "@/modals/ChangeTodoModal/ChangeTodoModal";
import {
  TodoPriorities,
  TodoDescription,
} from "@/requests/todos/types/Todo";

import styles from "./ChangeItemButton.module.css";

type ChangeItemButtonProps = {
  title: string;
  todoId: string;
  priority: TodoPriorities;
  todoDescription: TodoDescription;
  todoDone: boolean;
};

function ChangeItemButton({
  title,
  priority,
  todoDescription,
  todoId,
  todoDone,
}: ChangeItemButtonProps) {
  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);
  const handleOpenChangeModal = () => {
    setIsChangeModalOpen(true);
  };

  const handleCloseChangeModal = () => {
    setIsChangeModalOpen(false);
  };
  return (
    <>
      <Button
        variant="outline-primary"
        className={styles.squareButton}
        onClick={handleOpenChangeModal}
      >
        <Image src={"/edit.svg"} width={20} height={20} alt="edit"></Image>
      </Button>
      <ChangeTodoModal
        show={isChangeModalOpen}
        handleClose={handleCloseChangeModal}
        todoId={todoId}
        todoTitle={title}
        todoPriority={priority}
        todoDescription={todoDescription}
        todoDone={todoDone}
      ></ChangeTodoModal>
    </>
  );
}

export default ChangeItemButton;
