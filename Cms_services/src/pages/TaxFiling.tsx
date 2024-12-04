import React, { useState } from 'react';
import '../styles/pages/Taxfiling.css'; // Import the updated CSS for styling the page

const TaxFilingPage: React.FC = () => {
  const whatsappNumber = "16474469738"; // Replace with your WhatsApp number
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    customQuery: "", // For custom queries
  });

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Construct WhatsApp message link, including custom query only if present
  const constructWhatsAppLink = () => {
    let message = `Name: ${userInfo.name}%0AEmail: ${userInfo.email}`;

    // Append custom query only if the user entered one
    if (userInfo.customQuery) {
      message += `%0AQuery: ${userInfo.customQuery}`;
    }

    return `https://wa.me/${whatsappNumber}?text=${message}`;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappLink = constructWhatsAppLink();
    // Open WhatsApp chat with pre-filled message
    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="tax-filing-page">
      <div className="content-wrapper">
        {/* Page Header */}
        <header className="page-header">
          <h1><strong><span className="heading">Tax Preparation Services</span></strong></h1>
          <p>Your trusted partner for filing taxes efficiently and accurately.</p>
        </header>

        {/* Navigation Links for Scrolling */}
        <nav className="nav-links">
          <ul>
            <li><a href="#pricing">Pricing & Newcomer Benefits</a></li>
            <li><a href="#saving-methods">Saving & Investment Methods</a></li>
            <li><a href="#why-choose-us">Why Choose Us?</a></li>
            <li><a href="#contact">Ready to File?</a></li>
          </ul>
        </nav>

        {/* Pricing and Newcomer Benefits Section */}
        <section className="pricing-newcomer-benefits" id="pricing">
          <div className="section-header">
            <h2>Pricing & Newcomer Benefits</h2>
          </div>
          <div className="box-container">
            <div className="pricing-box">
              <p><span className="price">Individual Tax Filing: $30</span></p>
              <p><em>*Exclusive offers for newcomers to maximize your first-year benefits.</em></p>
            </div>
            <div className="benefits-box">
              <p>If you're a newcomer to Canada, you are entitled to several benefits designed to support your transition. These include:</p>
              <ul>
                <li><strong>Welcome to Canada Bonus:</strong> Up to $1,500, a one-time benefit for newcomers to help with your initial settlement in Canada.</li>
                <li><strong>GST/HST Benefits:</strong> A tax-free quarterly payment to help with the cost of living (approx. $200 to $600 annually, depending on household income and province).</li>
                <li><strong>Canada Carbon Rebate:</strong> A rebate that helps offset the carbon pollution pricing applied to fuels in Canada (approx. $100 to $300 annually, depending on your fuel consumption).</li>
                <li><strong>Ontario Trillium Benefit (OTB):</strong> A combined benefit that includes Ontario Energy and Property Tax Credit, Ontario Sales Tax Credit, and Northern Ontario Energy Credit. This can total up to $1,000 for families and $400 for individuals.</li>
                <li><strong>Canada Child Benefits (CCB):</strong> Monthly payments to eligible families to help with the cost of raising children. The CCB can range from $300 to $1,000 per month depending on income and number of children.</li>
                <li><strong>Canada Workers Benefit (CWB):</strong> A refundable tax credit to help low-income workers. The amount varies based on income but can range from $1,000 to $2,000 per year for eligible individuals or families.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Saving and Investment Methods Section */}
        <section className="saving-methods" id="saving-methods">
          <div className="section-header">
            <h2>Tax-Free Savings and Investment Options</h2>
          </div>
          <div className="box-container">
            <div className="investment-box">
              <p>Maximize your savings and investments through tax-efficient methods, including:</p>
              <ul>
                <li><strong>Tax-Free Savings Account (TFSA):</strong> A flexible savings account where you pay no tax on investment income, including interest, dividends, and capital gains. Annual contribution limit: $6,500 (2024).</li>
                <li><strong>Registered Education Savings Plan (RESP):</strong> A savings account for education expenses. Contributions are not tax-deductible, but the government matches contributions up to 20% for eligible beneficiaries, with a maximum of $500 annually.</li>
                <li><strong>First Home Savings Account (FHSA):</strong> A new account designed for first-time homebuyers. You can contribute up to $8,000 per year, with a lifetime limit of $40,000, and benefit from tax-free growth and withdrawals for your first home purchase.</li>
                <li><strong>RRSP (Registered Retirement Savings Plan):</strong> A retirement savings plan where contributions are tax-deductible, and investment income is tax-deferred until withdrawal. Annual contribution limit is 18% of your previous year's income up to a maximum of $30,780 (2024).</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="why-choose-us" id="why-choose-us">
          <div className="section-header">
            <h2>Why Choose Us?</h2>
          </div>
          <div className="grid-layout">
            <ul>
              <li>Expert guidance on personal and family tax returns</li>
              <li>Maximize your student tuition tax credits</li>
              <li>Claim all eligible newcomer benefits</li>
              <li>Receive the Canada Carbon Rebate and provincial benefits</li>
              <li>Get the Welcome to Canada Bonus (up to $1,500) as a first-time filer</li>
              <li>Maximize your savings through TFSA, RESP, FHSA, and RRSP</li>
            </ul>
          </div>
        </section>

       
        {/* User Info Form */}
        <form className="user-info-form" id="contact" onSubmit={handleSubmit}>
          <h2>Ready to File</h2>
          <p>Fill out your details and reach out to us via WhatsApp for quick assistance.</p>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={userInfo.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={userInfo.email}
            onChange={handleInputChange}
            required
          />
          {/* Custom Query Box */}
          <textarea
            name="customQuery"
            value={userInfo.customQuery}
            onChange={handleInputChange}
            placeholder="[First-time Filers/Previously filed]"
            rows={4}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default TaxFilingPage;
