import '../../styles/Home/Footer.css';
import Cms_logo from '/Users/ak/Cms_services/Cms_services/public/Cms_logo.png'; // Adjust path if necessary

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Left: Logo */}
        <div className="footer-column footer-logo-container">
          <img src={Cms_logo} alt="CMS Logo" className="footer-logo" />
        </div>

        {/* Center: Contact Information */}
        <div className="footer-column footer-contact">
          
          <p>
            <strong>Phone:</strong> <a href="tel:6474469738">647-446-9738</a>
          </p>
          <p>
            <strong>Email:</strong> <a href="mailto:cmsservices10@gmail.com">cmsservices10@gmail.com</a>
          </p>
        </div>

        {/* Right: Developer Info and Copyright */}
        <div className="footer-column footer-info">
          <p>Website Developed By: <strong>Akshil Patel</strong></p>
          <p>&copy; 2024 CMS Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
