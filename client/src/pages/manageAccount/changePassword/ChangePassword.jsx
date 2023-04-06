import React from "react";
import Navbar from "../../../components/navbar/Navbar";
import Header from "../../../components/header/Header";
import SideBar from "../../../components/sidebar/SideBar";
import Avatar from "@mui/material/Avatar";
import { AuthContext } from "../../../context/AuthContext";
import { useContext, useState } from "react";
import axios from "axios";
import "../changePassword/changePassword.css";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useSelector , useDispatch } from "react-redux";
import { changepPassword } from "../../../redux/apiRequest";
export default function ChangePassword() {
  // const { user, dispatch } = useContext(AuthContext);
  const error = useSelector(state => state.user.error)
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()
  const [validateForm, setValidateForm] = useState("");
  const [dataChangePass, setDataChangePass] = useState({
    oldpassword: "",
    newpassword: "",
    confirmpassword: "",
  });
  const [openAddSnackbar, setOpenAddSnackbar] = useState(false);
  const handleCloseAlert = () => {
    setOpenAddSnackbar(false);
  };
  const handleChangeInput = (e) => {
    setDataChangePass({ ...dataChangePass, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    dispatch(changepPassword(dataChangePass)).unwrap().then(()=>{
      setOpenAddSnackbar(true)
    }).catch(error=> console.log(error))
    // if (
    //   dataChangePass.oldpassword === "" ||
    //   dataChangePass.newpassword === "" ||
    //   dataChangePass.confirmpassword === ""
    // ) {
    //   dispatch({
    //     type: "CHANGEPASSWORD_FAILURE",
    //     payload: "Vui lòng không để trống",
    //   });
    // }
    // try {
    //   axios.defaults.withCredentials = true;
    //   const res = await axios.post(
    //     "http://localhost:3001/api/auth/changepassword",
    //     dataChangePass
    //   );
    //   dispatch({ type: "CHANGEPASSWORD_SUCCESS", payload: res.data });
    //   setOpenAddSnackbar(true);
    // } catch (error) {
    //   console.log(error);
    //   dispatch({
    //     type: "CHANGEPASSWORD_FAILURE",
    //     payload: error.response.data,
    //   });
    // }
  };
  return (
    <>
      <Navbar />
      <Header type="list" />
      <div className="container-account">
        <div className="left-manage">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              alt="user"
              sx={{ width: 56, height: 56 }}
              src={`http://localhost:3001/${user?.avatar}`}
            />
            <strong className="username-account">{user?.username}</strong>
          </div>
          <SideBar />
        </div>
        <div className="right-manage" style={{ height: 500 }}>
          <div className="changepass-main">
            <div className="header-title-changepass">
              <h2>Thay Đổi Mật Khẩu </h2>
              <p style={{ paddingTop: 10 }}>
                Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người
                khác
              </p>
            </div>
            <div className="body-changepass">
              <form>
                <div className="formInput">
                  <label>Mật khẩu hiện tại:</label>
                  <input
                    onChange={handleChangeInput}
                    type="password"
                    id="oldpassword"
                    name="oldpassword"
                    className="form-input"
                    placeholder="Nhập mật khẩu cũ"
                  />
                </div>
                <div className="formInput">
                  <label>Mật khẩu mới:</label>
                  <input
                    onChange={handleChangeInput}
                    type="password"
                    id="newpassword"
                    name="newpassword"
                    className="form-input"
                    placeholder="Nhập mật khẩu mới"
                  />
                </div>
                <div className="formInput">
                  <label>Xác nhận mật khẩu:</label>
                  <input
                    onChange={handleChangeInput}
                    type="password"
                    id="confirmpassword"
                    name="confirmpassword"
                    className="form-input"
                    placeholder="Nhập lại mật khẩu mới"
                  />
                  <p className="msg-err">{error && error.message}</p>
                </div>
            
                <button className="btn-changepass" onClick={handleSubmitForm}>
                  Xác Nhận
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openAddSnackbar}
        onClose={handleCloseAlert}
        autoHideDuration={1500}
      >
        <Alert variant="filled" severity="success" onClose={handleCloseAlert}>
          Đổi Mật Khẩu Thành Công
        </Alert>
      </Snackbar>
    </>
  );
}
