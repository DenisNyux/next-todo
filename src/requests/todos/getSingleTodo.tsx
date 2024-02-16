import { SingleTodoRequest, SingleTodoResponse } from "./types/Todo";

async function getSingleTodo(requestParams: SingleTodoRequest) : Promise<SingleTodoResponse> {
  const requestOptions = {
    method: "GET",
    next: { tags: ['singleTodo'] },
  };

  const response = await fetch(
    `${process.env.API_URL}/api/todos/${requestParams.todoId}`,
    requestOptions,
  )
    .then((response) => response.json())
    .catch((error) => error);
    
  return response;
}

export default getSingleTodo;
