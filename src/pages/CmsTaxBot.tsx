import React, { useState, ChangeEvent, useMemo } from "react";
import {
	Container,
	Card,
	Button,
	Form,
	Row,
	Col,
	ProgressBar,
	Table,
	Badge,
	Stack,
	Alert,
} from "react-bootstrap";

interface FormState {
	service: string;
	entryDate: string;
	province: string;
	maritalStatus: "single" | "married" | "";
	taxfiled: string;
	student2025: "Yes" | "No";
	annualIncome: string;
	taxWithheld: string;
	tuitionFees: string;
	tuitionCarryForward: string;
}

const initialForm: FormState = {
	service: "",
	entryDate: "",
	province: "",
	maritalStatus: "",
	taxfiled: "",
	student2025: "No",
	annualIncome: "",
	taxWithheld: "",
	tuitionFees: "",
	tuitionCarryForward: "",
};

const CmsTaxBot: React.FC = () => {
	const [step, setStep] = useState<number>(0);
	const [form, setForm] = useState<FormState>(initialForm);

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		let newValue = value;

		// PROTECTION: Snap any date past 2025 back to Dec 31, 2025
		if (name === "entryDate" && value) {
			const selectedDate = new Date(value);
			if (selectedDate.getFullYear() > 2025) {
				newValue = "2025-12-31";
			}
		}

		setForm(prev => {
			const updatedForm = { ...prev, [name]: newValue };

			// LOGIC: If income is 0, tax withheld must be 0
			if (name === "annualIncome" && (newValue === "0" || newValue === "")) {
				updatedForm.taxWithheld = "0";
			}

			return updatedForm;
		});
	};

	const handleServiceSelection = (serviceName: string) => {
		setForm(prev => ({ ...prev, service: serviceName }));
		if (serviceName === "Tax File") {
			setStep(1);
		} else {
			setStep(5);
		}
	};

	const handleBack = (): void => {
		if (step === 1 || step === 5) return setStep(0);
		if (step === 2 || step === 3) return setStep(1);
		if (step === 4) return setStep(form.maritalStatus === "single" ? 2 : 3);
		setStep(prev => prev - 1);
	};

	const isLosingBenefits = useMemo(() => {
		if (form.taxfiled === "no" && form.entryDate) {
			const arrivalYear = new Date(form.entryDate).getFullYear();
			return arrivalYear < 2025;
		}
		return false;
	}, [form.taxfiled, form.entryDate]);

	const results = useMemo(() => {
		const incomeNum = parseFloat(form.annualIncome) || 0;
		const currentTuition = parseFloat(form.tuitionFees) || 0;
		const carryForwardNum = parseFloat(form.tuitionCarryForward) || 0;
		const withheldNum = parseFloat(form.taxWithheld) || 0;
		const province = form.province;
		const entryDate = form.entryDate;

		const bpa2026 = 16452;
		const fedRate = 0.14;
		const taxableIncome = Math.max(0, incomeNum - bpa2026);
		const theoreticalTaxOwed = taxableIncome * fedRate;
		const totalTuitionCredits = (currentTuition + carryForwardNum) * fedRate;
		const finalTaxLiability = Math.max(0, theoreticalTaxOwed - totalTuitionCredits);
		const estimatedRefund = Math.max(0, withheldNum - finalTaxLiability);

		const gstTotalLow = 650;
		const gstTotalHigh = 950;

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
		if (entryDate) {
			const arrivalYear = new Date(entryDate).getFullYear();
			if (arrivalYear === 2025 && bonuses[province]) {
				const month = new Date(entryDate).getMonth() + 1;
				const key = month <= 4 ? "1-4" : month <= 8 ? "5-8" : "9-12";
				nBonus = bonuses[province][key];
			}
		}

		let cwb = 0;
		const arrivalYearValue = entryDate ? new Date(entryDate).getFullYear() : 0;
		if (
			arrivalYearValue < 2025 &&
			arrivalYearValue !== 0 &&
			incomeNum >= 3000 &&
			incomeNum <= 37742
		) {
			const maxCWB = 1633;
			if (incomeNum <= 26855) cwb = Math.min(maxCWB, (incomeNum - 3000) * 0.27);
			else cwb = Math.max(0, maxCWB - (incomeNum - 26855) * (maxCWB / (37742 - 26855)));
		}

		let provName = "";
		let provAmt = 0;
		let oeptcRange = "";
		let renterCreditAmt = 0;
		let renterCreditName = "";

		switch (province) {
			case "Ontario":
				provName = "Ontario Sales Tax Credit";
				provAmt = Math.max(0, 378 - (incomeNum > 29047 ? (incomeNum - 29047) * 0.04 : 0));
				oeptcRange = "$180 – $450";
				break;
			case "British Columbia":
				renterCreditName = "BC Renter's Tax Credit";
				renterCreditAmt = Math.max(
					0,
					400 - (incomeNum > 66189 ? (incomeNum - 66189) * 0.02 : 0),
				);
				break;
			case "Manitoba":
				renterCreditName = "MB Renters Affordability Tax Credit";
				renterCreditAmt = 625;
				break;
			case "Saskatchewan":
				provName = "SK Low-Income Credit";
				provAmt = Math.max(0, 429 - (incomeNum > 38588 ? (incomeNum - 38588) * 0.05 : 0));
				break;
		}

		const totalLow =
			nBonus +
			gstTotalLow +
			provAmt +
			renterCreditAmt +
			cwb +
			estimatedRefund +
			(province === "Ontario" ? 180 : 0);
		const totalHigh =
			nBonus +
			gstTotalHigh +
			provAmt +
			renterCreditAmt +
			cwb +
			estimatedRefund +
			(province === "Ontario" ? 450 : 0);

		const waMsg = encodeURIComponent(
			`*CMS TAX FILING INQUIRY*\n\n` +
				`*SUMMARY ESTIMATE*\n` +
				`💰 Total Range: $${totalLow.toFixed(0)} - $${totalHigh.toFixed(0)}\n` +
				`💸 Fed Refund: $${estimatedRefund.toFixed(2)}\n\n` +
				`*--- USER PROFILE ---*\n` +
				`📍 Province: ${province}\n` +
				`📅 Entry Date: ${entryDate || "Not provided"}\n` +
				`💍 Marital Status: ${form.maritalStatus}\n` +
				`🆕 First Time Filer: ${form.taxfiled === "no" ? "Yes" : "No"}\n` +
				`🎓 Student (2025): ${form.student2025}\n\n` +
				`*--- FINANCIALS ---*\n` +
				`💵 Annual Income: $${incomeNum}\n` +
				`🏦 Tax Withheld (Box 22): $${withheldNum}\n` +
				`📚 Tuition Slip: $${currentTuition}\n` +
				`⏭️ Tuition Carry Forward: $${carryForwardNum}\n\n` +
				`*--- CALCULATED BENEFITS ---*\n` +
				(nBonus > 0 ? `✨ Newcomer Bonus: $${nBonus.toFixed(2)}\n` : "") +
				(cwb > 0 ? `🛠️ Canada Workers Benefit: $${cwb.toFixed(2)}\n` : "") +
				(provAmt > 0 ? `🏛️ ${provName}: $${provAmt.toFixed(2)}\n` : "") +
				(renterCreditAmt > 0
					? `🏠 ${renterCreditName}: $${renterCreditAmt.toFixed(2)}\n`
					: "") +
				(oeptcRange ? `🏢 Ontario OEPTC: ${oeptcRange}\n` : "") +
				`📦 GST/HST Rebate: $650 - $950`,
		);

		return {
			totalLow,
			totalHigh,
			nBonus,
			cwb,
			provAmt,
			provName,
			renterCreditAmt,
			renterCreditName,
			oeptcRange,
			estimatedRefund,
			waMsg,
		};
	}, [form]);

	return (
		<Container className="py-5">
			<Row className="justify-content-center">
				<Col md={10} lg={7} xl={6}>
					{step > 0 && step < 5 && (
						<div className="mb-4 text-center">
							<ProgressBar
								now={(step / 4) * 100}
								variant="success"
								style={{ height: "6px" }}
								className="mb-2"
							/>
							<div className="small fw-bold text-muted">Progress</div>
						</div>
					)}

					<Card className="border-0 shadow-lg rounded-4 overflow-hidden">
						<Card.Body className="p-4 p-md-5">
							{step === 0 && (
								<div>
									<h4 className="fw-bold mb-3 text-center">
										Thank you for contacting{" "}
										<span className="text-primary">CMS SERVICES✅</span>
									</h4>
									<p className="text-muted text-center mb-4">
										Choose one of the following options:
									</p>
									<Stack gap={2}>
										{[
											"Tax File",
											"Immigration Help",
											"Insurance Services(Auto,Home,Life)",
											"Investments",
											"OSAP(Ontario Student Assistance Program)",
											"Business Registration and Taxation",
											"Payroll and Remittance",
											"Notary and Legal Services",
										].map((item, index) => (
											<Button
												key={index}
												variant="outline-primary"
												className="text-start py-3 px-4 rounded-3 border-2 fw-semibold transition-all hover-shadow"
												onClick={() => handleServiceSelection(item)}
											>
												{index + 1}) {item}
											</Button>
										))}
									</Stack>
									<p className="mt-4 text-center text-muted fw-bold">
										We are happy to help😇
									</p>
								</div>
							)}

							{step === 5 && (
								<div className="text-center py-4">
									<h4 className="fw-bold mb-4">Contact CMS Experts</h4>
									<p className="text-muted mb-4">
										For <strong>{form.service}</strong>, please connect with our dedicated
										team on WhatsApp.
									</p>
									<Button
										variant="success"
										className="w-100 py-3 rounded-pill fw-bold shadow mb-3"
										onClick={() =>
											window.open(
												`https://wa.me/16474469738?text=Hello CMS, I am interested in ${form.service}.`,
											)
										}
									>
										Contact via WhatsApp
									</Button>
									<Button
										variant="link"
										className="text-muted"
										onClick={() => setStep(0)}
									>
										← View other services
									</Button>
								</div>
							)}

							{step === 1 && (
								<Form>
									<h3 className="fw-bold mb-4">Tax Estimate (2026)</h3>
									<Stack gap={3}>
										<Form.Group>
											<Form.Label className="small fw-bold text-muted">
												Have you Filed your Taxes before?
											</Form.Label>
											<Form.Select
												name="taxfiled"
												value={form.taxfiled}
												onChange={handleChange}
											>
												<option value="">Select...</option>
												<option value="yes">Yes, I have filed</option>
												<option value="no">No, I have never filed</option>
											</Form.Select>
										</Form.Group>
										<Form.Group>
											<Form.Label className="small fw-bold text-muted">
												Date of Canada Entry
											</Form.Label>
											<Form.Control
												type="date"
												name="entryDate"
												onChange={handleChange}
												value={form.entryDate}
												max="2025-12-31"
											/>
										</Form.Group>

										{isLosingBenefits && (
											<Alert variant="danger" className="fw-bold small py-2">
												⚠️ You are losing money! Because you arrived before 2025 and
												haven't filed yet, you have unclaimed benefits
												<p>
													Please{" "}
													<a
														href="https://wa.me/17533816665"
														target="_blank"
														rel="noreferrer"
													>
														contact us
													</a>{" "}
													directly on WhatsApp for this service.
												</p>
											</Alert>
										)}
										<Form.Group>
											<Form.Label className="small fw-bold text-muted">
												Province
											</Form.Label>
											<Form.Select
												name="province"
												value={form.province}
												onChange={handleChange}
											>
												<option value="">Select Province...</option>
												<option value="Alberta">Alberta</option>
												<option value="British Columbia">British Columbia</option>
												<option value="Manitoba">Manitoba</option>
												<option value="New Brunswick">New Brunswick</option>
												<option value="Newfoundland and Labrador">
													Newfoundland and Labrador
												</option>
												<option value="Nova Scotia">Nova Scotia</option>
												<option value="Ontario">Ontario</option>
												<option value="Prince Edward Island">Prince Edward Island</option>
												<option value="Saskatchewan">Saskatchewan</option>
												<option value="Northwest Territories">
													Northwest Territories
												</option>
												<option value="Nunavut">Nunavut</option>
												<option value="Yukon">Yukon</option>
											</Form.Select>
										</Form.Group>
										<Form.Group>
											<Form.Label className="small fw-bold text-muted">
												Marital Status
											</Form.Label>
											<Form.Select
												name="maritalStatus"
												value={form.maritalStatus}
												onChange={handleChange}
											>
												<option value="">Select...</option>
												<option value="single">Single</option>
												<option value="married">Married</option>
											</Form.Select>
										</Form.Group>
									</Stack>
									<div className="d-flex gap-2 mt-4">
										<Button variant="light" className="flex-grow-1" onClick={handleBack}>
											Back
										</Button>
										<Button
											variant="primary"
											className="flex-grow-1 fw-bold"
											disabled={!form.province || !form.maritalStatus}
											onClick={() => setStep(form.maritalStatus === "married" ? 3 : 2)}
										>
											Next
										</Button>
									</div>
								</Form>
							)}

							{step === 2 && (
								<Form>
									<h4 className="fw-bold mb-4">Income And Credits</h4>
									<Stack gap={3}>
										<Form.Group>
											<Form.Label className="small fw-bold text-muted">
												Total Annual Income (CAD)
											</Form.Label>
											<Form.Control
												type="number"
												name="annualIncome"
												value={form.annualIncome}
												onChange={handleChange}
												placeholder="Enter Value"
											/>
										</Form.Group>
										<Form.Group>
											<Form.Label
												className={`small fw-bold ${parseFloat(form.annualIncome) === 0 ? "text-danger" : "text-muted"}`}
											>
												Total Tax Paid (Box 22){" "}
												{parseFloat(form.annualIncome) === 0 &&
													"(Not applicable if income is 0)"}
											</Form.Label>
											<Form.Control
												type="number"
												name="taxWithheld"
												value={form.taxWithheld}
												onChange={handleChange}
												placeholder="0.00"
												disabled={parseFloat(form.annualIncome) === 0}
											/>
										</Form.Group>
										<Form.Group>
											<Form.Label className="small fw-bold text-muted">
												Full-time student in 2025?
											</Form.Label>
											<Form.Select
												name="student2025"
												value={form.student2025}
												onChange={handleChange}
											>
												<option value="No">No</option>
												<option value="Yes">Yes</option>
											</Form.Select>
										</Form.Group>
										<Row>
											<Col>
												<Form.Label className="small fw-bold text-muted">
													Tuition (T2202)
												</Form.Label>
												<Form.Control
													type="number"
													name="tuitionFees"
													value={form.tuitionFees}
													onChange={handleChange}
													placeholder="0"
												/>
											</Col>
											<Col>
												<Form.Label className="small fw-bold text-muted">
													Carry Forward
												</Form.Label>
												<Form.Control
													type="number"
													name="tuitionCarryForward"
													value={form.tuitionCarryForward}
													onChange={handleChange}
													placeholder="From NOA"
												/>
											</Col>
										</Row>
									</Stack>
									<div className="d-flex gap-2 mt-4">
										<Button variant="light" className="flex-grow-1" onClick={handleBack}>
											Back
										</Button>
										<Button
											variant="primary"
											className="flex-grow-1 fw-bold"
											onClick={() => setStep(4)}
										>
											Get Estimation
										</Button>
									</div>
								</Form>
							)}

							{step === 3 && (
								<div className="text-center py-3">
									<h5 className="fw-bold text-warning mb-3">
										Custom Optimization Needed
									</h5>
									<p className="text-muted small">
										Family refunds allow spousal credit splits. This requires manual
										expert review for maximum results.
									</p>
									<Button
										variant="success"
										className="w-100 py-3 mb-2 rounded-pill fw-bold"
										onClick={() =>
											window.open(`https://wa.me/7533816665?text=${results.waMsg}`)
										}
									>
										Request Review
									</Button>
									<Button
										variant="link"
										className="text-muted small"
										onClick={handleBack}
									>
										Edit Info
									</Button>
								</div>
							)}

							{step === 4 && (
								<div>
									<div className="text-center mb-4">
										<Badge bg="success" className="mb-2 px-3 py-2">
											ESTIMATION READY
										</Badge>
										<h2 className="fw-bold">
											${results.totalLow.toFixed(0)} – ${results.totalHigh.toFixed(0)}
										</h2>
										<div className="small fw-bold text-muted uppercase">
											Potential Benefit and Refund Range
										</div>
									</div>
									<Table borderless size="sm">
										<tbody className="small">
											<tr className="border-bottom">
												<td>Federal Tax Refund (CRA)</td>
												<td className="text-end fw-bold">
													${results.estimatedRefund.toFixed(2)}
												</td>
											</tr>
											<tr className="border-bottom">
												<td>GST/HST & Grocery Rebate</td>
												<td className="text-end fw-bold text-success">$650 – $950</td>
											</tr>
											{results.nBonus > 0 && (
												<tr className="border-bottom">
													<td>Newcomer Bonus</td>
													<td className="text-end fw-bold">
														${results.nBonus.toFixed(2)}
													</td>
												</tr>
											)}
											{results.renterCreditAmt > 0 && (
												<tr className="border-bottom">
													<td>{results.renterCreditName}</td>
													<td className="text-end fw-bold">
														${results.renterCreditAmt.toFixed(2)}
													</td>
												</tr>
											)}
											{results.provAmt > 0 && (
												<tr className="border-bottom">
													<td>{results.provName}</td>
													<td className="text-end fw-bold">
														${results.provAmt.toFixed(2)}
													</td>
												</tr>
											)}
											{results.oeptcRange && (
												<tr className="border-bottom">
													<td>Ontario OEPTC</td>
													<td className="text-end fw-bold">{results.oeptcRange}</td>
												</tr>
											)}
											{results.cwb > 0 && (
												<tr className="border-bottom">
													<td>Canada Workers Benefit</td>
													<td className="text-end fw-bold">${results.cwb.toFixed(2)}</td>
												</tr>
											)}
										</tbody>
									</Table>
									<Button
										variant="success"
										className="w-100 py-3 fw-bold mt-3 shadow-sm rounded-pill"
										onClick={() =>
											window.open(`https://wa.me/7533816665?text=${results.waMsg}`)
										}
									>
										Claim via WhatsApp
									</Button>
									<Button
										variant="outline-secondary"
										className="w-100 mt-2 border-0"
										onClick={handleBack}
									>
										Back to edit
									</Button>
								</div>
							)}
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default CmsTaxBot;
