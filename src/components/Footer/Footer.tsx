import Image from "next/image";

import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.container}>
        <p>Нюхалов Денис, {new Date().getFullYear()}</p>

        <div className={styles.linkContainer}>
          <a href="https://github.com/DenisNyux/next-todo">Исходный код</a>
          <Image
            width={20}
            height={20}
            src={"/github.svg"}
            alt="github"
          ></Image>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
