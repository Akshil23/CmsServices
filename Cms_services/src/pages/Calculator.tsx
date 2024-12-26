import React, { useState } from "react";
import "../styles/pages/Calculator.css";

const Calculator: React.FC = () => {
  const [formData, setFormData] = useState({
    entryDate: "",
    maritalStatus: "",
    province: "",
    annualIncome: "", // For GST/HST credit and OTB calculation
    isRural: false, // For rural supplement
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

  // Calculate Newcomer Bonus
  const calculateNewcomerBonus = (entryDate: string): number => {
    const entryMonth = new Date(entryDate).getMonth() + 1; // Months are 0-based

    if (entryMonth >= 10 && entryMonth <= 12) return 490; // Oct-Dec
    if (entryMonth >= 7 && entryMonth < 10) return 835; // Jul-Sep
    if (entryMonth >= 4 && entryMonth < 7) return 1120; // Apr-Jun
    if (entryMonth >= 1 && entryMonth < 4) return 1441.25; // Jan-Mar

    return 0;
  };

  // Calculate CCR Estimate
  const calculateCCREstimate = (province: string, isRural: boolean): number => {
    const ccrAmounts: { [key: string]: { [key: number]: number } } = {
      Ontario: { 2024: 140, 2025: 161 },
      Alberta: { 2024: 225, 2025: 258 },
    };

    const ruralSupplement = isRural ? 0.2 : 0; // 20% rural supplement

    const jan2025 = ccrAmounts[province]?.[2024] || 0;
    const apr2025 = ccrAmounts[province]?.[2024] || 0;
    const jul2025 = (ccrAmounts[province]?.[2025] || 0) * (1 + ruralSupplement);
    const oct2025 = (ccrAmounts[province]?.[2025] || 0) * (1 + ruralSupplement);
    const jan2026 = (ccrAmounts[province]?.[2025] || 0) * (1 + ruralSupplement);
    const apr2026 = (ccrAmounts[province]?.[2025] || 0) * (1 + ruralSupplement);

    return jan2025 + apr2025 + jul2025 + oct2025 + jan2026 + apr2026;
  };

  // Calculate GST/HST Credit Estimate
  const calculateGSTHSTEstimate = (): number => {
    return 358; // Fixed estimate for the given scenario
  };

  // Calculate OTB (OEPTC and OSTC) Estimate
  const calculateOTBEstimate = (): { oeptc: number; ostc: number } => {
    return { oeptc: 133, ostc: 368 };
  };

  const calculateBenefits = () => {
    const { entryDate, province, maritalStatus, isRural } = formData;

    if (!entryDate || !province || !maritalStatus) {
      setCalculatedBenefits("Please fill out all fields to calculate your benefits.");
      return;
    }

    const entryYear = new Date(entryDate).getFullYear();

    if (!["Ontario", "Alberta"].includes(province)) {
      setCalculatedBenefits(
        `This calculator is currently only available for specific provinces. Please contact us for more information.`
      );
      return;
    }

    if (entryYear === 2023) {
      const hasFiledTaxes = window.confirm(
        "Have you previously filed taxes in Canada?\nSelect 'Ok' if 'Yes' or 'Cancel' if 'No'."
      );

      if (hasFiledTaxes) {
        setCalculatedBenefits(
          `To get more details about your benefits, please contact us on WhatsApp for personalized assistance: 
          <a href='https://api.whatsapp.com/message/HOXWXFRQRQYCB1?autoload=1&app_absent=0' target='_blank'> Click here to chat with us</a>`
        );
        return;
      } else {
        setCalculatedBenefits(
          `Congratulations! You are eligible to claim benefits for both 2023 and 2024. You may be entitled to a refund of more than $3,500! 
          Contact us for a detailed breakdown and personalized assistance: 
          <a href='https://api.whatsapp.com/message/HOXWXFRQRQYCB1?autoload=1&app_absent=0' target='_blank'> Click here to chat with us</a>`
        );
        return;
      }
    }

    // Calculate all benefits
    const newcomerBonus = calculateNewcomerBonus(entryDate);
    const ccrEstimate = calculateCCREstimate(province, isRural);
    const gstHstEstimate = calculateGSTHSTEstimate();
    const { oeptc, ostc } = calculateOTBEstimate();

    // Total Benefits
    const totalBenefits = newcomerBonus + ccrEstimate + gstHstEstimate + oeptc + ostc;

    const benefits = `
      <p><strong>Newcomer Bonus:</strong> $${newcomerBonus.toFixed(2)}</p>
      <p><strong>Canada Carbon Rebate (CCR) Estimate:</strong> $${ccrEstimate.toFixed(2)}</p>
      <p><strong>GST/HST Credit Estimate:</strong> $${gstHstEstimate.toFixed(2)}</p>
      <p><strong>Ontario Energy and Property Tax Credit (OEPTC):</strong> $${oeptc.toFixed(2)}</p>
      <p><strong>Ontario Sales Tax Credit (OSTC):</strong> $${ostc.toFixed(2)}</p>
      <p><strong>Total Benefits:</strong> $${totalBenefits.toFixed(2)}</p>
    `;
    setCalculatedBenefits(benefits);
  };

  return (
    <div className="calculator">
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
      <div className="form-group">
        <label htmlFor="isRural">Do you live in a rural area?</label>
        <input
          type="checkbox"
          id="isRural"
          name="isRural"
          checked={formData.isRural}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={calculateBenefits}>Calculate Benefits</button>
      {calculatedBenefits && <div className="result" dangerouslySetInnerHTML={{ __html: calculatedBenefits }}></div>}
    </div>
  );
};

export default Calculator;
