import React, { useState } from "react";
import "../styles/pages/Calculator.css";
// Adjust this path to your actual logo location
import Logo from "../../public/logo.jpg"; 

const Calculator: React.FC = () => {
  const [formData, setFormData] = useState({
    isNewcomer: true,
    entryDate: "",
    maritalStatus: "",
    province: "",
    annualIncome: "",
    movingExpenses: "",
    isRural: false,
  });

  const [results, setResults] = useState<any>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const calculateBenefits = () => {
    const { entryDate, province, maritalStatus, annualIncome, movingExpenses, isNewcomer } = formData;
    const incomeNum = parseFloat(annualIncome) || 0;
    const movingNum = parseFloat(movingExpenses) || 0;

    if ((isNewcomer && !entryDate) || !province || !maritalStatus) {
      alert("Please fill out all fields.");
      return;
    }

    // 1. Newcomer Arrival Bonus (RC151)
    const bonuses: any = {
      Ontario: { "1-4": 876, "5-8": 575, "9-12": 362.5 },
      Saskatchewan: { "1-4": 980, "5-8": 577, "9-12": 385 },
      "New Brunswick": { "1-4": 745, "5-8": 480, "9-12": 325 },
      "Nova Scotia": { "1-4": 708, "5-8": 450, "9-12": 297.5 },
      Alberta: { "1-4": 605, "5-8": 262.5, "9-12": 175 },
      Manitoba: { "1-4": 521, "5-8": 262.5, "9-12": 175 },
      "British Columbia": { "1-4": 483, "5-8": 262.5, "9-12": 175 },
    };
    let nBonus = 0;
    if (isNewcomer && bonuses[province]) {
      const month = new Date(entryDate).getMonth() + 1;
      const key = month <= 4 ? "1-4" : month <= 8 ? "5-8" : "9-12";
      nBonus = bonuses[province][key];
    }

    // 2. 2026 GST/CGEB Logic ($950 Peak)
    let annualBase = 543; 
    if (incomeNum > 11000) annualBase += Math.min(183, (incomeNum - 11000) * 0.02);
    let federalTotal = annualBase * 1.75; 
    if (incomeNum > 46432) federalTotal = Math.max(0, federalTotal - (incomeNum - 46432) * 0.075);
    federalTotal = Math.min(950, federalTotal);

    // 3. Canada Workers Benefit (CWB)
    let cwb = 0;
    if (!isNewcomer && incomeNum >= 3000 && incomeNum <= 37742) {
      const maxCWB = 1633;
      if (incomeNum <= 26855) cwb = Math.min(maxCWB, (incomeNum - 3000) * 0.27);
      else cwb = Math.max(0, maxCWB - (incomeNum - 26855) * (maxCWB / (37742 - 26855)));
    }

    // 4. Provincial Credits
    let provName = ""; let provAmt = 0; let oeptcRange = ""; 
    if (province === "Ontario") {
      provName = "Ontario Sales Tax Credit";
      provAmt = Math.max(0, 378 - (incomeNum > 29047 ? (incomeNum - 29047) * 0.04 : 0));
      oeptcRange = "$180.00 – $450.00";
    } else if (province === "Saskatchewan") {
      provName = "Saskatchewan Low-Income Credit";
      provAmt = Math.max(0, 429 - (incomeNum > 38588 ? (incomeNum - 38588) * 0.05 : 0));
    } else if (province === "Nova Scotia") {
      provName = "NS Affordable Living Credit";
      provAmt = Math.max(0, 255 - (incomeNum > 30000 ? (incomeNum - 30000) * 0.05 : 0));
    } else if (province === "New Brunswick") {
      provName = "NB HST Credit";
      provAmt = Math.max(0, 300 - (incomeNum > 35000 ? (incomeNum - 35000) * 0.02 : 0));
    }

    const totalLow = nBonus + federalTotal + cwb + provAmt + (province === "Ontario" ? 180 : 0);
    const totalHigh = nBonus + federalTotal + cwb + provAmt + (province === "Ontario" ? 450 : 0);

    const waMsg = encodeURIComponent(
        `Hi CMS Services! I used your 2026 Benefits Calculator for ${province}. My estimated total is $${totalLow.toFixed(0)}${province === "Ontario" ? ` - $${totalHigh.toFixed(0)}` : ""}. I'd like to proceed with your $26.55 tax filing service.`
    );

    setResults({
      totalLow, totalHigh, nBonus, federalTotal, cwb, provName, provAmt, oeptcRange, movingNum, province, waMsg
    });
  };

  return (
    <div className="calculator">
      <div className="calculator-header">
        <img src={Logo} alt="CMS Services" className="header-logo" />
        <p className="tagline">YOUR ULTIMATE SOLUTION HUB</p>
      </div>

      <h1>Newcomer Benefits Estimator (2026)</h1>

      <div className="form-group checkbox-group">
        <label>Newcomer to Canada (Arrived 2025)?</label>
        <input type="checkbox" name="isNewcomer" checked={formData.isNewcomer} onChange={handleInputChange} />
      </div>

      {formData.isNewcomer && (
        <div className="form-group">
          <label>Date of Entry:</label>
          <input type="date" name="entryDate" value={formData.entryDate} onChange={handleInputChange} />
        </div>
      )}

      <div className="form-group">
        <label>Province of Stay:</label>
        <select name="province" value={formData.province} onChange={handleInputChange}>
          <option value="">Select Province</option>
          <option value="Ontario">Ontario</option>
          <option value="Alberta">Alberta</option>
          <option value="British Columbia">British Columbia</option>
          <option value="Saskatchewan">Saskatchewan</option>
          <option value="Nova Scotia">Nova Scotia</option>
          <option value="New Brunswick">New Brunswick</option>
          <option value="Manitoba">Manitoba</option>
        </select>
      </div>

      <div className="form-group">
        <label>Estimated Annual Income (CAD):</label>
        <input type="number" name="annualIncome" placeholder="e.g. 22000" value={formData.annualIncome} onChange={handleInputChange} />
      </div>

      <div className="form-group">
        <label>Moving Expenses (CAD):</label>
        <input type="number" name="movingExpenses" placeholder="0" value={formData.movingExpenses} onChange={handleInputChange} />
      </div>

      <div className="form-group">
        <label>Marital Status:</label>
        <select name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange}>
          <option value="">Select Status</option>
          <option value="single">Single</option>
          <option value="married">Married</option>
        </select>
      </div>

      <button onClick={calculateBenefits} className="calc-btn">Get My Full Estimate</button>

      {results && (
        <div className="result animate-fade">
          <div className="result-header">
            <span className="success-badge">✅ Calculation Complete</span>
            <p style={{ fontSize: "1.6rem", margin: "10px 0", color: "#1a202c" }}>
              <strong>
                Estimated Total: {results.province === "Ontario" 
                  ? `$${results.totalLow.toFixed(2)} – $${results.totalHigh.toFixed(2)}` 
                  : `$${results.totalLow.toFixed(2)}`}
              </strong>
            </p>
          </div>
          
          <hr style={{ border: "0", borderTop: "1px solid #edf2f7", margin: "20px 0" }} />
          
          <div className="benefit-numbers">
            {results.nBonus > 0 && <p><span>Newcomer Arrival Bonus:</span> <span>${results.nBonus.toFixed(2)}</span></p>}
            <p><span>GST/HST & Groceries Benefit:</span> <span>${results.federalTotal.toFixed(2)}</span></p>
            {results.cwb > 0 && (
              <div className="cwb-row">
                <p><span>Canada Workers Benefit (CWB):</span> <span>${results.cwb.toFixed(2)}</span></p>
                <p className="eligibility-note">*Note: Eligible if you are 19+ and not a full-time student (&gt;13 weeks).</p>
              </div>
            )}
            {results.provAmt > 0 && <p><span>{results.provName}:</span> <span>${results.provAmt.toFixed(2)}</span></p>}
            {results.oeptcRange && <p><span>Ontario OEPTC (Energy/Rent):</span> <span>{results.oeptcRange}</span></p>}
          </div>

          <div className="tip-box">
             <strong>💡 Bonus Tip:</strong> Tuition fees or rent receipts can be used as "Tax Deductions" to lower your net income, which can increase your quarterly payments significantly!
          </div>

          <div className="curiosity-box">
            <h4>🛡️ CRA Compliance & Optimization</h4>
            <p style={{ fontSize: "0.9rem", lineHeight: "1.5" }}>
              With a potential refund of over <strong>${results.totalLow.toFixed(0)}</strong>, ensuring your moving expenses and arrival dates are filed exactly according to CRA guidelines is critical. Let our experts optimize your 2025 return.
            </p>
          </div>

          <div className="sales-cta">
            <div className="pricing-badge">Expert Newcomer Filing: <strong>$26.55</strong></div>
            <a href={`https://wa.me/7533816665?text=${results.waMsg}`} className="wa-button-sales" target="_blank" rel="noreferrer">
              File my Taxes with CMS Services
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculator;