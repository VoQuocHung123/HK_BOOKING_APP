import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import TourCard from "../../components/tourCard/TourCard";
import Pagination from "@mui/material/Pagination";
import queryString from "query-string";
import { Radio, Space } from "antd";
import {
  faBed,
  faCar,
  faCircleInfo,
  faHouse,
  faLocationDot,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../../components/footer/Footer";
import { Empty } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";

const ListTour = () => {
  const location = useLocation();
  console.log(location.state);
  const [title, setTitle] = useState();
  const [date, setDate] = useState();
  const [dataTourSearch, setDataTourSearch] = useState([]);
  const [numOfPage, setNumOfPage] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams({
    limit: 6,
    page: 1,
  });
  const [valueFilterPrice, setValueFilterPrice] = useState();
  const [valueFilterCategory, setValueFilterCategory] = useState();
  const onChangeRadioPrice = (e) => {
    setValueFilterPrice(e.target.value);
    switch (e.target.value) {
      case 1:
        setSearchParams({ ...searchParams, pricemin: 0, pricemax: 500000 });
        break;
      case 2:
        setSearchParams({
          ...searchParams,
          pricemin: 500000,
          pricemax: 1000000,
        });
        break;
      case 3:
        setSearchParams({
          ...searchParams,
          pricemin: 1000000,
          pricemax: 2000000,
        });
        break;
      case 4:
        setSearchParams({
          ...searchParams,
          pricemin: 2000000,
          pricemax: 3000000,
        });
        break;
      case 5:
        setSearchParams({ ...searchParams, pricemin: 3000000 });
        break;
      default:
        return;
    }
  };
  const onChangeRadioCategory = (e) => {
    setValueFilterCategory(e.target.value);
    if (e.target.value === 1) {
      setSearchParams({ ...searchParams, category: "Tour Trong Nước" });
    }
    if (e.target.value === 2) {
      setSearchParams({ ...searchParams, category: "Tour Ngoài Nước" });
    }
  };
  const handlePageChange = async (newPage) => {
    console.log(newPage);
    setSearchParams({ limit: 6, page: newPage });
  };
  const handleDate = (e) => {
    setDate({ ...date, [e.target.name]: e.target.value });
  };
  const handleSearch = () => {
    if (date === undefined && title === undefined) {
      return;
    }
    if (date === undefined) {
      setSearchParams({ ...searchParams, title });
    } else if (title === undefined) {
      setSearchParams({
        ...searchParams,
        datestart: date.datestart,
        dateend: date.dateend,
      });
    } else {
      setSearchParams({
        ...searchParams,
        datestart: date.datestart,
        dateend: date.dateend,
        title,
      });
    }
  };
  const getDataTourSearch = async () => {
    try {
      if (location.state) {
        let dataTour = [];
        if (location.state.date === undefined) {
          dataTour = await axios.get(
            `http://localhost:3001/api/tours?title=${location.state.title}`
          );
          }
         if (location.state.title === "") {
          console.log('nnn',location.state.date.datestart)
          dataTour = await axios.get(
            `http://localhost:3001/api/tours?datestart=${location.state.date.datestart}&dateend=${location.state.date.dateend}`
          );
        } 
        if(location.state.title != "" && location.state.date != undefined) {
          dataTour = await axios.get(
            `http://localhost:3001/api/tours?title=${location.state.title}&datestart=${location.state.date.datestart?.datestart}&dateend=${location.state.date.dateend?.dateend}`
          );
        }
        setDataTourSearch(dataTour.data.tours);
        const lengthPages = Math.ceil(dataTour.data.countTour / 6);
        const arrNumPage = [];
        for (let i = 1; i <= lengthPages; i++) {
          arrNumPage.push(i);
        }
        setNumOfPage(arrNumPage);
      } else {
        axios.defaults.withCredentials = true;
        const query = queryString.stringify(Object.fromEntries(searchParams));
        const newTour = await axios.get(
          `http://localhost:3001/api/tours?${query}`
        );
        setDataTourSearch(newTour.data.tours);
        const lengthPages = Math.ceil(newTour.data.countTour / 6);
        console.log(lengthPages)
        const arrNumPage = [];
        for (let i = 1; i <= lengthPages; i++) {
          arrNumPage.push(i);
        }
        console.log(arrNumPage)
        setNumOfPage(arrNumPage);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDataTourSearch();
  }, [searchParams]);
  return (
    <div className="list-main">
      <Navbar />
      <Header type="list" />
      {/* <h1 className="homeTitle" >
        <FontAwesomeIcon icon={faLocationDot} /> Danh Sách Tour Du Lịch <hr style={{marginTop: 10}}/>
      </h1> */}
      <div style={{ margin: '20px 40px 0px 40px',width: '1200px' }}>
        <Breadcrumb>
          <Breadcrumb.Item href="/">
            <HomeOutlined />
            <span>Trang chủ</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Tour du lịch</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="listContainer">
        <div className="box-filter">
          <div className="filter-by-search">
            <h5 style={{ padding: 10 }}>Tìm kiếm:</h5>
            <input
              className="search-list"
              type="text"
              placeholder="Tìm kiếm ..."
              onChange={(e) => setTitle(e.target.value.trim())}
            />
            <input
              className="date-search-list"
              type="date"
              name="datestart"
              onChange={handleDate}
            />
            <input
              className="date-search-list"
              type="date"
              name="dateend"
              onChange={handleDate}
            />
            <button className="btn-search-list" onClick={handleSearch}>
              Tìm
            </button>
          </div>
          <div className="filter-by-price">
            <h5 style={{ padding: 10 }}>Lọc theo giá:</h5>
            <Radio.Group onChange={onChangeRadioPrice} value={valueFilterPrice}>
              <Space style={{ paddingLeft: 10 }} direction="vertical">
                <Radio value={1}>0 VNĐ - 500.000 VNĐ</Radio>
                <Radio value={2}>500.000 VNĐ - 1.000.000 VNĐ</Radio>
                <Radio value={3}>1.000.000 VNĐ - 2.000.000 VNĐ</Radio>
                <Radio value={4}>2.000.000 VNĐ - 3.000.000 VNĐ</Radio>
                <Radio value={5}>3.000.000 VNĐ +</Radio>
              </Space>
            </Radio.Group>
            <h5 style={{ padding: 10 }}>Lọc theo danh mục:</h5>
            <Radio.Group
              onChange={onChangeRadioCategory}
              value={valueFilterCategory}
            >
              <Space style={{ paddingLeft: 10 }} direction="vertical">
                <Radio value={1}>Tour Trong Nước</Radio>
                <Radio value={2}>Tour Ngoài Nước</Radio>
              </Space>
            </Radio.Group>
          </div>
        </div>
        <div className="list-item-search">
          {dataTourSearch?.length === 0 ? (
            <Empty
              description="không tìm thấy kết quả"
              style={{ display: "block", margin: "auto" }}
            />
          ) : (
            dataTourSearch?.map((item) => {
              return (
                <TourCard
                  searchCard={true}
                  data={item} 
                  key={item._id}
                ></TourCard>
              );
            })
          )}
        </div>
      </div>
      <div className="pagination">
        <Pagination
          className="pagi"
          color="primary"
          count={numOfPage.length}
          variant="outlined"
          shape="rounded"
          onChange={(e, value) => handlePageChange(value)}
        />
      </div>
      <Footer />
    </div>
  );
};

export default ListTour;
