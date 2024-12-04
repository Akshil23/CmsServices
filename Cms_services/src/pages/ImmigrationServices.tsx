import React, { useState, useRef } from 'react';
import '../styles/pages/ImmigrationServices.css'; // Custom CSS for consistency
import { FaWhatsapp } from 'react-icons/fa'; // Icon for WhatsApp

const DetailedImmigrationServices: React.FC = () => {
  const whatsappNumber = "+16474469738"; // Replace with your WhatsApp number
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    service: "",
    customQuery: "", // For custom queries
  });

  const formRef = useRef<HTMLDivElement>(null); // Reference to the form

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Handle service button click
  const handleServiceSelection = (service: string) => {
    setUserInfo((prev) => ({ ...prev, service }));
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" }); // Scroll to the form
    }
  };

  // Construct WhatsApp message link, including custom query only if present
  const constructWhatsAppLink = () => {
    let message = `Name: ${userInfo.name}%0AEmail: ${userInfo.email}%0AService: ${userInfo.service}`;
    
    // Append custom query only if the user entered one
    if (userInfo.customQuery) {
      message += `%0AQuery: ${userInfo.customQuery}`;
    }

    return `https://wa.me/${whatsappNumber}?text=${message}`;
  };

  return (
    <section className="detailed-immigration-services">
      <div className="container">
        <h1 className="page-title">Immigration Services - Detailed Information</h1>
        <p className="description">
          Explore our wide range of immigration services tailored to meet your needs.
        </p>

        <div className="services-list">
          {/* Service 1: Study Permit Extension */}
          <div className="service-item">
            <h2><strong>Study Permit Extension</strong><br /></h2>
            <p className="price">
              Extend your study permit seamlessly and avoid interruptions to your studies.<br />
              Application Fees: $40
            </p>
            <button onClick={() => handleServiceSelection("Study Permit Extension")}>
              Select This Service
            </button>
            <p className="detailed-description">
              If you are studying in Canada and your study permit is about to expire, you must apply for a study permit extension to continue your education without interruption.
            </p>
          </div>

          {/* Service 2: Temporary Resident Visa (TRV) */}
          <div className="service-item">
            <h2><strong>Temporary Resident Visa (TRV) Application</strong><br /></h2>
            <p className="price">
              Apply for a TRV to extend your stay for work, study, or visit.<br />
              Application Fee: $35
            </p>
            <button onClick={() => handleServiceSelection("Temporary Resident Visa")}>
              Select This Service
            </button>
            <p className="detailed-description">
              A Temporary Resident Visa (TRV) allows foreign nationals to stay in Canada for a short duration, whether for tourism, business, or family visits.
            </p>
          </div>

          {/* New Service: PGWP after two one-plus-one-year courses */}
          <div className="service-item">
            <h2><strong>Post-Graduation Work Permit (PGWP) after Two One-Plus-One Year Courses</strong><br /></h2>
            <p className="price">
              Apply for PGWP after completing two one-year courses in Canada.<br />
              Application Fee: $255
            </p>
            <button onClick={() => handleServiceSelection("PGWP after Two One-Plus-One Year Courses")}>
              Select This Service
            </button>
            <p className="detailed-description">
              If you have completed two one-year programs in Canada, you may be eligible to apply for a Post-Graduation Work Permit (PGWP). This permit allows you to work in Canada after your studies and gain valuable experience in the Canadian workforce. We guide you through the entire application process and help ensure that your eligibility is met.
            </p>
          </div>

          {/* Service 4: Work Permit Application */}
          <div className="service-item">
            <h2><strong>Work Permit Application</strong><br /></h2>
            <p className="price">
              Get assistance with the correct work permit application for your professional needs.<br />
              Application Fee: $40
            </p>
            <button onClick={() => handleServiceSelection("Work Permit Application")}>
              Select This Service
            </button>
            <p className="detailed-description">
              A work permit is required for foreign nationals who wish to work in Canada. We assist you in choosing the correct work permit based on your job offer and skills.
            </p>
          </div>

          {/* Service 5: U.S. Visa Application */}
          <div className="service-item">
            <h2><strong>U.S. Visa Application</strong><br /></h2>
            <p className="price">
              Guidance on obtaining the appropriate U.S. visa, including B1/B2 visas for travel.<br />
              Application Fee: $40
            </p>
            <button onClick={() => handleServiceSelection("U.S. Visa Application")}>
              Select This Service
            </button>
            <p className="detailed-description">
              If you plan to travel to the United States, you may need a U.S. visa. We assist with the application and document submission.
            </p>
          </div>

          {/* Service 6: Passport Renewal */}
          <div className="service-item">
            <h2><strong>Passport Renewal for All Countries</strong><br /></h2>
            <p className="price">
              Ensure timely passport renewal without the hassle.<br />
              Application Fee: $100
            </p>
            <button onClick={() => handleServiceSelection("Passport Renewal")}>
              Select This Service
            </button>
            <p className="detailed-description">
              Passport renewal is essential for maintaining your ability to travel. We assist you with the entire passport renewal process.
            </p>
          </div>
        </div>

        {/* Custom Query Box */}
        <div className="service-item">
          <h2><strong>Any Other Queries?</strong><br /></h2>
          <p className="price">
            Have a unique query? Let us know and we’ll assist you with it.<br />
          </p>
          <textarea
            name="customQuery"
            value={userInfo.customQuery}
            onChange={handleInputChange}
            placeholder="Type your query here..."
            rows={4}
            style={{ width: '100%', padding: '10px', borderRadius: '5px' }}
          />
          <button onClick={() => handleServiceSelection("Other Queries")}>
            Submit Your Query
          </button>
          <p className="detailed-description">
            If you have any other questions or concerns, feel free to ask us. We’re happy to assist with any immigration-related inquiries.
          </p>
        </div>

        {/* User Info Form */}
        <div className="user-info-form" ref={formRef}>
          <h2>Contact Us</h2>
          <p>Fill out your details and reach out to us via WhatsApp for quick assistance.</p>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={userInfo.name}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={userInfo.email}
            onChange={handleInputChange}
          />
          <select name="service" value={userInfo.service} onChange={handleInputChange}>
            <option value="">Select a Service</option>
            <option value="Study Permit Extension">Study Permit Extension</option>
            <option value="Temporary Resident Visa">Temporary Resident Visa</option>
            <option value="PGWP after Two One-Plus-One Year Courses">PGWP after Two One-Plus-One Year Courses</option>
            <option value="Work Permit Application">Work Permit Application</option>
            <option value="U.S. Visa Application">U.S. Visa Application</option>
            <option value="Passport Renewal">Passport Renewal</option>
            <option value="Other Queries">Other Queries</option>
          </select>
          <a href={constructWhatsAppLink()} className="whatsapp-button" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp /> Chat with Us on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default DetailedImmigrationServices;
