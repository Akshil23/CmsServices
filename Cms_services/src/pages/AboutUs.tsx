import React from 'react';
import '../styles/pages/AboutUs.css'; // Import CSS for styling

const AboutUs: React.FC = () => {
  return (
    <div className="about-us-page">
      <div className="content-wrapper">
        {/* Page Header */}
        <header className="page-header">
          <h1><strong><span className="heading">About Us</span></strong></h1>
          <p>Get to know us better and discover why we are your trusted partner for tax filing and immigration services.</p>
        </header>

        {/* Introduction Section */}
        <section className="introduction-section">
          <h2>Who We Are</h2>
          <p>
            At CMS Services, we specialize in providing comprehensive **tax filing** and **immigration solutions** to individuals, families, and newcomers to Canada.  
            With **years of experience** in the industry, we have built a reputation for delivering professional, accurate, and client-focused services.  
            Our mission is to simplify complex processes, ensuring your journey—whether financial or immigration-related—is smooth and hassle-free.
          </p>
        </section>

        {/* Our Experience Section */}
        <section className="experience-section">
          <h2>Our Experience</h2>
          <p>
            With over **5 years of expertise**, we have successfully assisted countless clients with their tax filing and immigration needs.  
            From maximizing **tax benefits** for newcomers to supporting **visa and permit applications**, we ensure our clients receive the highest level of service.  
            Our team stays updated with the latest regulations, allowing us to provide tailored advice and solutions that work for you.
          </p>
        </section>

        {/* Contact Information Section */}
        <section className="contact-info-section">
          <h2>Contact Us</h2>
          <p>We are always here to help. Reach out to us using the contact details below:</p>
          <ul className="contact-info-list">
            <li><strong>Office Address:</strong> 40 Hashmi Place, Brampton, ON</li>
            <li>
              <strong>Google Maps:</strong>{' '}
              <a 
                href="https://maps.app.goo.gl/enFo5CRmun94q6PS9?g_st=com.google.maps.preview.copy" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                View on Google Maps
              </a>
            </li>
            <li><strong>Instagram: </strong> <a href="https://www.instagram.com/cms_services.23/profilecard/?igsh=Zmd6NThyeDduODY2" > Cms_services.23</a></li>
            <li><strong>Phone:</strong> <a href="tel:+16474469738">+1 (647) 446-9738</a></li>
            <li><strong>Business Email:</strong> <a href="mailto:cmsservices10@gmail.com">cmsservices10@gmail.com</a></li>
            <li><strong>Personal Email:</strong> <a href="mailto:akshilp05@gmail.com">akshilp05@gmail.com</a></li>
          </ul>
        </section>

        {/* Why Choose Us Section */}
        <section className="why-choose-us-section">
          <h2>Why Choose CMS Services?</h2>
          <ul>
            <li>Experienced professionals dedicated to your success</li>
            <li>Accurate and timely services for tax filing and immigration</li>
            <li>Specialized solutions for newcomers to Canada</li>
            <li>Commitment to transparency and customer satisfaction</li>
          </ul>
        </section>

        {/* Footer Note */}
        <footer className="page-footer">
          <p>At CMS Services, your success is our priority. Let us be your partner in navigating tax and immigration processes with ease.</p>
        </footer>
      </div>
    </div>
  );
};

export default AboutUs;
