import { SortingField } from "@/components/TodoTable/TodoControls/types/sortingTypes";

export type AllTodosRequest = {
  page: number;
  pageSize: number;
  pageCount: boolean;
  sortingField: SortingField;
  priorityField: TodoPriorities | "all";
  activeTodos: boolean | string | null;
};

export type AllTodosResponse = {
  data: SingleTodo[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export type SingleTodo = {
  id: number;
  attributes: {
    todoUid: string;
    todoTitle: string;
    createdAt: string;
    updatedAt: string;
    todoDescription: TodoDescription;
    todoStatus: TodoStatuses;
    todoDone: boolean;
    todoPriority: TodoPriorities;
  };
};

export type TodoDescription = {
  type: string;
  children: {
    type: string;
    text: string;
  }[];
}[];

export type PutTodoRequest = {
  todoId: string;
  body: string;
};

export type PutTodoRequestBody = {
  data: {
    todoDone?: boolean | null;
    todoPriority?: TodoPriorities | null;
    todoDescription?: TodoDescription | null;
    todoTitle?: string | null;
  };
};

export type PostTodoRequest = {
  body: PostTodoRequestBody;
};

export type PostTodoResponse = {
  data: SingleTodo
}

export type PostTodoRequestBody = {
  data: {
    todoTitle: string;
    todoDescription: TodoDescription;
    todoPriority: TodoPriorities;
    todoDone: boolean;
  };
};


export type SingleTodoRequest = {
  todoId: string;
};

export type SingleTodoResponse = {
  data: SingleTodo
}

export type TodoStatuses = "active" | "done" | "archived";

export type TodoPriorities =
  | "critical"
  | "important"
  | "standart"
  | "unimportant";
