import React, { useState, useRef } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import {
	FaWhatsapp,
	FaChartLine,
	FaPiggyBank,
	FaHome,
	FaGraduationCap,
	FaShieldAlt,
	FaHandHoldingUsd,
} from "react-icons/fa";
import "../styles/pages/InvestmentServices.css"; // Importing custom CSS

const DetailedInvestmentServices: React.FC = () => {
	const whatsappNumber = "16474469738";
	const [userInfo, setUserInfo] = useState({
		name: "",
		email: "",
		service: "",
		customQuery: "",
	});

	const formRef = useRef<HTMLDivElement>(null);

	// Handle input change
	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setUserInfo(prev => ({ ...prev, [name]: value }));
	};

	// Handle service button click (Selects service + Scrolls to form)
	const handleServiceSelection = (serviceTitle: string) => {
		setUserInfo(prev => ({ ...prev, service: serviceTitle }));
		if (formRef.current) {
			formRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	};

	// Submit via WhatsApp
	const handleWhatsAppSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		let message = `*Investment Service Inquiry*%0A%0A*Name:* ${userInfo.name}%0A*Email:* ${userInfo.email}%0A*Interested In:* ${userInfo.service}`;

		if (userInfo.customQuery) {
			message += `%0A*Specific Goal/Query:* ${userInfo.customQuery}`;
		}

		const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;
		window.open(whatsappLink, "_blank");
	};

	const services = [
		{
			icon: <FaChartLine />,
			title: "TFSA (Tax-Free Savings Account)",
			subtitle: "Grow Your Money Tax-Free",
			desc: "An essential account for every Canadian. Investment income, dividends, and capital gains earned in a TFSA are 100% tax-free. We help you open and maximize this account for short or long-term goals.",
		},
		{
			icon: <FaHandHoldingUsd />,
			title: "RRSP (Registered Retirement Savings)",
			subtitle: "Save for Retirement & Reduce Tax",
			desc: "Contributions are tax-deductible, lowering your income tax bill today while saving for tomorrow. We guide you on contribution limits and the best investment mix for retirement.",
		},
		{
			icon: <FaHome />,
			title: "FHSA (First Home Savings Account)",
			subtitle: "Buy Your First Home Faster",
			desc: "The best of both worlds: Tax deductions on contributions (like RRSP) and tax-free withdrawals for your home purchase (like TFSA). A must-have for aspiring homeowners.",
		},
		{
			icon: <FaGraduationCap />,
			title: "RESP (Registered Education Savings)",
			subtitle: "Free Government Grants for Kids",
			desc: "Save for your child's education and receive the CESG (Canada Education Savings Grant). The government adds 20% to your contributions, up to $7,200 lifetime per child.",
		},
		{
			icon: <FaShieldAlt />,
			title: "Segregated Funds & GICs",
			subtitle: "Secure & Guaranteed Growth",
			desc: "Ideal for conservative investors. Guaranteed Investment Certificates (GICs) offer fixed returns, while Segregated Funds provide estate planning benefits and creditor protection.",
		},
		{
			icon: <FaPiggyBank />,
			title: "Non-Registered Investments",
			subtitle: "Unlimited Investment Potential",
			desc: "Maxed out your registered accounts? We help you build a tax-efficient non-registered portfolio with access to stocks, ETFs, and mutual funds tailored to your risk profile.",
		},
	];

	return (
		<div className="investment-page-wrapper">
			<Container className="py-5">
				{/* HERO SECTION */}
				<div className="text-center mb-5" data-aos="fade-up">
					<h1 className="page-title">Investment & Wealth Planning</h1>
					<p className="page-subtitle">
						Secure your financial future with tailored Canadian investment strategies.
						From tax-free growth to retirement planning, we guide you every step of the
						way.
					</p>
				</div>

				{/* INFO BOX */}
				<div className="intro-card mb-5" data-aos="fade-up">
					<Row className="align-items-center">
						<Col md={12} lg={10} className="mx-auto text-center">
							<h3>Why Invest With CMS Services?</h3>
							<p>
								Navigating Canada's financial landscape can be complex. We analyze your
								tax situation, income, and goals to recommend the
								<strong> exact accounts (TFSA vs RRSP vs FHSA)</strong> that will save you
								money and build wealth. We believe in low-fee, high-efficiency strategies.
							</p>
						</Col>
					</Row>
				</div>

				{/* SERVICES GRID */}
				<div className="investment-grid" data-aos="fade-up">
					{services.map((item, index) => (
						<div className="invest-card" key={index}>
							<div className="icon-wrapper">{item.icon}</div>
							<div className="card-content">
								<h3>{item.title}</h3>
								<span className="badge-subtitle">{item.subtitle}</span>
								<p className="card-desc">{item.desc}</p>
							</div>
							<Button
								className="invest-select-btn"
								onClick={() => handleServiceSelection(item.title)}
							>
								Start This Plan
							</Button>
						</div>
					))}
				</div>

				{/* CONTACT FORM */}
				<div className="form-container" ref={formRef} data-aos="zoom-in">
					<Row className="justify-content-center">
						<Col lg={8} md={10}>
							<div className="contact-card">
								<h2>Plan Your Financial Future</h2>
								<p className="form-desc">
									Selected Interest:{" "}
									<strong>{userInfo.service || "General Investment Inquiry"}</strong>
								</p>

								<form onSubmit={handleWhatsAppSubmit}>
									<Row>
										<Col md={6}>
											<div className="form-group">
												<label>Full Name</label>
												<input
													type="text"
													name="name"
													placeholder="Your name"
													className="form-control-custom"
													value={userInfo.name}
													onChange={handleInputChange}
													required
												/>
											</div>
										</Col>
										<Col md={6}>
											<div className="form-group">
												<label>Email Address</label>
												<input
													type="email"
													name="email"
													placeholder="name@example.com"
													className="form-control-custom"
													value={userInfo.email}
													onChange={handleInputChange}
													required
												/>
											</div>
										</Col>
									</Row>

									<div className="form-group">
										<label>Area of Interest</label>
										<select
											name="service"
											className="form-control-custom select-custom"
											value={userInfo.service}
											onChange={handleInputChange}
											required
										>
											<option value="" disabled>
												Select a Plan...
											</option>
											<option value="TFSA (Tax-Free Savings)">
												TFSA (Tax-Free Savings)
											</option>
											<option value="RRSP (Retirement)">RRSP (Retirement Plan)</option>
											<option value="FHSA (First Home)">FHSA (First Home Account)</option>
											<option value="RESP (Education)">RESP (Child Education)</option>
											<option value="Segregated Funds & GICs">
												Segregated Funds & GICs
											</option>
											<option value="Non-Registered Investments">
												Non-Registered Investments
											</option>
											<option value="Financial Planning General">
												General Financial Planning
											</option>
										</select>
									</div>

									<div className="form-group">
										<label>Specific Goals or Questions (Optional)</label>
										<textarea
											name="customQuery"
											rows={3}
											placeholder="e.g. Saving for a house in 2 years, Planning for retirement..."
											className="form-control-custom"
											value={userInfo.customQuery}
											onChange={handleInputChange}
										/>
									</div>

									<Button type="submit" className="submit-btn-whatsapp">
										<FaWhatsapp className="icon" /> Consult via WhatsApp
									</Button>
								</form>
							</div>
						</Col>
					</Row>
				</div>
			</Container>
		</div>
	);
};

export default DetailedInvestmentServices;
