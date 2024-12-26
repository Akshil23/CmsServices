import React, { useState } from 'react';
import '../styles/pages/TaxFiling.css';

const TaxFilingPage: React.FC = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    customQuery: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceSelect = (service: string) => {
    setUserInfo((prev) => ({
      ...prev,
      customQuery: `I am interested in the ${service} service.`,
    }));
    document.getElementById('ready-to-file')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappNumber = '16474469738';
    const message = `Name: ${userInfo.name}%0AEmail: ${userInfo.email}${
      userInfo.customQuery ? `%0AQuery: ${userInfo.customQuery}` : ''
    }`;
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappLink, '_blank');
  };

  const handleNavigateToBenefits = () => {
    window.location.href = '/newcomer-benefits'; // Replace with the actual route for the Newcomer Benefits page
  };

  return (
    <div className="detailed-immigration-services">
      <div className="container">
        {/* Page Title */}
        <h1 className="page-title">Tax Filing Services</h1>
        <p className="description">
          We provide efficient and professional tax filing services tailored to meet your needs. Whether you are an
          individual, family, or self-employed, we are here to help you save time and maximize your benefits.
        </p>

        {/* Informative Sections */}
        <div className="info-sections">
          <div className="info-item">
            <h2>Newcomer Benefits</h2>
            <ul>
              <li><strong>Canada Child Benefit (CCB):</strong> Monthly tax-free payments for families raising children under 18, tailored to income level and family size to provide significant support for childcare and basic needs.</li>
              <li><strong>GST/HST Credit:</strong> Quarterly payments to assist low-income families with living expenses, designed to offset the costs of goods and services taxes and provide essential financial relief.</li>
              <li><strong>Canada Workers Benefit (CWB):</strong> Refundable tax credit for low-income workers, offering direct financial assistance to encourage workforce participation and improve living standards.</li>
              <li><strong>Ontario Trillium Benefit (OTB):</strong> A combination of credits for energy costs, property taxes, and sales taxes, providing targeted financial relief for residents in Ontario.</li>
              <li><strong>BC Family Benefit:</strong> Monthly support for low-income families in British Columbia, ensuring that children have access to necessities and opportunities for growth.</li>
              <li><strong>Alberta Child and Family Benefit (ACFB):</strong> Financial assistance for families with children in Alberta, combining base and working income benefits to maximize support for low- and moderate-income earners.</li>
              <li><strong>Manitoba Child Benefit:</strong> Support for low-income families with children in Manitoba, aimed at reducing child poverty and improving access to essential resources.</li>
              <li><strong>Quebec Family Allowance:</strong> Monthly financial aid for families with dependent children in Quebec, structured to provide consistent support throughout the year.</li>
              <li><strong>Saskatchewan Low-Income Tax Credit (SLITC):</strong> Additional financial support for families in Saskatchewan, helping to alleviate tax burdens and support family well-being.</li>
              <li><strong>Newfoundland and Labrador Child Benefit:</strong> Tax-free assistance for families with children under 18, designed to reduce financial barriers and promote healthy development.</li>
              <li><strong>Nova Scotia Child Benefit:</strong> Payments to help with the cost of raising children in Nova Scotia, tailored to provide meaningful support for families in need.</li>
              <li><strong>Settlement Programs for Newcomers:</strong> Comprehensive programs offering language training, career counseling, and community integration services, ensuring a smooth transition for newcomers to Canada.</li>
              <li><strong>Housing Support:</strong> Access to affordable housing initiatives and rental assistance programs, helping newcomers and low-income families secure stable living arrangements.</li>
            </ul>
          </div>
           {/* Newcomer Benefits Button */}
        
          <div className="info-item">
            <h2>Tax-Free Savings and Investment Options</h2>
            <ul>
              <li><strong>Tax-Free Savings Account (TFSA):</strong> Save and invest with tax-free growth on contributions and earnings. TFSAs allow flexibility to withdraw funds anytime without penalties, making them ideal for both short-term and long-term goals such as vacations, emergencies, or retirement planning.</li>
              <li><strong>Registered Education Savings Plan (RESP):</strong> An education savings plan that includes government grants of up to 20% on contributions (up to $7,200 in lifetime grants per child). Parents and guardians can save tax-free for a child's post-secondary education, and the plan allows for flexibility in managing educational costs.</li>
              <li><strong>First Home Savings Account (FHSA):</strong> A tax-deductible savings account specifically designed for first-time homebuyers. Contributions are tax-deductible, and withdrawals for qualifying home purchases are tax-free, making it a powerful tool to achieve homeownership faster.</li>
              <li><strong>Registered Retirement Savings Plan (RRSP):</strong> Contributions to an RRSP are tax-deductible, allowing you to reduce your taxable income. Earnings within the RRSP grow tax-deferred until withdrawal during retirement. Additionally, the Home Buyers' Plan (HBP) lets you withdraw funds from your RRSP to purchase your first home without penalty, provided it is repaid within a specified period.</li>
              <li><strong>Tuition Tax Credits:</strong> If you or a dependent are pursuing post-secondary education, you may be eligible for tuition tax credits. These credits can reduce the amount of tax owed or be carried forward to future years. Unused credits can also be transferred to a spouse, parent, or grandparent to maximize tax savings.</li>
              <li><strong>Employer Matching Programs:</strong> Some employers offer retirement savings programs, such as group RRSPs or pension plans, where they match a portion of your contributions. Take full advantage of these programs to maximize your savings.</li>
              <li><strong>Automatic Savings Plans:</strong> Set up automated transfers to savings accounts or investment plans. Automation ensures consistent savings habits and helps build wealth over time without manual effort.</li>
              <li><strong>Low-Interest Savings Accounts:</strong> Consider high-interest savings accounts or GICs (Guaranteed Investment Certificates) to grow your money securely while maintaining accessibility.</li>
            </ul>
          </div>
        </div>

        <div className="next-page-button-container">
          <button className="next-page-button" onClick={handleNavigateToBenefits}>
            Apply for Newcomer Benefits
          </button>
        </div>
        {/* Services List */}
        <div className="services-list">
          <div className="service-item">
            <h2>Individual Tax Filing</h2>
            <p>Starting from <span className="price">$30</span></p>
            <button
              className="select-service-button"
              onClick={() => handleServiceSelect('Individual Tax Filing')}
            >
              Select this service
            </button>
          </div>
          <div className="service-item">
            <h2>Family Tax Filing</h2>
            <p>Starting from <span className="price">$70</span></p>
            <button
              className="select-service-button"
              onClick={() => handleServiceSelect('Family Tax Filing')}
            >
              Select this service
            </button>
          </div>
          <div className="service-item">
            <h2>Self-Employed Tax Filing</h2>
            <p>Starting from <span className="price">$40</span></p>
            <button
              className="select-service-button"
              onClick={() => handleServiceSelect('Self-Employed Tax Filing')}
            >
              Select this service
            </button>
          </div>
          <div className="service-item">
            <h2>Group Discounted Tax Filing</h2>
            <p>Starting from <span className="price">$25</span> per person (for groups of 4 or more)</p>
            <button
              className="select-service-button"
              onClick={() => handleServiceSelect('Group Discounted Tax Filing')}
            >
              Select this service
            </button>
          </div>
          <div className="service-item">
            <h2>Corporate Tax Filing</h2>
            <p>Starting from <span className="price">$150</span></p>
            <button
              className="select-service-button"
              onClick={() => handleServiceSelect('Corporate Tax Filing')}
            >
              Select this service
            </button>
          </div>
          <div className="service-item">
            <h2>Non-Profit Tax Filing</h2>
            <p>Starting from <span className="price">$100</span></p>
            <button
              className="select-service-button"
              onClick={() => handleServiceSelect('Non-Profit Tax Filing')}
            >
              Select this service
            </button>
          </div>
        </div>

        {/* Form */}
        <form className="user-info-form" onSubmit={handleSubmit}>
          <h2 id="ready-to-file">Ready To File?</h2>
          <p>Fill out your details and reach out to us via WhatsApp for assistance.</p>
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
          <textarea
            name="customQuery"
            placeholder="Enter your query (optional)"
            value={userInfo.customQuery}
            onChange={handleInputChange}
            rows={4}
          />
          <button type="submit" className="whatsapp-button">
            Submit
          </button>
        </form>

       
      </div>
    </div>
  );
};

export default TaxFilingPage;
