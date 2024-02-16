"use server";
import { revalidatePath, revalidateTag } from "next/cache";

import putTodo from "@/requests/todos/putTodo";
import { PutTodoRequestBody, PostTodoRequest, TodoPriorities } from "@/requests/todos/types/Todo";
import convertTextAreaToDescriptionType from "@/utils/convertTextAreaToDescriptionType";

export default async function changeTodo(formData: FormData) {
  const rawFormData = {
    todoTitle: formData.get("todoTitle"),
    todoPriority: formData.get("todoPriority"),
    todoDescriptiton: formData.get("todoDescription"),
    todoDone: formData.get("todoDone"),
    todoId: formData.get("todoId")
  };

  if (!rawFormData.todoTitle) {
    return {
      error: { field: "todoTitle", message: "Заголовок не может быть пустым" },
    };
  }
  if (!rawFormData.todoDescriptiton) {
    return {
      error: {
        field: "todoDescription",
        message: "Описание не может быть пустым",
      },
    };
  }

  const requestParams: PutTodoRequestBody = {
    data: {
      todoTitle: String(rawFormData.todoTitle),
      todoDescription: convertTextAreaToDescriptionType(
        String(rawFormData.todoDescriptiton)
      ),
      todoPriority: String(rawFormData.todoPriority) as TodoPriorities,
      todoDone: Boolean(rawFormData.todoDone),
    }
  }

  console.log(JSON.stringify(requestParams))

  await putTodo({ body: JSON.stringify(requestParams), todoId: String(rawFormData.todoId) });

  revalidateTag('todosTable')

  revalidatePath(`/${String(rawFormData.todoId)}`)

}
