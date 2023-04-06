import { useContext, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import "./navbar.css";
import Logo from "./Logo-removebg-preview.png";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import SailingSharpIcon from "@mui/icons-material/SailingSharp";
import TimeToLeaveSharpIcon from "@mui/icons-material/TimeToLeaveSharp";
import ExitToAppSharpIcon from "@mui/icons-material/ExitToAppSharp";
import { logout } from "../../redux/apiRequest";

const Navbar = () => {
  // const { user } = useContext(AuthContext);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openAddSnackbar, setOpenAddSnackbar] = useState(false);
  const handleCloseAlert = () => {
    setOpenAddSnackbar(false);
  };
  // const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    dispatch(logout())
    // dispatch({ type: "LOGOUT" });
    // try {
    //   axios.defaults.withCredentials = true;
    //   await axios.post("http://localhost:3001/api/auth/logout");
    //
    // } catch (err) {
    //   dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    // }
    // setAnchorEl(null);
  };
  return (
    <>
      <div className="navbar">
        <div className="navContainer">
          <Link to="/">
            <span className="logo">
              <img src={Logo} alt="" width={130} />
            </span>
          </Link>
          {!user ? (
            <div className="navItems">
              <Link to="/register">
                <button className="navButton">Đăng Ký</button>
              </Link>
              <Link to="/login">
                <button className="navButton">Đăng Nhập</button>
              </Link>
            </div>
          ) : (
            <div>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <span style={{ fontSize: 11, color: "black", marginRight: 10 }}>
                  {" "}
                  {user.username}{" "}
                </span>

                <Avatar
                  alt="user"
                  src={`http://localhost:3001/${user.avatar}`}
                />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <Link className="nav-link" to="/manageaccount">
                  <MenuItem onClick={handleClose}>
                    {" "}
                    <AccountCircleSharpIcon />
                    Thông tin tài khoản
                  </MenuItem>
                </Link>
                <Link className="nav-link" to="/bookedtour">
                  <MenuItem onClick={handleClose}>
                    {" "}
                    <SailingSharpIcon /> Tour đã đặt
                  </MenuItem>
                </Link>
                <Link className="nav-link" to="/bookedcar">
                  <MenuItem onClick={handleClose}>
                    {" "}
                    <TimeToLeaveSharpIcon /> Xe đã đặt
                  </MenuItem>
                </Link>
                <MenuItem onClick={handleLogout}>
                  {" "}
                  <ExitToAppSharpIcon /> Đăng xuất
                </MenuItem>
              </Menu>
            </div>
          )}
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "bot", horizontal: "left" }}
        open={openAddSnackbar}
        onClose={handleCloseAlert}
        autoHideDuration={1500}
      >
        <Alert variant="filled" severity="success" onClose={handleCloseAlert}>
          Đăng Xuất Thành Công
        </Alert>
      </Snackbar>
    </>
  );
};

export default Navbar;
