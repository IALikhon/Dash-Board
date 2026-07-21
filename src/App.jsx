import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import ThemeProvidor from "./context/ThemeProvider";
import RootLayout from "./layout/RootLayout";
import DashBoard from "./pages/DashBoard";
import Contact from "./pages/Contact";

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout/>} >
        <Route path="DashBoard" element={<DashBoard/>} />
        <Route path="Contact" element={<Contact />} />

      </Route>
    )
  )

  return (
    <div className="dark:bg-gray-800 dark:text-white flex justify-center items-center mt-16">
      <ThemeProvidor>
        <RouterProvider router={router} />
      </ThemeProvidor>
    </div>
  );
};

export default App;
