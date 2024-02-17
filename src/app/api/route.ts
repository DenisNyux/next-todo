import { NextRequest } from "next/server";

import { SortingField } from "@/components/TodoTable/TodoControls/types/sortingTypes";
import getAllTodos from "@/requests/todos/getTodos";
import putTodo from "@/requests/todos/putTodo";
import { AllTodosRequest } from "@/requests/todos/types/Todo";

/**
 * Редиректит запрос на получение списка задач на внешний API.
 * Извлекает параметры из URL и передает их в функцию с запросом.
 *
 * @param {NextRequest} request - тело запроса с параметрами
 * @return {Response} 
 */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const data = await getAllTodos({
    page: Number(params.get("page")),
    pageCount: Boolean(params.get("pageCount")),
    pageSize: Number(params.get("pageSize")),
    sortingField: params.get("sortingField") as SortingField,
    priorityField: params.get("priorityField") as AllTodosRequest["priorityField"],
    activeTodos: params.get("activeTodos")
  }).catch((error) => error);

  return Response.json(data);
}

/**
 * Редиректит запрос для редактирования задачи на внешний API.
 * Извлекает параметры из body и URL, передает их в функцию с запросом.
 * 
 * @param {NextRequest} request - тело запроса с параметрами
 * @return {Response} 
 */
export async function PUT(request: NextRequest ) {
  const id = request.nextUrl.searchParams.get("todoId") || ''
  const body = await request.json();
  const data = await putTodo({body: body, todoId: id}).catch((error) => error);
  return Response.json(data);
}
