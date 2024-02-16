"use client";

import { Suspense, useEffect, useState } from "react";

import dynamic from 'next/dynamic'
import { ListGroup } from "react-bootstrap";

import styles from './TodoParameters.module.css'
import AnimatedLoader from "../AnimatedLoader/AnimatedLoader";



type TodoParametersProps = {
  createdAt: string;
  updatedAt: string;
  todoDone: boolean;
};

function TodoParameters({
  createdAt,
  updatedAt,
  todoDone,
}: TodoParametersProps) {
  // useState и useEffect Используются из-за ошибки гидрации.
  // Error: Text content does not match server-rendered HTML.
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const creationDate = new Date(createdAt);
  const updateDate = new Date(updatedAt);


  return (
    <ListGroup className={styles.listOfParams}>
      <ListGroup.Item>
        <b>Статус:</b> {todoDone ? "Выполнено" : "Не выполнено"}
      </ListGroup.Item>
      
          <ListGroup.Item>
            <b>Дата создания:</b> { isClient ? creationDate.toLocaleString(): "Загрузка..."}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Дата обновления:</b> { isClient ? updateDate.toLocaleString(): "Загрузка..."}
          </ListGroup.Item>
    </ListGroup>
  );
}

export default TodoParameters;
