import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/listTour/ListTour";
import Login from "./pages/login/Login";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DetailTour from "./pages/detailTour/DetailTour";
import ManageAccount from "./pages/manageAccount/ManageAccount";
import TourAccount from "./pages/manageAccount/tourAccount/TourAccount";
import CarAccount from "./pages/manageAccount/carAccount/CarAccount";
import Register from "./pages/register/Register";
import ListTour from "./pages/listTour/ListTour";
import ListCar from "./pages/listCar/ListCar";
import ChangePassword from "./pages/manageAccount/changePassword/ChangePassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tours" element={<ListTour />} />
        <Route path="/cars" element={<ListCar />} />
        <Route path="/detailtour/:id" element={<DetailTour />} />
        <Route path="/manageaccount">
          <Route index element={<ManageAccount />} />
        </Route>
        <Route path="/bookedtour" element={<TourAccount />} />
        <Route path="/bookedcar" element={<CarAccount />} />
        <Route path="/changepassword" element={<ChangePassword/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
