import { createBrowserRouter } from "react-router-dom";
import EventsGridPage from "../pages/EventsGridPage";

const Router = createBrowserRouter([
    {
      path: "/",
      element: <EventsGridPage />
    },
  ]);

  export default Router;