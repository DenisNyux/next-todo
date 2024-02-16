"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Button from "react-bootstrap/Button";

import styles from "./ArchivedButton.module.css";

function ArchivedButton() {
  const pathname = usePathname();

  switch (pathname) {
    case "/archived":
      return (
        <Link href={"/"} className={styles.archLink}>
          <Button variant="outline-primary" className={styles.archButton}>
            <p>Активные задачи</p>
            <Image
              src={"/archived.svg"}
              alt="App Logo"
              width={20}
              height={20}
            ></Image>
            </Button>
        </Link>
      );
    default:
      return (
        <Link href={"/archived"} className={styles.archLink}>
          <Button variant="outline-primary" className={styles.archButton}>
            <p>Закрытые задачи</p>

            <Image
              src={"/archived.svg"}
              alt="App Logo"
              width={20}
              height={20}
            ></Image>
          </Button>
        </Link>
      );
  }
}

export default ArchivedButton;
