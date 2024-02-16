import { Alert } from "react-bootstrap"

type TodoDescriptionProps = {
    description: string[][]
}

function TodoDescription({description}: TodoDescriptionProps) {
  return (
    <Alert variant="secondary" className="w-100">{
        description.map((item, index) => {
            return (
                <p key={`desc-${index}`}>{item}</p>
            )
        })
    }</Alert>
  )
}

export default TodoDescription