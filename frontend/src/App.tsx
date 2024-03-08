import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Form } from "./components/form";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex flex-col gap-10 mx-auto items-center w-full">
        <Form />
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
