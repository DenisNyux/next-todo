import { PostTodoRequest, PutTodoRequest, PostTodoResponse } from "./types/Todo";

async function postTodo(requestParams: PostTodoRequest): Promise<PostTodoResponse> {

  
  const requestOptions = {
    method: "POST",
    next: { revalidate: 0 },
    body: JSON.stringify(requestParams.body),
    headers: {
      "Content-Type": "application/json",
    },
  };


  
  const response = await fetch(
    `${process.env.API_URL}/api/todos/`,
    requestOptions,
  )
    .then((response) => response.json())
    .catch((error) => error);
    
  return response;
}

export default postTodo;
