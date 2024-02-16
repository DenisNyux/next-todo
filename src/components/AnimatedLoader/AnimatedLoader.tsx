import { Spinner } from "react-bootstrap"

import styles from "./AnimatedLoader.module.css"

function AnimatedLoader() {
  return (
    <div className={styles.loaderContainer}>
        <Spinner animation="border"></Spinner>
    </div>
  )
}

export default AnimatedLoader