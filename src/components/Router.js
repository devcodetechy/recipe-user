import { createBrowserRouter } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import App from "../App";
import Recipes from "./Recipes";
import Passwordreset from "./Passwordreset";
import Myrecipes from "./Myrecipes";
import Recipesabout from "./Recipeabout";
import Addnewrecipe from "./Addnewrecipe";
import Myrecipesedit from "./Myrecipesedit";

const Router = createBrowserRouter([
    { path: '', element: <App/> },
    { path: '/Login', element: <Login/>},
    { path: '/Signup', element: <Signup/>},
    { path: '/Recipes', element: <Recipes/>},
    { path: '/Passwordreset', element: <Passwordreset/>},
    { path: '/Myrecipes', element: <Myrecipes/>},
    { path: '/Addnewrecipe', element: <Addnewrecipe/>},
    { path: "/Recipesabout/:id", element: <Recipesabout/> }, // ✅ move this up
    { path: "/myrecipesedit/:id", element: <Myrecipesedit />},
    // optional: remove this unless it's a different view
    // { path: '/Recipesabout', element: <Recipesabout/>}, 
]);


export default Router;