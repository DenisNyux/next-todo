import { AllTodosRequest, AllTodosResponse } from "./types/Todo";

async function getAllTodos(requestParams: AllTodosRequest) : Promise<AllTodosResponse> {
  const requestOptions = {
    method: "GET",
    next: { tags: ['todosTable'] },
  };

  const paginationParams = `pagination[page]=${requestParams.page}&pagination[pageSize]=${requestParams.pageSize}&pagination[withCount]=${requestParams.pageCount}`;
  const sortParams = `sort=${requestParams.sortingField === "createdAt" || requestParams.sortingField === "updatedAt" ?  requestParams.sortingField + ':desc': requestParams.sortingField}`
  const filterParams = requestParams.priorityField === "all" ? "" : `&filters[todoPriority][$eq]=${requestParams.priorityField}`
  const ActiveFilter = `&filters[todoDone][$eq]=${requestParams.activeTodos}`


  const response = await fetch(
    `${process.env.API_URL}/api/todos?${paginationParams}&${sortParams}${filterParams}${ActiveFilter}`,
    requestOptions,
  )
    .then((response) => response.json())
    .catch((error) => error);
    
  return response;
}

export default getAllTodos;
