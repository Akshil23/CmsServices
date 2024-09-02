import React from 'react';
import { useHistory } from 'react-router-dom'; // Assuming you're using React Router for navigation
import '../../styles/Home/WelcomeSection.css';
import Cms_logo from '/Users/ak/Cms_services/Cms_services/public/Cms_logo.png'; // Update this path based on where you save your image

const WelcomeSection: React.FC = () => {
  const history = useHistory();

  const handleTaxFilingClick = () => {
    history.push('/tax-filing'); // Navigate to the tax filing page
  };

  const handleImmigrationClick = () => {
    history.push('/immigration-services'); // Navigate to the immigration services page
  };

  return (
    <section className="welcome-section">
      <div className="container">
        <h1 className="welcome-title">Welcome to CMS Services</h1>
        <p className="welcome-text">
          At CMS Services, we are dedicated to streamlining your tax filing and immigration procedures with exceptional ease and efficiency. Our expert team provides comprehensive support for individuals seeking assistance with tax filing and for those navigating the intricate landscape of immigration. Trust us to handle your needs with precision and care, ensuring a smooth and stress-free experience.
        </p>
        <div className="services-columns">
          <div className="services-column">
            <h2>Tax Filing</h2>
            <ul>
              <li>Ensure your taxes are filed accurately and on time. <span className="service-price"></span></li>
            </ul>
            <button className="Know-more-button" onClick={handleTaxFilingClick}>Know More</button>
          </div>
          <div className="services-column">
            <h2>Immigration Services</h2>
            <ul>
              <li>Study Permit Extension <span className="service-price"></span></li>
              <li>Temporary Resident Visa (TRV) Application <span className="service-price"></span></li>
              <li>Passport Renewal <span className="service-price"></span></li>
              <li>Work Permit Application <span className="service-price"></span></li>
              <li>US Visa Application <span className="service-price"></span></li>
              <li>Assistance with any other immigration-related queries <span className="service-price">Varies</span></li>
            </ul>
            <button className="Know-more-button" onClick={handleImmigrationClick}>Know More</button>
          </div>
        </div>
        <h3 className="why-choose-us">Why Choose Us?</h3>
        <p className="welcome-text">
          With years of experience and a commitment to excellence, CMS Services is your trusted partner in managing both your tax and immigration needs. We provide personalized solutions tailored to your unique circumstances, ensuring a hassle-free experience every step of the way.
        </p>
        <h3 className="get-started">Get Started Today</h3>
        <p className="welcome-text">
          Let us help you achieve peace of mind by handling the details, so you can focus on what matters most. Contact us now to learn more about how we can assist you.
        </p>
        {/* Logo placed at the bottom */}
        <img src={Cms_logo} alt="CMS Services Logo" className="tax-filing-image" />
      </div>
    </section>
  );
};

export default WelcomeSection;
