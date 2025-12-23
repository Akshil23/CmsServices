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
    <section className="detailed-immigration-services" data-dao="fade-up">
      <div className="container" data-dao="fade-up">
        <h1 className="page-title" data-aos="fade-up">Immigration Services - Detailed Information</h1>
        <p className="description" data-aos="fade-up">
          Explore our wide range of immigration services tailored to meet your needs.
        </p>

        <div className="services-list" data-aos="fade-up">
          {/* Service 1: Study Permit Extension */}
          <div className="service-item">
            <h2><strong>Study Permit Extension</strong><br /></h2>
            <p className="price">
              Extend your study permit seamlessly and avoid interruptions to your studies.<br />
              Application Fees: $40
            </p>
            <button onClick={() => handleServiceSelection("Study Permit Extension")}>Select This Service</button>
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
            <button onClick={() => handleServiceSelection("Temporary Resident Visa")}>Select This Service</button>
            <p className="detailed-description">
              A Temporary Resident Visa (TRV) allows foreign nationals to stay in Canada for a short duration, whether for tourism, business, or family visits.
            </p>
          </div>

          {/* Service 3: Work Permit Application */}
          <div className="service-item">
            <h2><strong>Work Permit Application</strong><br /></h2>
            <p className="price">
              Get assistance with the correct work permit application for your professional needs.<br />
              Application Fee: $40
            </p>
            <button onClick={() => handleServiceSelection("Work Permit Application")}>Select This Service</button>
            <p className="detailed-description">
              A work permit is required for foreign nationals who wish to work in Canada. We assist you in choosing the correct work permit based on your job offer and skills.
            </p>
          </div>

          {/* Service 4: U.S. Visa Application */}
          <div className="service-item">
            <h2><strong>U.S. Visa Application</strong><br /></h2>
            <p className="price">
              Guidance on obtaining the appropriate U.S. visa, including B1/B2 visas for travel.<br />
              Application Fee: $40
            </p>
            <button onClick={() => handleServiceSelection("U.S. Visa Application")}>Select This Service</button>
            <p className="detailed-description">
              If you plan to travel to the United States, you may need a U.S. visa. We assist with the application and document submission.
            </p>
          </div>

          {/* Service 5: Passport Renewal */}
          <div className="service-item">
            <h2><strong>Passport Renewal for All Countries</strong><br /></h2>
            <p className="price">
              Ensure timely passport renewal without the hassle.<br />
              Application Fee: $100
            </p>
            <button onClick={() => handleServiceSelection("Passport Renewal")}>Select This Service</button>
            <p className="detailed-description">
              Passport renewal is essential for maintaining your ability to travel. We assist you with the entire passport renewal process.
            </p>
          </div>

  

          {/* Service 7: Application for Baby Passport */}
          <div className="service-item">
            <h2><strong>Application for Baby Passport</strong><br /></h2>
            <p className="price">
              Get help applying for a new passport for your baby.<br />
              Application Fee: $30
            </p>
            <button onClick={() => handleServiceSelection("Application for Baby Passport")}>Select This Service</button>
            <p className="detailed-description">
              We assist in the application process for obtaining a passport for your newborn baby, ensuring all documentation is correct and submitted on time.
            </p>
          </div>

          {/* Service 8: PR Card Application */}
          <div className="service-item">
            <h2><strong>PR Card Application</strong><br /></h2>
            <p className="price">
              Assistance with applying for or renewing your Permanent Resident (PR) card.<br />
              Application Fee: $30
            </p>
            <button onClick={() => handleServiceSelection("PR Card Application")}>Select This Service</button>
            <p className="detailed-description">
              We help you apply for or renew your PR card, ensuring a smooth process and timely submission of all necessary documents.
            </p>
          </div>

          {/* Service 9: Post-Graduation Work Permit (PGWP) for Two One-Year Courses */}
          <div className="service-item">
            <h2><strong>PGWP for Two One-Year Courses</strong><br /></h2>
            <p className="price">
              Assistance in obtaining a Post-Graduation Work Permit for students who completed two one-year programs.<br />
              Application Fee: $40
            </p>
            <button onClick={() => handleServiceSelection("PGWP for Two One-Year Courses")}>Select This Service</button>
            <p className="detailed-description">
              Students completing two one-year academic programs in Canada may qualify for a three-year PGWP. We assist with eligibility and the application process.
            </p>
          </div>

          {/* Service 10: Custom Immigration Service */}
          <div className="service-item">
            <h2><strong>Custom Immigration Service</strong><br /></h2>
            <p className="price">
              Tailored solutions for unique immigration needs.<br />
              Starting at: $50
            </p>
            <button onClick={() => handleServiceSelection("Custom Immigration Service")}>Select This Service</button>
            <p className="detailed-description">
              Do you have specific immigration requirements not covered by standard services? We offer personalized assistance to address your unique situation, ensuring your needs are met efficiently.
            </p>
          </div>
        </div>

 {/* Service 6: SIN Number Application */}
 <div className="service-item">
            <h2><strong>SIN Number Application</strong><br /></h2>
            <p className="price">
              Assistance with applying for your Social Insurance Number (SIN).<br />
              Application Fee: $20
            </p>
            <button onClick={() => handleServiceSelection("SIN Number Application")}>Select This Service</button>
            <p className="detailed-description">
              A Social Insurance Number (SIN) is essential for working in Canada and accessing government services. We provide guidance and support to ensure your application process is smooth and successful.
            </p>
          </div>
        {/* User Info Form */}
        <div className="user-info-form" data-aos="zoom-in" ref={formRef}>
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
            <option value="Work Permit Application">Work Permit Application</option>
            <option value="U.S. Visa Application">U.S. Visa Application</option>
            <option value="Passport Renewal">Passport Renewal</option>
            <option value="SIN Number Application">SIN Number Application</option>
            <option value="Application for Baby Passport">Application for Baby Passport</option>
            <option value="PR Card Application">PR Card Application</option>
            <option value="PGWP for Two One-Year Courses">PGWP for Two One-Year Courses</option>
            <option value="Custom Immigration Service">Custom Immigration Service</option>
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
