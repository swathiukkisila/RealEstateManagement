import HomePage from "./routes/homePage/homePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListPage from "./routes/listPage/listPage";
import { Layout, RequireAuth } from "./routes/layout/layout";
import SinglePage from "./routes/singlePage/singlePage";
import ProfilePage from "./routes/profilePage/profilePage";
import Login from "./routes/login/login";
import Register from "./routes/register/register";
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage";
import NewPostPage from "./routes/newPostPage/newPostPage";
import { listPageLoader, profilePageLoader, singlePageLoader } from "./lib/loaders";
import ChatPage from "./components/chat/Chat";
import FrontPage from "../src/components/frontpage/Frontpage";
import Aboutpage from "./components/about/Aboutpage";
import UpdatePostPage from "./routes/postupdatepage/UpdatePostPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <FrontPage />, // ⬅️ No layout or navbar
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/home",
          element: <HomePage />,
        },
        {
          path: "/about",
          element: <Aboutpage/>,
        },
        {
          path: "/list",
          element: <ListPage />,
          loader: listPageLoader,
        },
        {
          path: "/:id",
          element: <SinglePage />,
          loader: singlePageLoader,
        },

        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/profile",
          element: <ProfilePage />,
          loader: profilePageLoader
        },
        {
          path: "/profile/update",
          element: <ProfileUpdatePage />,
        },
        {
          path: "/add",
          element: <NewPostPage />,
        },
        {
          path : "/update-post/:id",
          element : <UpdatePostPage />,
          loader : singlePageLoader,
        },  
        { path : "/chats/:chatId" ,
          element : <ChatPage /> 
        },
        
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
