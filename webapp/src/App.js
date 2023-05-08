import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { getLoggedInUserInfo } from "./auth/auth";
import { Login } from "./Pages/Login/Login";
import { Signup } from "./Pages/Signup/Signup";
import RecipePage from "./Pages/Recipes/RecipePage";
import { Master } from "./Pages/Master";
import AddRecipe from "./Pages/Recipes/AddRecipe";
import EditRecipe from "./Pages/Recipes/EditRecipe";
import RecipeInfo from "./Pages/Recipes/RecipeInfo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Master />,
    loader: getLoggedInUserInfo,
    children: [
      {
        index: true,
        element: <RecipePage />,
        loader: getLoggedInUserInfo,
      },
      {
        path: 'recipe/:id',
        element: <RecipeInfo />
      },
      {
        path: 'recipe/new',
        element: <AddRecipe />
      },
      {
        path: 'recipe/edit/:id',
        element: <EditRecipe />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  }
])




function App() {
  return (
    <RouterProvider router={router}>    </RouterProvider>
  );
}

export default App;
