import React, { useState } from "react";
import "../styles/pages/Taxfiling.css"; // Import custom CSS for styling

const ChildFamilyBenefitsCalculator: React.FC = () => {
  const [income, setIncome] = useState<number>(0);
  const [numChildren, setNumChildren] = useState<number>(1);
  const [childAges, setChildAges] = useState<string>("0");
  const [province, setProvince] = useState<string>("Ontario");
  const [calculatedBenefit, setCalculatedBenefit] = useState<number | null>(null);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "income") setIncome(parseInt(value));
    else if (name === "numChildren") setNumChildren(parseInt(value));
    else if (name === "childAges") setChildAges(value);
    else if (name === "province") setProvince(value);
  };

  // Calculate the benefit (simplified version)
  const calculateBenefit = () => {
    // Basic formula for a simplified calculation
    let baseBenefit = 0;
    let childrenAgesArray = childAges.split(",").map((age) => parseInt(age.trim()));

    // Approximate base calculation based on family income and number of children
    if (income <= 30000) {
      baseBenefit = numChildren * 500; // Hypothetical value for low-income families
    } else if (income <= 70000) {
      baseBenefit = numChildren * 300; // Mid-range income families
    } else {
      baseBenefit = numChildren * 100; // Higher income families
    }

    // Adding age-based calculation for each child
    let ageAdjustment = 0;
    childrenAgesArray.forEach((age) => {
      if (age < 6) ageAdjustment += 100; // Additional amount for children under 6
      if (age >= 6 && age <= 17) ageAdjustment += 50; // For children between 6-17
    });

    // Final benefit after adjustments
    setCalculatedBenefit(baseBenefit + ageAdjustment);
  };

  return (
    <div className="calculator-container">
      <h1>Child and Family Benefits Calculator</h1>
      <form>
        <div className="input-group">
          <label htmlFor="income">Family Income ($):</label>
          <input
            type="number"
            id="income"
            name="income"
            value={income}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div className="input-group">
          <label htmlFor="numChildren">Number of Children:</label>
          <input
            type="number"
            id="numChildren"
            name="numChildren"
            value={numChildren}
            onChange={handleChange}
            min="1"
          />
        </div>

        <div className="input-group">
          <label htmlFor="childAges">Children's Ages (comma separated):</label>
          <input
            type="text"
            id="childAges"
            name="childAges"
            value={childAges}
            onChange={handleChange}
            placeholder="e.g., 2, 5, 10"
          />
        </div>

        <div className="input-group">
          <label htmlFor="province">Province of Residence:</label>
          <select name="province" id="province" value={province} onChange={handleChange}>
            <option value="Ontario">Ontario</option>
            <option value="Quebec">Quebec</option>
            <option value="British Columbia">British Columbia</option>
            <option value="Alberta">Alberta</option>
            {/* Add other provinces here */}
          </select>
        </div>

        <button type="button" onClick={calculateBenefit}>Calculate Benefit</button>
      </form>

      {calculatedBenefit !== null && (
        <div className="calculated-result">
          <h3>Estimated Monthly Benefit: ${calculatedBenefit}</h3>
        </div>
      )}
    </div>
  );
};

export default ChildFamilyBenefitsCalculator;
