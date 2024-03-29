import TodoTable from "@/components/TodoTable/TodoTable";
import { FilterProvider } from "@/contexts/filterContext";
import { PaginationProvider } from "@/contexts/paginationContext";

function Home() {
  return (
    <main>
      <FilterProvider>
        <PaginationProvider>
          <TodoTable activeTodos={false}></TodoTable>
        </PaginationProvider>
      </FilterProvider>
    </main>
  );
}

export default Home;
