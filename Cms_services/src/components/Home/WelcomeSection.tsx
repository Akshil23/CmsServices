import { useNavigate } from 'react-router-dom'; // For navigation
import '../../styles/Home/WelcomeSection.css'; // Importing custom CSS for the Welcome Section
import Cms_logo from '/Users/ak/Cms_services/Cms_services/public/Cms_logo.png'; // Update this path if necessary

const WelcomeSection: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate for page navigation

  // Function to handle click on the 'Tax Filing' button, navigates to the tax filing page
  const handleTaxFilingClick = () => {
    navigate('/tax-filing');
  };

  // Function to handle click on the 'Immigration Services' button, navigates to the immigration services page
  const handleImmigrationClick = () => {
    navigate('/immigration-services');
  };

  return (
    <section className="welcome-section">
      <div className="container">
        {/* Welcome Title and Text */}
        <h1 className="welcome-title">Welcome to CMS Services</h1>
        <p className="welcome-text">
          At CMS Services, we are dedicated to streamlining your tax filing and immigration procedures with exceptional ease and efficiency. Our expert team provides comprehensive support for individuals seeking assistance with tax filing and for those navigating the intricate landscape of immigration. Trust us to handle your needs with precision and care, ensuring a smooth and stress-free experience.
        </p>
        
        {/* Service Columns */}
        <div className="services-columns">
          
          {/* Tax Filing Services Column */}
          <div className="services-column">
  <h2>Tax Filing Services</h2>
  <ul>
    <li><b>Personal Tax Returns</b>: Maximize your refund and ensure compliance with all tax regulations.</li>
    <li><b>Family Tax Returns</b>: File for your entire family and claim eligible credits and deductions.</li>
    <li><b>Student Tuition Tax Credits</b>: Ensure you’re getting the most out of your education expenses with tuition tax credits.</li>
    <li><b>Newcomer Tax Benefits</b>: We help newcomers claim special tax benefits in their first year.</li>
    <li><b>Tax Benefits for Seniors</b>: Get assistance with pension income splitting and other benefits for retirees.</li>
    <li><b>Provincial Benefits</b>: Claim additional benefits specific to your province, such as provincial tax credits and rebates.</li>
    <li><b>Canada Carbon Rebate</b>: Receive a rebate for carbon tax paid, aimed at helping offset environmental costs.</li>
    <li><b>GST/HST Credit</b>: We help you qualify for the Goods and Services Tax (GST) / Harmonized Sales Tax (HST) credit, providing extra financial support.</li>
  </ul>
  <button className="btn btn-primary" onClick={handleTaxFilingClick}>Learn More About Tax Filing</button>
</div>

          
          {/* Immigration Services Column */}
          <div className="services-column">
            <h2>Immigration Services</h2>
            <ul>
              <li><b>Study Permit Extension</b>: Ensure your study permit is extended without delay, so you can focus on your education.</li>
              <li><b>Study Bridge Extension</b>: If your study permit is expiring in the same month as your studies end, contact us for a Study Bridge Extension.</li>
              <li><b>Temporary Resident Visa (TRV)</b>: Assistance with temporary resident visas for visits, study, or work purposes.</li>
              <li><b>Passport Renewal</b>: Ensure timely passport renewal without the hassle of complex procedures.</li>
              <li><b>Work Permit Applications</b>: Secure the correct work permit, whether you're an international student or professional.</li>
              <li><b>US Visa Application</b>: Guidance on obtaining the appropriate US visa, including B1/B2 visas for travel.</li>
              <li><b>Other Immigration Queries</b>: We handle other immigration-related services, from visa extensions to complex cases.</li>
            </ul>
            <button className="btn btn-primary" onClick={handleImmigrationClick}>Learn More About Immigration Services</button>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <h3 className="why-choose-us">Why Choose Us?</h3>
        <p className="welcome-text">
          With years of experience and a commitment to excellence, CMS Services is your trusted partner in managing both your tax and immigration needs. We provide personalized solutions tailored to your unique circumstances, ensuring a hassle-free experience every step of the way.
        </p>

        {/* Get Started Section */}
        <h3 className="get-started">Get Started Today</h3>
        <p className="welcome-text">
          Let us help you achieve peace of mind by handling the details, so you can focus on what matters most. Contact us now to learn more about how we can assist you.
        </p>

        {/* CMS Logo at the bottom */}
        <img src={Cms_logo} alt="CMS Services Logo" className="tax-filing-image" />
      </div>
    </section>
  );
};

export default WelcomeSection;
