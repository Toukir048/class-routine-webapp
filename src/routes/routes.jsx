import { createBrowserRouter } from "react-router";
import Homepage from "../pages/Homepage";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import About from "../pages/About";
import Routine from "../pages/Routine";
import Contact from "../pages/Contact";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <Homepage />
            },
            {
                path: "about",
                element: <About/>
            },

            {
                path: "routine",
                element: <Routine/>
            },
            {
                path: "Contact",
                element: <Contact/>
            },
        ]
    }
])

export default router;