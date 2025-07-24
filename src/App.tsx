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

// TODO:
// [x] delete contact
//     [x] create modal confirmation
// [x] pagination
// [ ] detail contact
// [ ] UI Modal
// [ ] CRUD Address using modal
//     [ ] Creat
//     [ ] Show
//     [ ] Edit
//     [ ] Delete

export default App;
