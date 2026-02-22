import React, { useState } from "react";
import "../styles/pages/Calculator.css";
import Logo from "../../public/logo.jpg";

const Calculator: React.FC = () => {
    const [formData, setFormData] = useState({
        isNewcomer: false,
        isStudent: false,
        entryDate: "",
        maritalStatus: "",
        province: "",
        annualIncome: "",
        tuitionFees: "", // Current year (T2202)
        tuitionCarryForward: "", // Past years (Notice of Assessment)
        taxWithheld: "", // Box 22 - Available for EVERYONE now
        movingExpenses: "",
        isRural: false,
    });

    const [results, setResults] = useState<any>(null);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const calculateBenefits = () => {
        const {
            entryDate,
            province,
            maritalStatus,
            annualIncome,
            isNewcomer,
            isStudent,
            tuitionFees,
            tuitionCarryForward,
            taxWithheld,
        } = formData;

        const incomeNum = parseFloat(annualIncome) || 0;
        const currentTuition = parseFloat(tuitionFees) || 0;
        const carryForwardNum = parseFloat(tuitionCarryForward) || 0;
        const withheldNum = parseFloat(taxWithheld) || 0;

        // 1. Validation
        if ((isNewcomer && !entryDate) || !province || !maritalStatus) {
            alert("Please fill out all fields.");
            return;
        }

        // 2. MARRIED STATUS CHECK (New Logic)
        // If married, stop calculation and show special message
        if (maritalStatus === "married") {
            const waMsg = encodeURIComponent(
                `Hi CMS Services! I am married and looking to file my taxes. Since my situation involves spousal credits and potential family benefits, I need an expert opinion. Please guide me.`,
            );

            setResults({
                isComplex: true, // Flag to trigger the special view
                waMsg: waMsg,
            });
            return; // Stop execution here
        }

        // --- 3. STANDARD CALCULATION (For Single Users) ---

        // 2026 Rules: Constants
        const bpa2026 = 16452;
        const fedRate1 = 0.14; // First bracket (up to $58,523)
        const fedRate2 = 0.205; // Second bracket

        // Step A: Calculate Gross Federal Tax (using brackets)
        let grossFedTax = 0;
        if (incomeNum <= 58523) {
            grossFedTax = incomeNum * fedRate1;
        } else {
            grossFedTax = (58523 * fedRate1) + ((incomeNum - 58523) * fedRate2);
        }

        // Step B: Calculate Non-Refundable Credits (BPA + Tuition)
        const totalTuitionPool = currentTuition + carryForwardNum;
        // In Canada, credits are applied at the lowest tax rate (14%)
        const totalCreditValue = (bpa2026 + totalTuitionPool) * fedRate1;

        // Step C: Calculate Final Federal Tax Owed
        // Credits can only bring tax down to $0, never negative.
        const netFedTaxOwed = Math.max(0, grossFedTax - totalCreditValue);

        // Step D: Calculate Provincial Estimate (To ensure Refund math is accurate)
        // Since T4 Box 22 includes BOTH Federal & Provincial tax, we must estimate Provincial.
        const provBPA = 12500; 
        const provRate = 0.0505; // Standard lowest provincial rate estimate
        const grossProvTax = Math.max(0, incomeNum - provBPA) * provRate;
        const provCreditValue = totalTuitionPool * provRate;
        const netProvTaxOwed = Math.max(0, grossProvTax - provCreditValue);

        // Step E: Calculate Refund
        const finalTaxOwed = netFedTaxOwed + netProvTaxOwed;
        const estimatedRefund = Math.max(0, withheldNum - finalTaxOwed);

        // --- NEWCOMER ARRIVAL BONUS (RC151) ---
        const bonuses: any = {
            Ontario: { "1-4": 876, "5-8": 575, "9-12": 362.5 },
            Saskatchewan: { "1-4": 980, "5-8": 577, "9-12": 385 },
            "New Brunswick": { "1-4": 745, "5-8": 480, "9-12": 325 },
            "Nova Scotia": { "1-4": 708, "5-8": 450, "9-12": 297.5 },
            "Newfoundland and Labrador": { "1-4": 745, "5-8": 480, "9-12": 325 },
            "Prince Edward Island": { "1-4": 745, "5-8": 480, "9-12": 325 },
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

        // --- GST/CGEB Logic ---
        let annualBase = 543;
        if (incomeNum > 11000) annualBase += Math.min(183, (incomeNum - 11000) * 0.02);
        let federalTotal = annualBase * 1.75;
        if (incomeNum > 46432)
            federalTotal = Math.max(0, federalTotal - (incomeNum - 46432) * 0.075);
        federalTotal = Math.min(950, federalTotal);

        // --- CANADA WORKERS BENEFIT (CWB) ---
        let cwb = 0;
        if (!isNewcomer && !isStudent && incomeNum >= 3000 && incomeNum <= 37742) {
            const maxCWB = 1633;
            if (incomeNum <= 26855) cwb = Math.min(maxCWB, (incomeNum - 3000) * 0.27);
            else cwb = Math.max(0, maxCWB - (incomeNum - 26855) * (maxCWB / (37742 - 26855)));
        }

        // --- PROVINCIAL CREDITS ---
        let provName = "";
        let provAmt = 0;
        let oeptcRange = "";
        let renterCreditAmt = 0;
        let renterCreditName = "";

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
        } else if (province === "Newfoundland and Labrador") {
            provName = "NL Income Supplement";
            provAmt = Math.max(0, 510 - (incomeNum > 36000 ? (incomeNum - 36000) * 0.05 : 0));
        } else if (province === "Prince Edward Island") {
            provName = "PEI Sales Tax Credit";
            provAmt = Math.max(0, 165 - (incomeNum > 50000 ? (incomeNum - 50000) * 0.02 : 0));
        }

        // Student Renter Logic
        if (isStudent) {
            if (province === "British Columbia") {
                renterCreditName = "BC Renter's Tax Credit";
                renterCreditAmt = Math.max(
                    0,
                    400 - (incomeNum > 66189 ? (incomeNum - 66189) * 0.02 : 0),
                );
            } else if (province === "Manitoba") {
                renterCreditName = "MB Renters Affordability Tax Credit";
                renterCreditAmt = 625;
            }
        }

        // --- TOTALS ---
        const baseTotal =
            nBonus + federalTotal + cwb + provAmt + renterCreditAmt + estimatedRefund;
        const totalLow = baseTotal + (province === "Ontario" ? 180 : 0);
        const totalHigh = baseTotal + (province === "Ontario" ? 450 : 0);

        const waMsg = encodeURIComponent(
            `Hi CMS Services! Estimate: $${totalLow.toFixed(0)} to $${totalHigh.toFixed(0)}. Province: ${province}. C/F Tuition: $${carryForwardNum}. I'd like to proceed with your $26.55 tax filing.`,
        );

        setResults({
            isComplex: false, // Standard result
            totalLow,
            totalHigh,
            nBonus,
            federalTotal,
            cwb,
            provName,
            provAmt,
            oeptcRange,
            province,
            waMsg,
            renterCreditAmt,
            renterCreditName,
            isStudent,
            estimatedRefund,
        });
    };

    return (
        <div className="calculator">
            <div className="calculator-header">
                <img src={Logo} alt="CMS Services" className="header-logo" />
                <p className="tagline">YOUR ULTIMATE SOLUTION HUB</p>
            </div>

            <h1> Benefits & Refund Estimator (2026)</h1>

            <div className="form-grid">
                <div className="form-group checkbox-group">
                    <label>Newcomer (Only if you Arrived 2025)?</label>
                    <input
                        type="checkbox"
                        name="isNewcomer"
                        checked={formData.isNewcomer}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group checkbox-group">
                    <label>Full-time Student?(Only if You were Studying in 2025 for more than 3 months?)</label>
                    <input
                        type="checkbox"
                        name="isStudent"
                        checked={formData.isStudent}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

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
                    <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                    <option value="Prince Edward Island">Prince Edward Island</option>
                </select>
            </div>

            <div className="form-group">
                <label>Estimated Annual Income (CAD):</label>
                <input
                    type="number"
                    name="annualIncome"
                    placeholder="e.g. 22000"
                    value={formData.annualIncome}
                    onChange={handleInputChange}
                />
            </div>

            <div className="form-group">
                <label>Total Income Tax Paid (T4 Box 22):</label>
                <input
                    type="number"
                    name="taxWithheld"
                    placeholder="Total tax deducted from pay"
                    value={formData.taxWithheld}
                    onChange={handleInputChange}
                />
                <small
                    style={{
                        display: "block",
                        marginTop: "5px",
                        color: "#666",
                        fontSize: "0.8rem",
                    }}
                >
                    Enter the amount from Box 22 on all your T4 slips.
                </small>
            </div>

            <div className="form-group">
                <label>Unused Tuition Carry-Forward:</label>
                <input
                    type="number"
                    name="tuitionCarryForward"
                    placeholder="Check your Notice of Assessment (NOA)"
                    value={formData.tuitionCarryForward}
                    onChange={handleInputChange}
                />
                <small
                    style={{
                        display: "block",
                        marginTop: "5px",
                        color: "#666",
                        fontSize: "0.8rem",
                    }}
                >
                    Enter unused amounts from previous years. Available even if you are not
                    currently a student.
                </small>
            </div>

            {formData.isStudent && (
                <div className="student-fields animate-fade">
                    <div className="form-group">
                        <label>Current Tuition Fees Paid (T2202):</label>
                        <input
                            type="number"
                            name="tuitionFees"
                            placeholder="Total tuition on slip"
                            value={formData.tuitionFees}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            )}

            {formData.isNewcomer && (
                <div className="form-group">
                    <label>Date of Entry:</label>
                    <input
                        type="date"
                        name="entryDate"
                        value={formData.entryDate}
                        onChange={handleInputChange}
                    />
                </div>
            )}

            <div className="form-group">
                <label>Marital Status:</label>
                <select
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleInputChange}
                >
                    <option value="">Select Status</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                </select>
            </div>

            <button onClick={calculateBenefits} className="calc-btn">
                Get My Full Estimate
            </button>

            {results && (
                <div className="result animate-fade">
                    {results.isComplex ? (
                        // --- MARRIED / COMPLEX STATUS VIEW ---
                        <div className="complex-view">
                            <div className="complex-header">
                                <span className="warning-badge">⚠️ Custom Quote Required</span>
                                <p className="complex-title">Married tax returns are complex.</p>
                            </div>

                            <div className="complex-body">
                                <p>
                                    Filing as <strong>Married</strong> requires linking your return with
                                    your spouse to optimize credits like the{" "}
                                    <strong>Canada Child Benefit (CCB)</strong> and{" "}
                                    <strong>GST Credit</strong>.
                                </p>
                                <p style={{ marginTop: "1rem" }}>
                                    This cannot be estimated automatically. We need to review both files to
                                    ensure you get the maximum family refund.
                                </p>
                            </div>

                            <div className="complex-footer">
                                <div className="pricing-badge-complex">
                                    Expert Family Filing & Optimization
                                </div>
                                <a
                                    href={`https://wa.me/7533816665?text=${results.waMsg}`}
                                    className="wa-button-sales"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Contact Us for a Married Quote
                                </a>
                            </div>
                        </div>
                    ) : (
                        // --- STANDARD SINGLE VIEW ---
                        <>
                            <div className="result-header">
                                <span className="success-badge">✅ Calculation Complete</span>
                                <p className="total-display">
                                    <strong>
                                        Estimated Total Cash Back:{" "}
                                        {results.province === "Ontario"
                                            ? `$${results.totalLow.toFixed(2)} – $${results.totalHigh.toFixed(2)}`
                                            : `$${results.totalLow.toFixed(2)}`}
                                    </strong>
                                </p>
                            </div>
                            <hr />
                            <div className="benefit-numbers">
                                {results.estimatedRefund > 0 && (
                                    <p className="highlight-benefit">
                                        <span>Estimated Tax Refund:</span>{" "}
                                        <span>${results.estimatedRefund.toFixed(2)}</span>
                                    </p>
                                )}
                                {results.nBonus > 0 && (
                                    <p>
                                        <span>Newcomer Arrival Bonus:</span>{" "}
                                        <span>${results.nBonus.toFixed(2)}</span>
                                    </p>
                                )}
                                <p>
                                    <span>GST/HST & Groceries Benefit:</span>{" "}
                                    <span>${results.federalTotal.toFixed(2)}</span>
                                </p>
                                {results.isStudent && results.renterCreditAmt > 0 && (
                                    <p className="highlight-benefit">
                                        <span>{results.renterCreditName}:</span>{" "}
                                        <span>${results.renterCreditAmt.toFixed(2)}</span>
                                    </p>
                                )}
                                {results.cwb > 0 && (
                                    <p>
                                        <span>Canada Workers Benefit (CWB):</span>{" "}
                                        <span>${results.cwb.toFixed(2)}</span>
                                    </p>
                                )}
                                {results.provAmt > 0 && (
                                    <p>
                                        <span>{results.provName}:</span>{" "}
                                        <span>${results.provAmt.toFixed(2)}</span>
                                    </p>
                                )}
                                {results.oeptcRange && (
                                    <p>
                                        <span>Ontario OEPTC (Energy/Rent):</span>{" "}
                                        <span>{results.oeptcRange}</span>
                                    </p>
                                )}
                            </div>

                            <div className="tip-box">
                                <strong>💡 Pro Tip:</strong>{" "}
                                {results.estimatedRefund === 0 && parseFloat(formData.taxWithheld) > 0
                                    ? "You didn't overpay tax this year, but your credits might help you next year!"
                                    : "Keep your T4 and T2202 slips handy for your $26.55 CMS filing!"}
                            </div>

                            <div className="sales-cta">
                                <div className="pricing-badge">
                                    Expert Newcomer Filing: <strong>$26.55</strong>
                                </div>
                                <a
                                    href={`https://wa.me/7533816665?text=${results.waMsg}`}
                                    className="wa-button-sales"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    File my Taxes with CMS Services
                                </a>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Calculator;