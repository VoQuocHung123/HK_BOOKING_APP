import { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import TourCard from "../../components/tourCard/TourCard";
import "./home.css";
import axios from "axios";
import SliderTour from "../../components/sliderTour/SliderTour";
import CarCard from "../../components/carcard/CarCard";
import {
  faBed,
  faCar,
  faCircleInfo,
  faHouse,
  faBars,
  faLocationDot,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from 'jwt-decode'
import { refreshTokenInStore } from "../../redux/authSlice";

const Home = () => {
  let axiosJWT = axios.create()
  const dispatch = useDispatch()
  const accessToken = useSelector(state => state.user.accessToken)
  const user = useSelector(state => state.user.user)
  console.log(accessToken)
  const [dataNewTour, setDataNewTour] = useState([]);
  const [dataTourIn, setDataTourIn] = useState([]);
  const [dataTourOut, setDataTourOut] = useState([]);
  const [dataCar, setDataCar] = useState([]);
  const getDataNewTour = async () => {
    try {
      axios.defaults.withCredentials = true;
      const newTour = await axios.get(
        `http://localhost:3001/api/tours/newtour?limit=3`
      );
      console.log(newTour.data);
      setDataNewTour(newTour.data);
    } catch (error) {}
  };
  const getDataTourIn = async () => {
    try {
      axios.defaults.withCredentials = true;
      const newTour = await axios.get(`http://localhost:3001/api/tours/tourin`);
      // console.log(newTour.data);
      setDataTourIn(newTour.data);
    } catch (error) {}
  };
  const getDataTourOut = async () => {
    try {
      axios.defaults.withCredentials = true;
      const newTour = await axios.get(
        `http://localhost:3001/api/tours/tourout`
      );
      console.log(newTour.data);
      setDataTourOut(newTour.data);
    } catch (error) {}
  };
  const getDataCar = async () => {
    try {
      axios.defaults.withCredentials = true;
      const dataCar = await axios.get(
        `http://localhost:3001/api/cars?limit=4&page=1`
      );
      setDataCar(dataCar.data.cars);
    } catch (error) {}
  };
  const refreshToken = async () =>{
    try {
      const res = await axios.post('http://localhost:3001/api/auth/refreshtoken',{
        withCredentials: true
      })
      return res.data
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    axiosJWT.interceptors.request.use(async (config)=>{
      let date  = new Date()
      const decodeToken = jwt_decode(accessToken)
      if(decodeToken.exp < date.getTime()/1000){
        const data = await refreshToken()
        const refreshTokenStore = {
          ...user,
          accessToken: data.accessToken
        }
        dispatch(refreshTokenInStore(refreshTokenStore))
        config.headers['token'] = `Bearer ${data.accessToken}`
      }
      return config
    },
    (err)=>{
      return Promise.reject(err)
    }
    )

    getDataNewTour();
    getDataTourIn();
    getDataTourOut();
    getDataCar();
  }, []);

  return (
    <div className="home-main">
      <Navbar />
      <Header />
      <div className="homeContainer">
        <h1 className="homeTitle">
          {" "}
          <FontAwesomeIcon icon={faBars} /> Tours Du Lịch Mới Nhất
        </h1>
        <div className="featured">
          {dataNewTour?.map((item) => {
            return (
              <TourCard newCard={true} data={item} key={item._id}></TourCard>
            );
          })}
        </div>
        <h1 className="homeTitle">
          {" "}
          <FontAwesomeIcon icon={faBars} /> Tour Trong Nước
        </h1>
        <SliderTour dataTourIn={dataTourIn} />
        <h1 className="homeTitle">
          {" "}
          <FontAwesomeIcon icon={faBars} /> Tour Ngoài Nước
        </h1>
        <SliderTour dataTourOut={dataTourOut} />
        <h1 className="homeTitle">
          {" "}
          <FontAwesomeIcon icon={faBars} /> Thuê Xe
        </h1>

        <div className="fp">
          {dataCar.map((item) => {
            return <CarCard dataCar={item} key={item._id} />;
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
