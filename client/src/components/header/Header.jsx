import {
  faBed,
  faCar,
  faCircleInfo,
  faHouse,
  faLocationDot,
  faUser,
  faBars,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { useState, useContext } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useNavigate, NavLink } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Header = ({ type }) => {
  
  const [title, setTitle] = useState("");
  const [date, setDate] = useState();
  const [error, setError] = useState();
  const [activeNavbar, setActiveNavbar] = useState(false);
  const [activeMenuPhone, setActiveMenuPhone] = useState(false);
  const [contentActiveMenu, setContentActiveMenu] = useState({
    icon: faHouse,
    content: "Trang Chủ",
  });
  console.log(contentActiveMenu)
  const handleDate = (e) => {
    setDate({ ...date, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const [openAddSnackbar, setOpenAddSnackbar] = useState(false);
  const handleCloseAlert = () => {
    setOpenAddSnackbar(false);
  };

  const handleSearch = () => {
    if (title === "" && date === undefined) {
      setOpenAddSnackbar(true);
    } else {
      navigate("/tours", { state: { title, date } });
    }
  };

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "inactive")}
            style={{ lineHeight: "40px" }}
          >
            <div className="headerListItem">
              <FontAwesomeIcon icon={faHouse} />
              <span>Trang Chủ</span>
            </div>
          </NavLink>
          <NavLink
            to="/tours"
            className={({ isActive }) => (isActive ? "active" : "inactive")}
            style={{ lineHeight: "40px" }}
          >
            <div className="headerListItem">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>Tours</span>
            </div>
          </NavLink>
          <NavLink
            to="/cars"
            className={({ isActive }) => (isActive ? "active" : "inactive")}
            style={{ lineHeight: "40px" }}
          >
            <div className="headerListItem">
              <FontAwesomeIcon icon={faCar} />
              <span>Xe Du Lịch</span>
            </div>
          </NavLink>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faUser} />
            <span>Liên Hệ</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCircleInfo} />
            <span>Giới Thiệu</span>
          </div>
        </div>
        <div className="headerMobile">
          <div
            className={`headerListItem ${activeNavbar ? "active" : ""}`}
            style={activeMenuPhone ? { display: "none" } : { display: "flex" }}
          >
            <FontAwesomeIcon icon={contentActiveMenu?.icon} />
            <span>{contentActiveMenu?.content}</span>
          </div>
          <div
            className="menu-header-mobile"
            style={activeMenuPhone ? { display: "flex" } : { display: "none" }}
          >
            <div
              className={`headerListItem ${activeNavbar ? "active" : ""}`}
              onClick={() => {
                navigate("/");
                setContentActiveMenu({ icon: faHouse, content: "Trang Chủ" });
                setActiveMenuPhone(!activeMenuPhone);
                navigate("/");
              }}
            >
              <FontAwesomeIcon icon={faHouse} size={"sm"} />
              <span>Trang Chủ</span>
            </div>
            <div
              className={`headerListItem ${activeNavbar ? "active" : ""}`}
              onClick={() => {
                setContentActiveMenu({
                  icon: faLocationDot,
                  content: "Tour",
                });
                setActiveMenuPhone(!activeMenuPhone);
                navigate("/tours");
              }}
            >
              <FontAwesomeIcon icon={faLocationDot} size={"sm"} />
              <span>Tours</span>
            </div>

            <div
              className="headerListItem"
              onClick={() => {
                setContentActiveMenu({ icon: faCar, content: "Xe Du Lịch" });
                setActiveMenuPhone(!activeMenuPhone);
                navigate("/cars");
              }}
            >
              <FontAwesomeIcon icon={faCar} size={"sm"} />
              <span>Xe Du Lịch</span>
            </div>

            <div className="headerListItem">
              <FontAwesomeIcon icon={faUser} size={"sm"} />
              <span>Liên Hệ</span>
            </div>
            <div className="headerListItem">
              <FontAwesomeIcon icon={faCircleInfo} size={"sm"} />
              <span>Giới Thiệu</span>
            </div>
          </div>
          <button onClick={() => setActiveMenuPhone(!activeMenuPhone)}>
            {activeMenuPhone ? (
              <FontAwesomeIcon icon={faX} />
            ) : (
              <FontAwesomeIcon icon={faBars} />
            )}
          </button>
        </div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">Tìm và đặt các trải nghiệm hấp dẫn</h1>
            <p className="headerDesc">
              Khám phá thêm về điểm đến và tận hưởng trọn vẹn chuyến đi
            </p>
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Bạn muốn đi đâu  ?"
                  className="headerSearchInput"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <div className="">
                  <span className="span-title">Ngày bắt đầu</span>
                  <input
                    className="input-date"
                    type="date"
                    name="datestart"
                    id=""
                    onChange={handleDate}
                  />
                  <span className="span-title">Ngày kết thúc</span>
                  <input
                    className="input-date"
                    type="date"
                    name="dateend"
                    id=""
                    onChange={handleDate}
                  />
                </div>
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Tìm kiếm
                </button>
              </div>
            </div>
            <div className="headerSearchMobile">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Bạn muốn đi đâu  ?"
                  className="headerSearchInput"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <span className="span-title">Ngày bắt đầu</span>
                <input
                  className="input-date"
                  type="date"
                  name="datestart"
                  id=""
                  onChange={handleDate}
                />
                <span className="span-title">Ngày kết thúc</span>
                <input
                  className="input-date"
                  type="date"
                  name="dateend"
                  id=""
                  onChange={handleDate}
                />
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Tìm kiếm
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openAddSnackbar}
        onClose={handleCloseAlert}
        autoHideDuration={1500}
      >
        <Alert variant="filled" severity="error" onClose={handleCloseAlert}>
          Vui lòng nhập thông tin tìm kiếm
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Header;
