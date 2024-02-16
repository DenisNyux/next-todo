import { error } from "console";

import { NextRequest } from "next/server";

import { SortingField } from "@/components/TodoTable/TodoControls/types/sortingTypes";
import getAllTodos from "@/requests/todos/getTodos";
import postTodo from "@/requests/todos/postTodo";
import putTodo from "@/requests/todos/putTodo";
import { AllTodosRequest } from "@/requests/todos/types/Todo";

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

export async function PUT(request: NextRequest ) {
  const id = request.nextUrl.searchParams.get("todoId") || ''
  const body = await request.json();
  const data = await putTodo({body: body, todoId: id}).catch((error) => error);
  return Response.json(data);
}
