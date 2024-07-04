import { createBrowserRouter } from "react-router-dom";
import EventsGridPage from "../pages/EventsGridPage";
import EventsAddPage from "../pages/EventsAddPage";

const Router = createBrowserRouter([
    {
      path: "/",
      element: <EventsGridPage />
    },
    {
      path: "/new",
      element: <EventsAddPage />
    },
  ]);

  export default Router;