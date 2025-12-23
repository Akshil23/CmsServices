import React, { useState, useRef } from "react";
import { Container, Button, Row, Col, Badge } from "react-bootstrap";
import {
	FaWhatsapp,
	FaHeartbeat,
	FaCar,
	FaPlaneDeparture,
	FaShieldAlt,
	FaHourglassHalf,
	FaUserCheck,
	FaCheckCircle,
} from "react-icons/fa";
import "../styles/pages/InsuranceServices.css"; // Using consistent styling

const InsuranceServices: React.FC = () => {
	const whatsappNumber = "17533816665";
	const [userInfo, setUserInfo] = useState({
		name: "",
		email: "",
		service: "",
		customQuery: "",
	});

	const formRef = useRef<HTMLDivElement>(null);

	// Handle inputs
	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setUserInfo(prev => ({ ...prev, [name]: value }));
	};

	// Scroll to form on selection
	const handleServiceSelection = (serviceTitle: string) => {
		setUserInfo(prev => ({ ...prev, service: serviceTitle }));
		if (formRef.current) {
			formRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	};

	// WhatsApp Logic
	const handleWhatsAppSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		let message = `*Insurance Consultation Request*%0A%0A*Name:* ${userInfo.name}%0A*Email:* ${userInfo.email}%0A*Interested In:* ${userInfo.service}`;

		if (userInfo.customQuery) {
			message += `%0A*Note:* ${userInfo.customQuery}`;
		}

		const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;
		window.open(whatsappLink, "_blank");
	};

	const services = [
		{
			icon: <FaHeartbeat />,
			title: "Life Insurance",
			desc: "Protect your loved ones and secure their future. Customized coverage based on your needs with competitive rates from top Canadian insurers.",
			tag: "Essential",
			val: "Life Insurance",
		},
		{
			icon: <FaPlaneDeparture />,
			title: "Super Visa Insurance",
			desc: "Mandatory medical coverage for parents & grandparents visiting Canada. We offer low-cost monthly plans that meet all IRCC requirements.",
			tag: "Best Rates",
			val: "Super Visa Insurance",
		},
		{
			icon: <FaHourglassHalf />,
			title: "Term Insurance",
			desc: "Affordable protection for a specific period (10, 20, 30 years). Ideal for covering mortgages, loans, and growing families.",
			tag: "Affordable",
			val: "Term Insurance",
		},
		{
			icon: <FaCar />,
			title: "Auto Insurance",
			desc: "Reliable coverage for personal and commercial vehicles. We bundle savings to get you the most competitive quotes fast.",
			tag: "Quick Quote",
			val: "Auto Insurance",
		},
		{
			icon: <FaShieldAlt />,
			title: "Permanent Insurance",
			desc: "Lifetime protection with cash value growth. Perfect for estate planning and leaving a tax-free legacy for beneficiaries.",
			tag: "Lifetime Coverage",
			val: "Permanent Insurance",
		},
		{
			icon: <FaUserCheck />,
			title: "Disability/Critical Illness",
			desc: "Income protection if you cannot work. Covers expenses during recovery from serious illnesses like cancer or heart attack.",
			tag: "Income Protection",
			val: "Critical Illness Insurance",
		},
	];

	return (
		<div className="insurance-page-wrapper">
			<Container className="py-5">
				{/* HERO SECTION */}
				<div className="text-center mb-5" data-aos="fade-up">
					<Badge
						bg="warning"
						text="dark"
						className="mb-3 px-3 py-2"
						style={{ fontSize: "0.9rem", fontWeight: 800 }}
					>
						🇨🇦 LICENSED INSURANCE ADVISOR
					</Badge>
					<h1 className="page-title">Protect What Matters Most</h1>
					<p className="page-subtitle">
						Get the right coverage at the right price. Free consultations with a licensed
						advisor for Life, Auto, and Super Visa Insurance.
					</p>
				</div>

				{/* SERVICES GRID */}
				<div className="insurance-grid" data-aos="fade-up">
					{services.map((item, index) => (
						<div className="insure-card" key={index}>
							<div className="card-top">
								<div className="icon-box">{item.icon}</div>
								{item.tag && <span className="service-tag">{item.tag}</span>}
							</div>
							<h3>{item.title}</h3>
							<p className="insure-desc">{item.desc}</p>
							<Button
								className="insure-btn"
								onClick={() => handleServiceSelection(item.val)}
							>
								Get Free Quote
							</Button>
						</div>
					))}
				</div>

				{/* WHY CHOOSE US & PROCESS */}
				<Row className="my-5 g-4" data-aos="fade-up">
					<Col lg={6}>
						<div className="info-panel">
							<h2>Why Choose Us?</h2>
							<ul className="check-list">
								<li>
									<FaCheckCircle className="check-icon" /> Licensed & Experienced
									Insurance Advisor
								</li>
								<li>
									<FaCheckCircle className="check-icon" /> Access to Multiple Providers
									(Best Rates)
								</li>
								<li>
									<FaCheckCircle className="check-icon" /> Super Visa Insurance Issued
									Same Day
								</li>
								<li>
									<FaCheckCircle className="check-icon" /> Transparent Pricing - No Hidden
									Fees
								</li>
								<li>
									<FaCheckCircle className="check-icon" /> Virtual or In-Person
									Consultations
								</li>
							</ul>
						</div>
					</Col>
					<Col lg={6}>
						<div className="info-panel highlight-panel">
							<h2>How It Works</h2>
							<div className="steps-list">
								<div className="step-item">
									<span className="step-num">1</span>
									<p>
										<strong>Book Free Consultation:</strong> Fill the form below.
									</p>
								</div>
								<div className="step-item">
									<span className="step-num">2</span>
									<p>
										<strong>Compare Options:</strong> We shop the market for you.
									</p>
								</div>
								<div className="step-item">
									<span className="step-num">3</span>
									<p>
										<strong>Get Covered:</strong> Digital policy setup, same day.
									</p>
								</div>
							</div>
						</div>
					</Col>
				</Row>

				{/* FORM SECTION */}
				<div className="form-container" ref={formRef} data-aos="zoom-in">
					<div className="contact-form-card">
						<h2 className="text-center">Book Your Free Consultation</h2>
						<p className="text-center text-muted mb-4">
							Selected Topic:{" "}
							<strong>{userInfo.service || "General Insurance Inquiry"}</strong>
						</p>

						<form onSubmit={handleWhatsAppSubmit}>
							<Row>
								<Col md={6} className="mb-3">
									<label className="form-label">Full Name</label>
									<input
										type="text"
										name="name"
										placeholder="Enter your name"
										className="form-control-styled"
										value={userInfo.name}
										onChange={handleInputChange}
										required
									/>
								</Col>
								<Col md={6} className="mb-3">
									<label className="form-label">Email Address</label>
									<input
										type="email"
										name="email"
										placeholder="name@example.com"
										className="form-control-styled"
										value={userInfo.email}
										onChange={handleInputChange}
										required
									/>
								</Col>
							</Row>

							<div className="mb-3">
								<label className="form-label">Insurance Type</label>
								<select
									name="service"
									className="form-control-styled select-arrow"
									value={userInfo.service}
									onChange={handleInputChange}
									required
								>
									<option value="" disabled>
										Select Coverage Needed...
									</option>
									<option value="Life Insurance">Life Insurance (Protect Family)</option>
									<option value="Super Visa Insurance">
										Super Visa Insurance (Parents)
									</option>
									<option value="Term Insurance">Term Insurance (Mortgage/Loan)</option>
									<option value="Permanent Insurance">
										Permanent Insurance (Estate)
									</option>
									<option value="Auto Insurance">Auto Insurance</option>
									<option value="Critical Illness">Critical Illness / Disability</option>
								</select>
							</div>

							<div className="mb-4">
								<label className="form-label">
									Any specifics? (Budget, coverage amount, etc.)
								</label>
								<textarea
									name="customQuery"
									rows={3}
									className="form-control-styled"
									placeholder="Optional details..."
									value={userInfo.customQuery}
									onChange={handleInputChange}
								/>
							</div>

							<Button type="submit" className="submit-btn-whatsapp-large">
								<FaWhatsapp size={20} /> Schedule Call via WhatsApp
							</Button>
						</form>
					</div>
				</div>

				{/* DISCLAIMER FOOTER */}
				<div className="compliance-footer text-center mt-5">
					<p className="text-muted small">
						<strong>Disclaimer:</strong> Insurance products are subject to underwriting
						approval and policy terms. Coverage and pricing vary by individual
						circumstances. All advice provided by a licensed insurance advisor in
						accordance with Canadian regulations.
					</p>
				</div>
			</Container>
		</div>
	);
};

export default InsuranceServices;
