import '../../styles/Home/Footer.css';
import { FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa'; // Importing icons for Instagram, Email, and Phone

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* First Column: Gmail */}
        <div className="footer-column footer-gmail">
          <p>
            <a href="mailto:cmsservices10@gmail.com">
              <FaEnvelope size={20} /> <span>cmsservices10@gmail.com</span>
            </a>
          </p>
        </div>

        {/* Second Column: Instagram and Copyright */}
        <div className="footer-column footer-instagram">
          {/* Instagram Link */}
          <a
            href="https://www.instagram.com/Cms_services.23"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
          >
            <FaInstagram size={20} /> Cms_services.23
          </a>
          {/* Copyright */}
          <p>&copy; 2024 CMS Services. All rights reserved.</p>
        </div>

        {/* Third Column: Phone Number */}
        <div className="footer-column footer-phone">
          
          <p>
            <FaPhone size={20} /> <span>+1647-446-9738</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
