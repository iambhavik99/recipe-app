import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./Components/Login/Login.js";
import { RecipesList } from "./Components/Recipe/RecipeList/RecipeList.js";
import { RecipeDetails } from "./Components/Recipe/RecipeDetails/RecipeDetails.js";
import { Master } from "./Components/Master/Master.js";
import { Signup } from "./Components/Signup/Signup";
import AddEditRecipe from "./Components/Recipe/AddEditRecipe/AddEditRecipe";

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Master />}>
            <Route path="/" element={<RecipesList />} />
            <Route path="/recipe/item" element={<RecipeDetails />} />
            <Route path="/recipe/item/add" element={<AddEditRecipe />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Outlet />
    </div>
  );
}

export default App;
