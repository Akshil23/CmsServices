import React from 'react';

import '../styles/pages/Apply-for-benefits.css';

const NewcomerBenefit: React.FC = () => {


  

  return (
    <div className="newcomer-benefit">
      <h1 className="page-title">Apply for Newcomer Benefits</h1>

      {/* Note and Tax Filing Button */}
      <div className="note-container">
        <p className="note-text">
          <strong>Note:</strong> To apply for benefits, you must ensure that you have already filed your taxes.
        </p>
        <button
          className="tax-filing-button"
          onClick={() => window.open('https://wa.me/16474469738', '_blank')}
        >
          Apply for Tax Filing via WhatsApp
        </button>
      </div>

      <div className="content-container">
        {/* Existing Steps to Apply for Benefits */}
        <div className="info-box">
          <h3>Steps to Apply for Benefits</h3>
          <div className="steps-container">
            <div className="step-box">
              <h4>Step 1</h4>
              <p>
                Call <strong>1-800-387-1193</strong> to update your world income details instantly. Provide the following statement:
              </p>
              <blockquote>
                "My world income is $0 for the previous years before I became a resident of Canada. I am calling to update this information for claiming any benefits I am entitled to."
              </blockquote>
            </div>
            <div className="or-divider">OR</div>
            <div className="step-box">
              <h4>Step 2</h4>
              <p>
                Alternatively, download and complete the <a href="https://www.canada.ca/en/revenue-agency/services/forms-publications/forms/rc151.html" target="_blank" rel="noopener noreferrer">RC151 Form</a> (Declaration of Eligibility for Benefits), and mail it to the appropriate tax centre. Use the <a href="https://www.canada.ca/en/revenue-agency/corporate/contact-information/tax-services-offices-tax-centres.html" target="_blank" rel="noopener noreferrer">CRA Tax Centre Addresses</a> to find your mailing address. Note: This process may take up to 90 days.
              </p>
            </div>
          </div>
          
          <div>
        <h4>Audio Guides</h4>
          <ul>
            <li><a href="https://drive.google.com/file/d/1Lle40xPuJQxXLnQsNzu0U3KytVksD9bH/view?usp=drive_link" target="_blank" rel="noopener noreferrer">Newcomers Benefits Guide In English (Audio)</a></li>
            <li>
              <a href="https://drive.google.com/file/d/1ROdp15x3-n25W0T7Y2rqGS38Q5AvcZvl/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
                Newcomers Benefits Guide in Hindi (Audio)
              </a>
            </li>
            <li>
              <a href="https://drive.google.com/file/d/1uB0iFF0WTjtE9QL288duq48bSv9mxFCN/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
                Newcomers Benefits Guide in Gujarati (Audio)
              </a>
            </li>
          </ul>
        </div>
        </div>
     

        {/* Steps to Create a CRA My Account */}
        <div className="info-box">
          <h3>Steps to Create a CRA My Account</h3>
          <div className="steps-container">
            <div className="step-box">
              <h4>Step 1: Visit CRA My Account</h4>
              <p>
                Go to the CRA My Account website by clicking~ 
                <a href="https://www.canada.ca/en/revenue-agency/services/e-services/e-services-individuals/account-individuals.html" target="_blank" rel="noopener noreferrer">
                   here
                </a>.
              </p>
            </div>
            <div className="step-box">
              <h4>Step 2: Register</h4>
              <p>
                Click on the <strong>"Register"</strong> button and start the account creation process.
              </p>
            </div>
            <div className="step-box">
              <h4>Step 3: Verify Your Identity</h4>
              <p>
                Enter your SIN, date of birth, postal code, and information from your most recent tax return to verify your identity.
              </p>
            </div>
            <div className="step-box">
              <h4>Step 4: Set Login Credentials</h4>
              <p>
                Create a secure username and password or use a sign-in partner (e.g., your bank) to access the CRA My Account.
              </p>
            </div>
            <div className="step-box">
              <h4>Step 5: Activate Your Account</h4>
              <p>
                Enter the security code sent to your home address or use Interac verification to activate your account instantly.
              </p>
            </div>
          </div>
        </div>

        {/* Register for CRA Autodeposit */}
        <div className="info-box">
          <h3>Register for CRA Autodeposit</h3>
          <ul>
            <li><a href="https://www.rbc.com/cra/" target="_blank" rel="noopener noreferrer">Register with RBC</a></li>
            <li><a href="https://www.td.com/ca/en/personal-banking/cra/" target="_blank" rel="noopener noreferrer">Register with TD</a></li>
            <li><a href="https://www.scotiabank.com/ca/en/personal/scotia-online.html" target="_blank" rel="noopener noreferrer">Register with Scotiabank</a></li>
            <li><a href="https://www.bmo.com/main/personal/cra-direct-deposit/" target="_blank" rel="noopener noreferrer">Register with BMO</a></li>
            <li><a href="https://www.cibc.com/en/personal-banking/my-cibc/cra-direct-deposit.html" target="_blank" rel="noopener noreferrer">Register with CIBC</a></li>
            <li><a href="https://www.icicibank.ca/personalaccount/cra-direct-deposit.page" target="_blank" rel="noopener noreferrer">Register with ICICI Bank</a></li>
            <li><a href="https://www.wealthsimple.com/en-ca" target="_blank" rel="noopener noreferrer">Register with Wealthsimple</a></li>
            <li><a href="https://www.simplii.com/en/personal-banking/cra-direct-deposit.html" target="_blank" rel="noopener noreferrer">Register with Simplii Financial</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NewcomerBenefit;
