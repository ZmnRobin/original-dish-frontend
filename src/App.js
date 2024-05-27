// Desc: Main App component
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import AddRecipes from "./pages/AddRecipes";
import MainNavbar from "./components/MainNavbar";
import { Route, Routes } from "react-router-dom";
import RecipeDetails from "./pages/RecipeDetails";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import PurchaseCoin from "./pages/PurchaseCoin";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";

function App() {
  return (
    <>
      <MainNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/purchaseCoin" element={<PurchaseCoin />} />
        <Route path="/addRecipes" element={<PrivateRoute />}>
          <Route path="/addRecipes" element={<AddRecipes />} />
        </Route>
        <Route path="/recipes/:id" element={<PrivateRoute />}>
          <Route path="/recipes/:id" element={<RecipeDetails />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
