import { Alert } from "react-bootstrap";

import styles from "./TableNotFoundFilters.module.css";

function TableNotFoundFilters() {
  return (
    <div className={styles.messageContainer}>
      <Alert key={"primary"} variant={"primary"}>
        По выбранным фильтрам ничего не найдено. Попробуйте выбрать другие значения или обновите страницу.
      </Alert>
    </div>
  );
}

export default TableNotFoundFilters;
