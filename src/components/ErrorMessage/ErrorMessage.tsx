import Alert from 'react-bootstrap/Alert';

import styles from "./ErrorMessage.module.css"

function ErrorMessage() {
  return (
    <div className={styles.ErrorMessage}>
    <Alert key={'danger'} variant={'danger'}>
      При отправке запроса произошла ошибка. Пожалуйста, обновите страницу или зайдите позднее.
    </Alert>
</div>
  )
}

export default ErrorMessage



