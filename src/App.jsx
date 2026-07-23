import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import ThemeProvidor from "./context/ThemeProvider";
import RootLayout from "./layout/RootLayout";
import DashBoardLayout from "./layout/DashBoardLayout";
import Contact from "./pages/Contact";
import OverView from "./pages/OverView";
import Notfound from "./components/NotFound";

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route path="DashBoard" element={<DashBoardLayout />}>
          <Route path="Overview" element={<OverView/>} />
        </Route>
        <Route path="Contact" element={<Contact />} />
        <Route path="*" element={<Notfound />}/>
      </Route>
    ),
  );

  return (
    <div className=" dark:bg-gray-800 dark:text-white flex justify-center items-center mt-16">
      <ThemeProvidor>
        <RouterProvider router={router} />
      </ThemeProvidor>
    </div>
  );
};

export default App;
