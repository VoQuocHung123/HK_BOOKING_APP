import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import "./TabPanel.css";
import parse from "html-react-parser";
import Avatar from "@mui/material/Avatar";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect } from "react";
import axios from "axios";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import GoogleMapReact from 'google-map-react';
import { geocodeByAddress, getLatLng} from 'react-google-places-autocomplete'
import {
  faBed,
  faCar,
  faCircleInfo,
  faHouse,
  faLocationDot,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function TabPanel(props) {
  const { data, children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ data }) {
  const [value, setValue] = React.useState(0);
  const [valueRating, setValueRating] = React.useState(0);
  const [valueContent, setValueContent] = React.useState('');
  const [reviews, setReviews] = React.useState([]);
  const [coords, setCoords] =  React.useState({})
  const [hover, setHover] = React.useState(-1);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError]= React.useState('')
  const [readMore,setReadMore] = React.useState(false)
  const clickReadMore = ()=>{
    setReadMore(!readMore)
  }
  useEffect(()=>{
    const fn = async ()=>{
      console.log('abc')
      const result = await geocodeByAddress(data.location)
      const lnglat = await getLatLng(result[0])
      setCoords(lnglat)
    }
    fn()
  },[data.location])
  const labels = {
    1: "Rất Tệ",
    2: "Tệ",
    3: "Bình Thường",
    4: "Tốt",
    5: "Rất Tốt",
  };
  function getLabelText(valueRating) {
    return `${valueRating} Star${valueRating !== 1 ? "s" : ""}, ${labels[valueRating]}`;
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const getContentReivew = (e)=>{
    setValueContent(e.target.value)
  }
  const handleSendReivew = async ()=>{
    try {
      if(user){
        if(valueContent=== ''){
          return setError('Vui lòng nhập nội dung bình luận')
        }
        const newDataReview = {content: valueContent, rating: valueRating}
        axios.defaults.withCredentials = true;
        await axios.post(`http://localhost:3001/api/reviews/${data._id}`,newDataReview)
        setError('')
        setValueRating(0)
        getReviews();
      }else{
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }
  const getReviews = async () => {
    try {
      const reviews = await axios.get(
        `http://localhost:3001/api/reviews/bytour/${data._id}`
      );
      setReviews(reviews.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getReviews();
  }, []);
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Mô Tả" {...a11yProps(0)} />
          <Tab label="Đánh Giá Tour" {...a11yProps(1)} />
          <Tab label="Vị Trí" {...a11yProps(2)} />
        </Tabs> 
      </Box>
      <TabPanel value={value} index={0}>
        <div className="body-description">{ readMore ? parse(data.description) : parse(data.description.substring(0,1200)) }</div>
        <button className="btn-read-more" onClick={clickReadMore}> {readMore ? 'Thu Gọn': 'Xem Thêm'} {readMore? <ExpandLessIcon/> :<ExpandMoreIcon/> } </button>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {reviews.map((item) => {
          console.log(item)
          if(item.status === 'disable') return
          return (
            <>
              <div className="comment-item">
                <Avatar
                  alt="user"
                  src={`http://localhost:3001/${item.userid.avatar}`}
                />
                <div className="content-rating-item">
                  <strong>{item.userid.username}</strong>
                  <Rating style={{ marginLeft: 210}} name="read-only" value={item.rating} readOnly />
                  <p>{item.content}</p>
                </div>
              </div>
            </>
          );
        })}
        <div className="add-review">
          <div className="vote-rating">
            <span style={{paddingRight: 20, fontWeight: 'bold'}}>Vote rating: </span>
            <Rating
              name="hover-feedback"
              value={valueRating}
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                console.log(newValue)
                setValueRating(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
            {valueRating !== null && labels[hover !== -1 ? hover : valueRating]}
            <span className="msg-err-comment">{error && error}</span>
          </div>
          <div className="content-review">
            <Avatar
              alt="user"
              src={`http://localhost:3001/${user?.avatar}`}
              sx={{ marginTop: 0.5 }}
            />
            <input
              className="input-review"
              placeholder={`bình luận ở đây`}
              onChange={getContentReivew}
            ></input>
            <button onClick={handleSendReivew} className="btn-send-review">Gửi</button>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <h3 style={{padding: 10}}>Địa Điểm : {data.location}</h3>
      <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCF18zyGxk5tGHwhb8pFbFUSArIPqxcT2g" }}
        defaultCenter={coords}
        defaultZoom={18}
        center={coords}
      >
        <AnyReactComponent
          lat={coords?.lat}
          lng={coords?.lng}
          text={<FontAwesomeIcon icon={faLocationDot} color="red" size="3x"/>}
        />
      </GoogleMapReact>
    </div>
      </TabPanel>
    </Box>
  );
}
