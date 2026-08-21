import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import ThemeProvidor from "./context/ThemeProvider";
import RootLayout from "./layout/RootLayout";
import DashBoardLayout from "./layout/DashBoardLayout";
import Contact from "./pages/Contact";
import OverView from "./pages/OverView";
import Notfound from "./components/NotFound";
import SalesSheet from "./pages/SalesSheet";
import ExpenceSheet from "./pages/ExpenceSheet";

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route element={<DashBoardLayout />}>
          <Route index element={<OverView />} />
          <Route path="Overview" element={<OverView />} />
          <Route path="Sales" element={<SalesSheet />} />
          <Route path="Inventory" element={<ExpenceSheet />} />
        </Route>
        <Route path="Contact" element={<Contact />} />
        <Route path="*" element={<Notfound />} />
      </Route>,
    ),
  );

  return (
    <div className=" dark:bg-gray-900 dark:text-white bg-gray-200 flex justify-center items-center mt-10">
      <ThemeProvidor>
        <RouterProvider router={router} />
      </ThemeProvidor>
    </div>
  );
};

export default App;
