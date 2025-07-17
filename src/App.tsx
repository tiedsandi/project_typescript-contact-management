import Router from "./routes";
import { RouterProvider } from "react-router";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster richColors position="top-center" />
      <RouterProvider router={Router} />
    </>
  );
}

export default App;
