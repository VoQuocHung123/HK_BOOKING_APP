import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import SailingSharpIcon from "@mui/icons-material/SailingSharp";
import TimeToLeaveSharpIcon from "@mui/icons-material/TimeToLeaveSharp";
import ExitToAppSharpIcon from "@mui/icons-material/ExitToAppSharp";
import './SideBar.css'

export default function SideBar() {
  const sidebar = useRef();
  console.log(sidebar);

  return (
    <div className="list-action-manage">
      <NavLink className={({isActive})=>(isActive ? 'active-side-bar' : '')} to="/manageaccount">
        <div className="left-manage-item">
          {" "}
          <AccountCircleSharpIcon /> Thông tin tài khoản
        </div>
      </NavLink>
      <NavLink   className={({isActive})=>(isActive ? 'active-side-bar' : '')} to="/bookedtour">
        <div className="left-manage-item">
          {" "}
          <SailingSharpIcon /> Đơn đặt tour
        </div>
      </NavLink>
      <NavLink  className={({isActive})=>(isActive ? 'active-side-bar' : '')} to="/bookedcar">
        <div className="left-manage-item">
          {" "}
          <TimeToLeaveSharpIcon /> Đơn đặt xe
        </div>
      </NavLink>
      <NavLink  className={({isActive})=>(isActive ? 'active-side-bar' : '')} to="/changepassword">
        <div className="left-manage-item">
          {" "}
          <ExitToAppSharpIcon /> Đổi mật khẩu
        </div>
      </NavLink>
    </div>
  );
}
