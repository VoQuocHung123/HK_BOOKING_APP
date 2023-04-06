import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import {AuthContext} from '../../context/AuthContext.js';

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const {user} = useContext(AuthContext)

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          {" "}
        </div>
        <div className="items">
          <div className="item">
            <img
              src={`http://localhost:3001/${user.avatar}`}
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
