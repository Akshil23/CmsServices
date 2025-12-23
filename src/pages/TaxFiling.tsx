import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import Link and useNavigate
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaWhatsapp } from "react-icons/fa"; // Import WhatsApp icon
import "../styles/pages/TaxFiling.css"; // Importing custom CSS for the Tax Filing Page

const TaxFilingPage: React.FC = () => {
	const navigate = useNavigate(); // Initialize useNavigate
	const [userInfo, setUserInfo] = useState({
		name: "",
		email: "",
		customQuery: "",
	});

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setUserInfo(prev => ({ ...prev, [name]: value }));
	};

	const handleServiceSelect = (service: string) => {
		setUserInfo(prev => ({
			...prev,
			customQuery: `I am interested in the ${service} service.`,
		}));
		// Scroll to the form section when a service is selected
		document.getElementById("ready-to-file")?.scrollIntoView({ behavior: "smooth" });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const whatsappNumber = "16474469738"; // Replace with your actual WhatsApp number
		const message = `Name: ${userInfo.name}%0AEmail: ${userInfo.email}${
			userInfo.customQuery ? `%0AQuery: ${userInfo.customQuery}` : ""
		}`;
		const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;
		window.open(whatsappLink, "_blank"); // Open WhatsApp in a new tab
	};

	return (
		<div className="tax-filing-page">
			<Container data-aos="fade-up">
				{/* Page Title & Description */}
				<Row className="justify-content-center text-center">
					<Col lg={10}>
						<h1 className="page-title">Expert Tax Filing Services</h1>
						<p className="description">
							We provide efficient and professional tax filing services tailored to
							maximize your refunds and ensure compliance. Whether you're an individual, a
							newcomer, self-employed, or a corporation, our expert team simplifies the
							process for you.
						</p>
					</Col>
				</Row>

				{/* Informative Sections */}
				<div className="info-sections">
					<div className="info-item">
						<h2>Newcomer & Individual Benefits</h2>
						<ul>
							<li>
								<strong>Canada Child Benefit (CCB):</strong> Tax-free monthly support for
								families.
							</li>
							<li>
								<strong>GST/HST Credit:</strong> Quarterly payments to offset tax.
							</li>
							<li>
								<strong>Canada Workers Benefit (CWB):</strong> Refundable credit for
								low-income workers.
							</li>
							<li>
								<strong>Ontario Trillium Benefit (OTB):</strong> Credits for energy,
								property, and sales tax.
							</li>
							<li>
								<strong>Provincial Child Benefits:</strong> Tailored support like BC
								Family, Alberta ACFB, etc.
							</li>
							<li>
								<strong>Tuition Tax Credits:</strong> Reduce tax owed for education
								expenses.
							</li>
							<li>
								<strong>Housing Support & Settlement:</strong> Assistance programs for new
								residents.
							</li>
						</ul>
					</div>

					<div className="info-item">
						<h2>Maximize Savings & Investments</h2>
						<ul>
							<li>
								<strong>Tax-Free Savings Account (TFSA):</strong> Grow savings tax-free
								for any goal.
							</li>
							<li>
								<strong>Registered Education Savings Plan (RESP):</strong> Government
								grants up to $7,200 for education.
							</li>
							<li>
								<strong>First Home Savings Account (FHSA):</strong> Tax-deductible savings
								for first-time buyers.
							</li>
							<li>
								<strong>Registered Retirement Savings Plan (RRSP):</strong> Tax-deferred
								growth for retirement.
							</li>
							<li>
								<strong>Employer Matching:</strong> Leverage workplace programs for
								growth.
							</li>
							<li>
								<strong>Automatic Savings:</strong> Build wealth consistently without
								manual effort.
							</li>
							<li>
								<strong>Guaranteed Investment Certificates (GICs):</strong> Secure,
								low-risk savings.
							</li>
						</ul>
					</div>
				</div>

				{/* Newcomer Benefits Call to Action */}
				<div className="next-page-button-container text-center">
					<Button
						className="next-page-button"
						onClick={() => navigate("/benefits-calculator")} // Using navigate here
					>
						Calculate Your Potential Benefits
					</Button>
				</div>

				{/* Core Services & Pricing List */}
				<h2 className="section-heading text-center mt-5">Our Tax Filing Packages</h2>
				<div className="services-list">
					<div className="service-item">
						<h2>Individual Tax Filing</h2>
						<p className="package-description">
							Comprehensive tax preparation for single filers, maximizing deductions.
						</p>
						<p className="price">
							Starting from <span className="price-tag">$30</span>
						</p>
						<Button
							className="select-service-button"
							onClick={() => handleServiceSelect("Individual Tax Filing")}
						>
							Select this service
						</Button>
					</div>
					<div className="service-item">
						<h2>Family Tax Filing</h2>
						<p className="package-description">
							Efficient joint filing for couples and families to ensure combined benefits.
						</p>
						<p className="price">
							Starting from <span className="price-tag">$70</span>
						</p>
						<Button
							className="select-service-button"
							onClick={() => handleServiceSelect("Family Tax Filing")}
						>
							Select this service
						</Button>
					</div>
					<div className="service-item">
						<h2>Self-Employed Tax Filing</h2>
						<p className="package-description">
							Specialized support for freelancers and contractors to handle unique income
							and expenses.
						</p>
						<p className="price">
							Starting from <span className="price-tag">$40</span>
						</p>
						<Button
							className="select-service-button"
							onClick={() => handleServiceSelect("Self-Employed Tax Filing")}
						>
							Select this service
						</Button>
					</div>
					<div className="service-item">
						<h2>Group Discounted Filing</h2>
						<p className="package-description">
							Savings for groups of 4 or more, ideal for teams or organizations.
						</p>
						<p className="price">
							Starting from <span className="price-tag">$25</span> per person
						</p>
						<Button
							className="select-service-button"
							onClick={() => handleServiceSelect("Group Discounted Tax Filing")}
						>
							Select this service
						</Button>
					</div>
					<div className="service-item">
						<h2>Corporate Tax Filing (T2)</h2>
						<p className="package-description">
							Expert T2 tax preparation for corporations to ensure full compliance and
							optimization.
						</p>
						<p className="price">
							Starting from <span className="price-tag">$150</span>
						</p>
						<Button
							className="select-service-button"
							onClick={() => handleServiceSelect("Corporate Tax Filing")}
						>
							Select this service
						</Button>
					</div>
					<div className="service-item">
						<h2>Non-Profit Tax Filing</h2>
						<p className="package-description">
							Specialized filing for non-profit organizations, maintaining charity status.
						</p>
						<p className="price">
							Starting from <span className="price-tag">$100</span>
						</p>
						<Button
							className="select-service-button"
							onClick={() => handleServiceSelect("Non-Profit Tax Filing")}
						>
							Select this service
						</Button>
					</div>
				</div>

				{/* Contact Form */}
				<form className="user-info-form" data-aos="zoom-in" onSubmit={handleSubmit}>
					<h2 id="ready-to-file">Ready To File? Get Started Today!</h2>
					<p className="form-sub-text">
						Fill out your details below and reach out to us directly via WhatsApp for
						quick assistance.
					</p>
					<input
						type="text"
						name="name"
						placeholder="Your Full Name"
						value={userInfo.name}
						onChange={handleInputChange}
						required
					/>
					<input
						type="email"
						name="email"
						placeholder="Your Email Address"
						value={userInfo.email}
						onChange={handleInputChange}
						required
					/>
					<textarea
						name="customQuery"
						placeholder="Tell us about your specific needs or chosen service (optional)"
						value={userInfo.customQuery}
						onChange={handleInputChange}
						rows={4}
					/>
					<Button type="submit" className="whatsapp-button">
						<FaWhatsapp className="me-2" /> Send via WhatsApp
					</Button>
				</form>
			</Container>
		</div>
	);
};

export default TaxFilingPage;
