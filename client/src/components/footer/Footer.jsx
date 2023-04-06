import "./footer.css";
import Logo from "./Logo-removebg-preview.png";
import FacebookSharpIcon from '@mui/icons-material/FacebookSharp';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TelegramIcon from '@mui/icons-material/Telegram';
import CopyrightIcon from '@mui/icons-material/Copyright';
const Footer = () => {
  return (
    <>
      <div className="footer-container">
        <div className="logo-footer">
          <img src={Logo} alt="" width={250} />
        </div>
        <div className="list-content-footer">
          <strong className="title-list-footer">Liên Hệ</strong>
          <ul className="list-ul-footer">
            <li> <FacebookSharpIcon/> FaceBook</li>
            <li> <YouTubeIcon/> YouTube</li>
            <li> <TelegramIcon/> Telegram</li>
          </ul>
        </div>
        <div className="list-content-footer">
          <strong>Liên Hệ</strong>
          <ul className="list-ul-footer">
            <li> <FacebookSharpIcon/> FaceBook</li>
            <li> <YouTubeIcon/> YouTube</li>
            <li> <TelegramIcon/> Telegram</li>
          </ul>
        </div>
        <div className="list-content-footer">
          <strong>Liên Hệ</strong>
          <ul className="list-ul-footer">
            <li> <FacebookSharpIcon/> FaceBook</li>
            <li> <YouTubeIcon/> YouTube</li>
            <li> <TelegramIcon/> Telegram</li>
          </ul>
        </div>
      </div>
      
    </>
  );
};

export default Footer;
