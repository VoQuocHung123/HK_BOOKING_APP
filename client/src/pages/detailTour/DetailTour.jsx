import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { Carousel } from "antd";
import Footer from "../../components/footer/Footer";
import MailList from "../../components/mailList/MailList";
import { useLocation, useNavigate } from "react-router-dom";
import "./DetailTour.css";
import BasicTabs from "../../components/tabPanel/TabPanel";
import { useState, React, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import {
  faBed,
  faBars,
  faCircleInfo,
  faHouse,
  faLocationDot,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Empty } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import SliderTour from "../../components/sliderTour/SliderTour";
import { useSelector } from "react-redux";

export default function DetailTour() {
  const accessToken = useSelector(state=> state.user.accessToken)
  const location = useLocation();
  const navigate = useNavigate();
  const [dataDetailTour, setDataDetailTour] = useState({});
  const { user } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [totalPriceAdult, setTotalPriceAdult] = useState(0);
  const [totalPriceChild, setTotalPriceChild] = useState(0);
  const [dataTourIn, setDataTourIn] = useState([]);
  const [dataBookTour, setDataBookTour] = useState({
    adults: 0,
    children: 0,
    totalprice: 0,
  });
  const [error, setError] = useState("");
  const [openAddSnackbar, setOpenAddSnackbar] = useState(false);
  const setOpen = () => {
    if (user) {
      setOpenModal(!openModal);
    } else {
      navigate("/login");
    }
  };
  const getDataTourById = async () => {
    try {
      axios.defaults.withCredentials = true;
      const tourDetail = await axios.get(
        `http://localhost:3001/api/tours/${location.state._id}`
      );
      setDataDetailTour(tourDetail.data);
    } catch (error) {}
  };
  useEffect(() => {
    const getDataTourIn = async () => {
      try {
        axios.defaults.withCredentials = true;
        const newTour = await axios.get(
          `http://localhost:3001/api/tours/tourin`
        );
        // console.log(newTour.data);
        setDataTourIn(newTour.data);
      } catch (error) {}
    };
    getDataTourById();
    getDataTourIn();
  }, []);
  const handleClose = () => setOpenModal(false);
  const handleCloseAlert = () => {
    setOpenAddSnackbar(false);
  };
  const contentStyle = {
    margin: 0,
    height: "430px",
    width: "800px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    objectFit: "cover",
    borderRadius: 0,
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 3,
  };

  const onChange = (currentSlide) => {
    // console.log(currentSlide);
  };
  const handleChangePriceAdult = (e) => {
    console.log(e.target.value);
    let total = Number(e.target.value) * Number(location.state.priceadults);
    setTotalPriceAdult(total);
    setDataBookTour({ ...dataBookTour, adults: e.target.value });
  };
  const handleChangePriceChild = (e) => {
    let total = Number(e.target.value) * Number(location.state.pricechild);
    setTotalPriceChild(total);
    setDataBookTour({ ...dataBookTour, children: e.target.value });
  };
  const handleCancelForm = () => {
    setTotalPriceAdult(0);
    setTotalPriceChild(0);
    setError("");
    setOpenModal(false);
  };
  const handleSubmitForm = async () => {
    try {
      if (location.state.numberseats === 0) {
        return setError("Tour này đã đủ số lượng người tham gia");
      }
      if (totalPriceAdult + totalPriceChild <= 0) {
        return setError("Số lượng người tham gia phải lớn hơn 1");
      }
      console.log(dataBookTour);
      if (
        Number(dataBookTour.adults) + Number(dataBookTour.children) >
        location.state.numberseats
      ) {
        return setError("Số lượng người tham gia vượt quá chỗ trống");
      }
      const objData = {
        ...dataBookTour,
        totalprice: totalPriceAdult + totalPriceChild,
      };
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `http://localhost:3001/api/booktours/${location.state._id}`,
        objData,{headers: {token: 'Bearer '+ accessToken}}
      );
      console.log(res);
      setOpenAddSnackbar(true);
      getDataTourById();
      handleCancelForm();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />
      <Header type="list" />
      <div style={{ margin: "20px 40px 0px 40px", width: "1200px" }}>
        <Breadcrumb>
          <Breadcrumb.Item href="/">
            <HomeOutlined />
            <span>Trang chủ</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{location.state.title}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="container-detail">
        <div className="page-top">
          <div className="slide-image-page">
            <Carousel
              afterChange={onChange}
              style={{ width: 800 }}
              autoplay={true}
              dots={true}
            >
              <div>
                <img
                  style={contentStyle}
                  src={`http://localhost:3001/${location.state.image}`}
                ></img>
              </div>
              {location.state.slideimage.map((item) => {
                if (item !== "") {
                  return (
                    <div>
                      <img
                        style={contentStyle}
                        src={`http://localhost:3001/${item}`}
                      ></img>
                    </div>
                  );
                }
              })}
            </Carousel>
          </div>
          <div className="rigth-page">
            <div className="right-content">
              <div className="header-right-content">
                <h4>
                  {" "}
                  <FontAwesomeIcon icon={faCircleInfo} /> Thông tin & đặt vé
                </h4>
              </div>
              <table className="list-content">
                <tr className="name-type-list">
                  <td>Loại Tour:</td>
                  <td>
                    <span className="content-item-list">
                      {location.state.category}
                    </span>
                  </td>
                </tr>
                <tr className="name-type-list">
                  <td>Ngày khởi hành :</td>
                  <td>
                    <span className="content-item-list">
                      {new Date(location.state.datestart)
                        .toLocaleDateString("zh-Hans-CN")
                        .replaceAll("/", "-")}
                    </span>
                  </td>
                </tr>
                <tr className="name-type-list">
                  <td>Ngày Kết Thúc:</td>
                  <td>
                    <span className="content-item-list">
                      {new Date(location.state.dateend)
                        .toLocaleDateString("zh-Hans-CN")
                        .replaceAll("/", "-")}
                    </span>
                  </td>
                </tr>
                <tr className="name-type-list">
                  <td>Thời Gian:</td>
                  <td>
                    <span className="content-item-list">
                      {location.state.timetour}
                    </span>
                  </td>
                </tr>
                <tr className="name-type-list">
                  <td>Giá Người Lớn:</td>
                  <td>
                    <span className="content-item-list">
                      {" "}
                      {location.state.priceadults?.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}{" "}
                    </span>
                  </td>
                </tr>
                <tr className="name-type-list">
                  <td>Giá Trẻ Em:</td>
                  <td>
                    <span className="content-item-list">
                      {" "}
                      {location.state.pricechild?.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}{" "}
                    </span>
                  </td>
                </tr>
              </table>
              <div className="bottom-right-content">
                <div style={{ fontWeight: "bold" }}>
                  Chỗ còn trống :{" "}
                  <span style={{ color: "red" }}>
                    {" "}
                    {dataDetailTour?.numberseats}
                  </span>
                </div>
                <button className="btn-booking" onClick={setOpen}>
                  ĐẶT TOUR
                </button>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", marginTop: 10 }}>
          <div className="page-bottom">
            <h2 className="title-detail">{location.state.title}</h2>
            <div className="tab-page">
              <BasicTabs data={location.state} />
            </div>
          </div>
          <div className="right-page-bottom">
            <div className="tongdai-tuvan">
              <div className="header-tongdai">TỔNG ĐÀI TƯ VẤN</div>
              <div className="content-tongdai">
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "small",
                    marginBottom: 10,
                  }}
                >
                  Mọi thắc mắc của quý khách
                </div>
                <div style={{ fontSize: "small", marginBottom: 10 }}>
                  Vui lòng gọi hotline:{" "}
                  <span
                    style={{
                      fontSize: "15pt",
                      fontWeight: "bold",
                      color: "blue",
                      marginBottom: 10,
                    }}
                  >
                    {" "}
                    1900 3398
                  </span>
                </div>
                <div style={{ fontSize: "small" }}>Chúng tôi hỗ trợ 24/7</div>
              </div>
            </div>
            <div className="lienhe-tuvan">
              <h3 style={{ margin: 10 }}>
                Liên hệ tư vấn viên{" "}
                <hr
                  style={{
                    backgroundColor: "blue",
                    marginTop: 10,
                    height: 3,
                    width: 180,
                  }}
                />{" "}
              </h3>
              <div className="card-item-tuvan">
                <PhoneInTalkIcon color="success" fontSize="large" />
                <div style={{ marginLeft: 20 }}>
                  <h4 style={{ color: "gray" }}>Mr. Hùng</h4>
                  <h4>0335 950 499</h4>
                </div>
              </div>
              <div className="card-item-tuvan">
                <PhoneInTalkIcon color="success" fontSize="large" />
                <div style={{ marginLeft: 20 }}>
                  <h4 style={{ color: "gray" }}>Mr. Kiên</h4>
                  <h4>0335 950 499</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h1 className="homeTitle" style={{ margin: "50px 50px 30px 50px" }}>
          {" "}
          <FontAwesomeIcon icon={faBars} /> Tours Bạn Có Thể Thích
        </h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <SliderTour dataTourIn={dataTourIn} />
        </div>
      </div>

      <Footer />
      {openModal && (
        <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="header-form">
              <label style={{ fontWeight: "bold" }}>Form Đặt Tour</label>
            </div>
            <div className="body-form">
              <h3 className="title-info-form">Thông tin người đặt</h3>
              <div className="box-content-form">
                <ul className="list-info-form">
                  <tr>
                    <td style={{paddingRight: 20, fontWeight : 'bold', fontSize: '14px'}}>Họ Và Tên:</td>
                    <td>
                      <span style={{fontSize: '14px'}}>{user.username}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style={{paddingRight: 20, fontWeight : 'bold', fontSize: '14px'}}>Email:</td>
                    <td>
                      <span style={{fontSize: '14px'}}>{user.email}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style={{paddingRight: 20, fontWeight : 'bold', fontSize: '14px'}}>Tuổi:</td>
                    <td>
                      <span  style={{fontSize: '14px'}}>{user.age}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style={{paddingRight: 20, fontWeight : 'bold', fontSize: '14px'}}>Số Điện Thoại:</td>
                    <td>
                      <span  style={{fontSize: '14px'}}>{user.phonenumber}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style={{paddingRight: 20, fontWeight : 'bold', fontSize: '14px'}}>Giới Tính:</td>
                    <td>
                      <span  style={{fontSize: '14px'}}>{user.gender === "male" ? "Nam" : "Nữ"}</span>
                    </td>
                  </tr>
                </ul>
                <Avatar
                  alt="Remy Sharp"
                  src={`http://localhost:3001/${user.avatar}`}
                  sx={{ width: 80, height: 80 }}
                />
              </div>
              <h3 className="title-info-form">Thông tin đơn đặt</h3>
              <div className="date-start">
                <span style={{paddingRight: 20, fontWeight : 'bold', fontSize: '14px'}}>Ngày đi: </span>
                <input
                  className="input-date-start"
                  type="date"
                  value={new Date(location.state.datestart)
                    .toLocaleDateString("zh-Hans-CN")
                    .replaceAll("/", "-")}
                  disabled
                ></input>{" "}
              </div>
              <span className="date-start">
              <span style={{paddingRight: 20, fontWeight : 'bold', fontSize: '14px'}}>Số người lớn: </span>
                <input
                  className="input-adult"
                  onChange={handleChangePriceAdult}
                  type="number"
                  min="0"
                />
              </span>
              <span className="date-start">
              <span style={{paddingRight: 20, fontWeight : 'bold', fontSize: '14px'}}>Số trẻ em: </span>
                <input
                  className="input-child"
                  onChange={handleChangePriceChild}
                  type="number"
                  min="0"
                />
              </span>
              <h3 className="title-info-form">
                Thành tiền:{" "}
                <strong className="total-price">
                  {totalPriceAdult + totalPriceChild <= 0
                    ? 0
                    : (totalPriceAdult + totalPriceChild).toLocaleString('vi', {style : 'currency', currency : 'VND'})}
                </strong>{" "}
              </h3>
              <h5 className="msg-err-form">{error && error}</h5>
            </div>
            <div className="box-btn-event">
              <button className="btn-cancel-form" onClick={handleCancelForm}>
                Huỷ bỏ
              </button>
              <button className="btn-accept-form" onClick={handleSubmitForm}>
                Đồng Ý
              </button>
            </div>
          </Box>
        </Modal>
      )}
      <Snackbar
        open={openAddSnackbar}
        onClose={handleCloseAlert}
        autoHideDuration={1500}
      >
        <Alert variant="filled" severity="success" onClose={handleCloseAlert}>
          Đặt Tour Thành Công
        </Alert>
      </Snackbar>
    </>
  );
}
