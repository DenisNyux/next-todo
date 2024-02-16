"use client";

import { useState } from "react";

import Image from "next/image";
import Button from "react-bootstrap/Button";

import CreateTodoModal from "@/modals/CreateTodoModal/CreateTodoModal";

import styles from "./AddTodoButton.module.css";

function AddTodoButton() {
  const [isAddTodoModalOpen, setIsAddTodoModalOpen] = useState(false);

  const handleOpenAddTodo = () => {
    setIsAddTodoModalOpen(true);
  };

  const handleCloseAddTodo = () => {
    setIsAddTodoModalOpen(false);
  };

  return (
    <>
      <Button variant="primary" onClick={handleOpenAddTodo} className={styles.buttonTodo}>
        <Image src={"/plus.svg"} width={20} height={20} alt="plus" />
        <span className={styles.buttonText}>Добавить задачу</span>
      </Button>
      <CreateTodoModal
        show={isAddTodoModalOpen}
        handleClose={handleCloseAddTodo}
      ></CreateTodoModal>
    </>
  );
}

export default AddTodoButton;
