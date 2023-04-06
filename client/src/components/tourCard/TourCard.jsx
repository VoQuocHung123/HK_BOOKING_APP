import React from "react";
import "./TourCard.css";
import { useNavigate } from "react-router-dom";
import EventNoteIcon from '@mui/icons-material/EventNote';
import SellIcon from '@mui/icons-material/Sell';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function TourCard({ data, slideCard, searchCard, newCard }) {
  const navigate = useNavigate();
  const { _id, title, timetour, image, priceadults } = data;
  const handleClick = () => {
    navigate(`/detailtour/${_id}`, { state: data });
  };
  return (
    <>
      {searchCard && (
        <div className="fpItemSearch" onClick={handleClick}>
          <div className="container-img-label">
            <img
              src={`http://localhost:3001/${image}`}
              alt=""
              className="fpImg"
              style={{ height: 180 }}
            />
          </div>
          <span className="fpNameSearch">{title.length > 30 ? title.substring(0,30)+'...': title}</span>
          <span className="fpCitySearch"> <EventNoteIcon/> {timetour || <Skeleton count={5}/>}</span>
          <span className="fpPrice"> <SellIcon></SellIcon> {priceadults?.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>
        </div>
      )}
      {slideCard && (
        <div className="fpItemSlide" onClick={handleClick}>
          <div className="container-img-label">
            <img
              src={`http://localhost:3001/${image}`}
              alt=""
              className="fpImg"
              style={{ height: 180 }}
            />
          </div>
          <span className="fpNameSlide">{title.length > 30 ? title.substring(0,30)+'...': title}</span>
          <span className="fpCitySlide">{timetour}</span>
        </div>
      )}
      {newCard && (
        <div className="fpItem" onClick={handleClick}>
          <div className="container-img-label">
            <span className="label-new">Mới nhất</span>
            <img
              src={`http://localhost:3001/${image}`}
              alt=""
              className="fpImg"
            />
          </div>
          <span className="fpName">{title.length > 30 ? title.substring(0,30)+'...': title}</span>
          <span className="fpCity"><EventNoteIcon/> <span style={{fontWeight: 'inherit',color: 'black'}}>{timetour}</span></span>
          <span className="fpPrice"><SellIcon></SellIcon> <span style={{fontSize: '19px',color: 'red',fontWeight: 'bold'}}> {priceadults?.toLocaleString('vi', {style : 'currency', currency : 'VND'})} </span></span>
        </div>
      )}
    </>
  );
}
