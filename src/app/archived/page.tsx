import TodoTable from "@/components/TodoTable/TodoTable";
import { FilterProvider } from "@/contexts/filterContext";
import { PaginationProvider } from "@/contexts/paginationContext";

function Archived() {
  return (
    <main>
      <FilterProvider>
        <PaginationProvider>
          <TodoTable activeTodos={true}></TodoTable>
        </PaginationProvider>
      </FilterProvider>
    </main>
  );
}

export default Archived;
