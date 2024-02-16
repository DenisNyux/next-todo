import { TodoPriorities } from "@/requests/todos/types/Todo";

export type SortingField =  "todoTitle" | "todoPriority" | "updatedAt" | "createdAt";

export type SortingFieldSelectOptions = {
    value: SortingField;
    label: string;
}

export type PriorityFieldSelectOptions = {
    value: TodoPriorities | "all";
    label: string;
}