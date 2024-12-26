import '../../styles/Home/Footer.css';
import { FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'; // Added Map Marker icon

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        
        {/* Email Column */}
        <div className="footer-column footer-email">
          <p>
            <a href="mailto:cmsservices10@gmail.com">
              <FaEnvelope size={20} /> <span>cmsservices10@gmail.com</span>
            </a>
          </p>
        </div>

        {/* Instagram Column */}
        <div className="footer-column footer-instagram">
          <a
            href="https://www.instagram.com/Cms_services.23"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
          >
            <FaInstagram size={20} /> Cms_services.23
          </a>
        </div>

        {/* Phone Number with WhatsApp */}
        <div className="footer-column footer-phone">
          <p>
            <a
              href="https://wa.me/16474469738"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaPhone size={20} /> <span>+1 647-446-9738</span>
            </a>
          </p>
        </div>

        {/* Workplace Address */}
        <div className="footer-column footer-address">
          <p>
            <a
              href="https://maps.app.goo.gl/j99dZdqU66HSiUXX6"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaMapMarkerAlt size={20} /> <span>Cms Services</span>
            </a>
          </p>
        </div>

        {/* Copyright Information */}
        <div className="footer-column footer-copyright">
          <p>&copy; 2024 CMS Services. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
