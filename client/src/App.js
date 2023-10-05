import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Accueil from "./pages/Accueil/Accueil";
import SignUp from "./pages/Auth/singup";
import SignIn from "./pages/Auth/signin";
import Profile from "./pages/Profil/profil";
import { Provider } from "react-redux";
import  store  from "./Redux/Store";
import AddCar from "./pages/Cars/addCar";
import OneCar from "./pages/Cars/oneCar";
import Deconnexion from "./pages/Auth/deconnexion";
import SearchCar from "./pages/Accueil/searchCar";
import UpdateCar from "./pages/Cars/updateCar";

function App() {
  return (
    <>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Accueil/>} />
          <Route exact path="/signup" element={<SignUp/>} />
          <Route exact path="/signin" element={<SignIn/>} />
          <Route exact path="/profile" element={<Profile/>} />
          <Route exact path="/addCar" element={<AddCar/>} />
          <Route exact path="/car/:id" element={<OneCar/>} />
          <Route exact path="/updateCar/:id" element={<UpdateCar/>} />

          <Route exact path="/search_car/:marque/:model" element={<SearchCar/>} />

          
          <Route exact path="/deconnexion" element={<Deconnexion/>} />
          





        </Routes>
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
