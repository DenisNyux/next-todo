import { PutTodoRequest } from "./types/Todo";

async function putTodo(requestParams: PutTodoRequest) {
  
  const requestOptions = {
    method: "PUT",
    next: { revalidate: 0 },
    body: typeof requestParams.body === "string" ? requestParams.body : JSON.stringify(requestParams.body),
    headers: {
      "Content-Type": "application/json",
    },
  };

  
  const response = await fetch(
    `${process.env.API_URL}/api/todos/${requestParams.todoId}`,
    requestOptions,
  )
    .then((response) => response.json())
    .catch((error) => error);
    
  return response;
}

export default putTodo;
