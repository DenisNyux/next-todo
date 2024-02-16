"use server";
import { revalidatePath, revalidateTag } from "next/cache";

import postTodo from "@/requests/todos/postTodo";
import {
  PostTodoRequestBody,
  TodoPriorities,
} from "@/requests/todos/types/Todo";
import convertTextAreaToDescriptionType from "@/utils/convertTextAreaToDescriptionType";

export default async function createTodo(formData: FormData) {
  const rawFormData = {
    todoTitle: formData.get("todoTitle"),
    todoPriority: formData.get("todoPriority"),
    todoDescriptiton: formData.get("todoDescription"),
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
  const requestParams: PostTodoRequestBody = {
    data: {
      todoTitle: String(rawFormData.todoTitle),
      todoDescription: convertTextAreaToDescriptionType(
        String(rawFormData.todoDescriptiton)
      ),
      todoPriority: String(rawFormData.todoPriority) as TodoPriorities,
      todoDone: false,
    },
  };

  await postTodo({ body: requestParams });

  revalidateTag("todosTable");
}
