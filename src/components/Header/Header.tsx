import Image from "next/image";
import Link from "next/link";

import AddTodoButton from "./AddTodoButton/AddTodoButton";
import ArchivedButton from "./ArchivedButton/ArchivedButton";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link href={"/"}>
          <Image
            src={"/app-icon.svg"}
            alt="App Logo"
            width={50}
            height={50}
          ></Image>
        </Link>
        <h2>Список задач</h2>
      </div>

      <div className={styles.controlButtons}>
        <ArchivedButton />
        <AddTodoButton />
      </div>
    </header>
  );
}

export default Header;
