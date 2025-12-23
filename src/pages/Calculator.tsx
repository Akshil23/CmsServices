import React, { useState } from "react";
import "../styles/pages/Calculator.css";

const Calculator: React.FC = () => {
  const [formData, setFormData] = useState({
    entryDate: "",
    maritalStatus: "",
    province: "",
    annualIncome: "",
    isRural: false,
  });

  const [calculatedBenefits, setCalculatedBenefits] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const calculateNewcomerBonus = (entryDate: string, province: string): number => {
    if (!entryDate || isNaN(new Date(entryDate).getTime())) {
      return 0;
    }

    const entryMonth = new Date(entryDate).getMonth() + 1;

    const newcomerBonuses: { [province: string]: { [monthRange: string]: number } } = {
      Ontario: { "1-4": 1120, "5-8": 835, "9-12": 490 },
      Saskatchewan: { "1-4": 1323.4, "5-8": 945.55, "9-12": 567.7 },
      "New Brunswick": { "1-4": 925, "5-8": 670, "9-12": 415 },
      "Nova Scotia": { "1-4": 904, "5-8": 652.25, "9-12": 400.5 },
      "British Columbia": { "1-4": 718, "5-8": 507, "9-12": 296 },
      Quebec: { "1-4": 340, "5-8": 255, "9-12": 170 },
      Alberta: { "1-4": 1015, "5-8": 705, "9-12": 395 },
      Manitoba: { "1-4": 790, "5-8": 555, "9-12": 320 },
    };

    const getBonus = (month: number, bonusData: { [monthRange: string]: number }): number => {
      if (month >= 1 && month <= 4) return bonusData["1-4"];
      if (month >= 5 && month <= 8) return bonusData["5-8"];
      if (month >= 9 && month <= 12) return bonusData["9-12"];
      return 0;
    };

    return province in newcomerBonuses ? getBonus(entryMonth, newcomerBonuses[province]) : 0;
  };

  const calculateCCREstimate = (province: string, isRural: boolean): number => {
    const ccrAmounts: { [key: string]: { [key: number]: number } } = {
      Ontario: { 2024: 140, 2025: 140 },
      Alberta: { 2024: 225, 2025: 258 },
      Manitoba: { 2024: 150, 2025: 175 },
      "British Columbia": { 2024: 140, 2025: 145 },
      Quebec: { 2024: 0, 2025: 0 },
      "New Brunswick": { 2024: 95, 2025: 110 },
      "Nova Scotia": { 2024: 103, 2025: 120 },
      Saskatchewan: { 2024: 188, 2025: 190 },
    };

    const ruralSupplement = isRural ? 0.2 : 0;

    const jul2025 = (ccrAmounts[province]?.[2025] || 0) * (1 + ruralSupplement);
    const oct2025 = (ccrAmounts[province]?.[2025] || 0) * (1 + ruralSupplement);
    const jan2026 = (ccrAmounts[province]?.[2025] || 0) * (1 + ruralSupplement);
    const apr2026 = (ccrAmounts[province]?.[2025] || 0) * (1 + ruralSupplement);

    return jul2025 + oct2025 + jan2026 + apr2026;
  };

  const calculateProvincialBenefits = (province: string): { ostc: number; oeptcRange: [number, number] } | null => {
    if (province === "Ontario") {
      return { ostc: 370, oeptcRange: [140, 550] };
    }
    return null;
  };

  const calculateGSTHSTEstimate = (): number => {
    return 350;
  };

  const calculateBenefits = () => {
    const { entryDate, province, maritalStatus, isRural } = formData;

    if (!entryDate || !province || !maritalStatus) {
      setCalculatedBenefits("Please fill out all fields to calculate your benefits.");
      return;
    }

    if (maritalStatus === "married") {
      setCalculatedBenefits(
        `To get an accurate calculation of your benefits, please contact us on WhatsApp for personalized assistance: 
        <a href='https://api.whatsapp.com/message/HOXWXFRQRQYCB1?autoload=1&app_absent=0' target='_blank'> Click here to chat with us</a>`
      );
      return;
    }

    const entryYear = new Date(formData.entryDate).getFullYear();
if (entryYear !== 2024) {
  setCalculatedBenefits(
    `If your year of entry to canada is other than 2024, please contact us on WhatsApp for assistance: 
    <a href='https://api.whatsapp.com/message/HOXWXFRQRQYCB1?autoload=1&app_absent=0' target='_blank'> Click here to chat with us</a>`
  );
  return;
}

    

    const newcomerBonus = calculateNewcomerBonus(entryDate, province);
    const ccrEstimate = calculateCCREstimate(province, isRural);
    const gstHstEstimate = calculateGSTHSTEstimate();
    const provincialBenefits = calculateProvincialBenefits(province);

    const ostc = provincialBenefits?.ostc || 0;
    const oeptcLow = provincialBenefits?.oeptcRange[0] || 0;
    const oeptcHigh = provincialBenefits?.oeptcRange[1] || 0;

    const totalBenefitsLow = newcomerBonus + ccrEstimate + gstHstEstimate + ostc + (province === "Ontario" ? oeptcLow : 0);
    const totalBenefitsHigh = newcomerBonus + ccrEstimate + gstHstEstimate + ostc + (province === "Ontario" ? oeptcHigh : 0);

    const benefits = `
      <p><strong>Total Benefits:</strong> ${
        province === "Ontario"
          ? `$${totalBenefitsLow.toFixed(2)} - $${totalBenefitsHigh.toFixed(2)}`
          : `$${totalBenefitsLow.toFixed(2)}`
      }</p>
      ${
        province === "Ontario"
          ? `<p>This range is due to the variable amount of the Ontario Energy and Property Tax Credit (OEPTC), which depends on your rent, energy costs, and income.</p>`
          : ""
      }
      <p><strong>Newcomer Bonus:</strong> $${newcomerBonus.toFixed(2)}</p>
      <p><strong>Canada Carbon Rebate (CCR):</strong> $${ccrEstimate.toFixed(2)}</p>
      <p><strong>GST/HST Credit Estimate:</strong> $${gstHstEstimate.toFixed(2)}</p>
      ${province === "Ontario" ? `<p><strong>OSTC:</strong> $${ostc}</p>` : ""}
    `;

    setCalculatedBenefits(benefits);
  };

  return (
    <div className="calculator" data-aos="zoom-in">
      <h1>Calculate Your Newcomer Benefits</h1>
      <div className="form-group">
        <label htmlFor="entryDate">Date of Entry to Canada:</label>
        <input
          type="date"
          id="entryDate"
          name="entryDate"
          value={formData.entryDate}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="province">Province of Stay:</label>
        <select
          id="province"
          name="province"
          value={formData.province}
          onChange={handleInputChange}
        >
          <option value="">Select</option>
          <option value="Ontario">Ontario</option>
          <option value="Alberta">Alberta</option>
          <option value="British Columbia">British Columbia</option>
          <option value="Saskatchewan">Saskatchewan</option>
          <option value="Nova Scotia">Nova Scotia</option>
          <option value="Quebec">Quebec</option>
          <option value="New Brunswick">New Brunswick</option>
          <option value="Manitoba">Manitoba</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="maritalStatus">Marital Status:</label>
        <select
          id="maritalStatus"
          name="maritalStatus"
          value={formData.maritalStatus}
          onChange={handleInputChange}
        >
          <option value="">Select</option>
          <option value="single">Single</option>
          <option value="married">Married</option>
        </select>
      </div>
      {["Ontario", "Alberta", "Saskatchewan", "Manitoba", "New Brunswick", "Nova Scotia"].includes(formData.province) && (
        <div className="form-group">
          <label htmlFor="isRural">Do you live in a rural area?</label>
          <input
            type="checkbox"
            id="isRural"
            name="isRural"
            checked={formData.isRural}
            onChange={handleInputChange}
          />
          <p>
            To check if your location qualifies for the rural supplement,{" "}
            <a
              href="https://www.canada.ca/en/revenue-agency/services/child-family-benefits/canada-carbon-rebate/qualify-for-the-supplement.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              click here
            </a>.
          </p>
        </div>
      )}
      <button onClick={calculateBenefits}>Calculate Benefits</button>
      {calculatedBenefits && <div className="result" dangerouslySetInnerHTML={{ __html: calculatedBenefits }}></div>}
    </div>
  );
};

export default Calculator;
