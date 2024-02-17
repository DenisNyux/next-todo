import { SortingField } from "@/components/TodoTable/TodoControls/types/sortingTypes";

/**
 * Список всех задач
 */
export type AllTodosRequest = {
  // Текущая страница.
  page: number;

  // Количество элементов на странице.
  pageSize: number;

  // Параметр, необходимый для получения количества страниц
  pageCount: boolean;

  // Поле по которому идет сортировка
  sortingField: SortingField;

  // Фильтр по приоритету
  priorityField: TodoPriorities | "all";

  // Фильтр по выводу активных/неактивных задач
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
    // Название задачи
    todoTitle: string;

    // Дата создания
    createdAt: string;

    // Дата изменения
    updatedAt: string;

    // Формат описания
    todoDescription: TodoDescription;

    // Статус задачи
    todoDone: boolean;

    // Приоритет
    todoPriority: TodoPriorities;
  };
};

/**
 *  Редактирование задачи
 */
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

/**
 *  Создание задачи
 */
export type PostTodoRequest = {
  body: PostTodoRequestBody;
};

export type PostTodoResponse = {
  data: SingleTodo;
};

export type PostTodoRequestBody = {
  data: {
    todoTitle: string;
    todoDescription: TodoDescription;
    todoPriority: TodoPriorities;
    todoDone: boolean;
  };
};

/**
 *  Получение одной задачи
 */
export type SingleTodoRequest = {
  todoId: string;
};

export type SingleTodoResponse = {
  data: SingleTodo;
};

/**
 *  Вспомогательные типы
 */
export type TodoPriorities =
  | "critical"
  | "important"
  | "standart"
  | "unimportant";

export type TodoDescription = {
  type: string;
  children: {
    type: string;
    text: string;
  }[];
}[];
