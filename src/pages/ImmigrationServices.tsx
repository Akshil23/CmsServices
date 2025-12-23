import React, { useState, useRef } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { FaWhatsapp } from "react-icons/fa";
import "../styles/pages/ImmigrationServices.css"; // Make sure this path is correct

const DetailedImmigrationServices: React.FC = () => {
	const whatsappNumber = "16474469738"; // Standardize format without '+' for API link
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

	// Handle service button click
	const handleServiceSelection = (service: string) => {
		setUserInfo(prev => ({ ...prev, service }));
		if (formRef.current) {
			formRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	};

	// Submit via WhatsApp
	const handleWhatsAppSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		let message = `*Immigration Service Inquiry*%0A%0A*Name:* ${userInfo.name}%0A*Email:* ${userInfo.email}%0A*Selected Service:* ${userInfo.service}`;

		if (userInfo.customQuery) {
			message += `%0A*Additional Query:* ${userInfo.customQuery}`;
		}

		const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;
		window.open(whatsappLink, "_blank");
	};

	return (
		<div className="immigration-page-wrapper">
			<Container className="py-5">
				{/* HEADER SECTION */}
				<div className="text-center mb-5" data-aos="fade-up">
					<h1 className="page-title">Immigration Services</h1>
					<p className="page-subtitle">
						Expert guidance for your Canadian journey. Choose a service below to get
						started.
					</p>
				</div>

				{/* SERVICES GRID */}
				<div className="services-grid" data-aos="fade-up">
					{/* List of Services */}
					{[
						{
							title: "Study Permit Extension",
							price: "$40",
							desc: "Extend your study permit seamlessly and avoid interruptions to your education. Ideal if your permit is expiring soon.",
							value: "Study Permit Extension",
						},
						{
							title: "Temporary Resident Visa (TRV)",
							price: "$35",
							desc: "Apply for a TRV to extend your stay as a visitor, worker, or student. We ensure accurate documentation.",
							value: "Temporary Resident Visa",
						},
						{
							title: "Work Permit Application",
							price: "$40",
							desc: "Get the right work permit for your professional needs. We support PGWP, Spousal Open Work Permits, and more.",
							value: "Work Permit Application",
						},
						{
							title: "U.S. Visa Application",
							price: "$40",
							desc: "Full guidance on B1/B2 visas for travel to the USA. We assist with DS-160 forms and appointment booking.",
							value: "U.S. Visa Application",
						},
						{
							title: "Passport Renewal",
							price: "$100",
							desc: "Timely passport renewal services for all countries. Avoid travel delays with our professional help.",
							value: "Passport Renewal",
						},
						{
							title: "SIN Number Application",
							price: "$20",
							desc: "Essential for working in Canada. We help you apply for your Social Insurance Number quickly and correctly.",
							value: "SIN Number Application",
						},
						{
							title: "Baby Passport Application",
							price: "$30",
							desc: "Complete assistance for new parents applying for their baby's first passport, ensuring all strict requirements are met.",
							value: "Application for Baby Passport",
						},
						{
							title: "PR Card Renewal",
							price: "$30",
							desc: "Apply for or renew your Permanent Resident card. We help with residency obligation calculations and forms.",
							value: "PR Card Application",
						},
						{
							title: "PGWP (2+2 Strategy)",
							price: "$40",
							desc: "Assistance obtaining a 3-Year Post-Grad Work Permit for students who completed two 1-year programs.",
							value: "PGWP for Two One-Year Courses",
						},
						{
							title: "Custom Immigration Service",
							price: "From $50",
							desc: "Unique case? We offer personalized solutions for specific immigration requirements not listed here.",
							value: "Custom Immigration Service",
						},
					].map((item, index) => (
						<div className="service-card" key={index}>
							<div className="card-content">
								<h3>{item.title}</h3>
								<p className="card-desc">{item.desc}</p>
							</div>
							<div className="card-footer">
								<div className="price-tag">Fee: {item.price}</div>
								<Button
									className="select-btn"
									onClick={() => handleServiceSelection(item.value)}
								>
									Select Service
								</Button>
							</div>
						</div>
					))}
				</div>

				{/* CONTACT FORM */}
				<div className="form-container" ref={formRef} data-aos="zoom-in">
					<Row className="justify-content-center">
						<Col lg={8} md={10}>
							<div className="contact-card">
								<h2>Start Your Application</h2>
								<p className="form-desc">
									Selected Service:{" "}
									<strong>{userInfo.service || "Please select a service above"}</strong>
								</p>

								<form onSubmit={handleWhatsAppSubmit}>
									<div className="form-group">
										<label>Full Name</label>
										<input
											type="text"
											name="name"
											placeholder="Enter your name"
											className="form-control-custom"
											value={userInfo.name}
											onChange={handleInputChange}
											required
										/>
									</div>

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

									<div className="form-group">
										<label>Service Type</label>
										<select
											name="service"
											className="form-control-custom select-custom"
											value={userInfo.service}
											onChange={handleInputChange}
											required
										>
											<option value="" disabled>
												Select a Service...
											</option>
											<option value="Study Permit Extension">
												Study Permit Extension
											</option>
											<option value="Temporary Resident Visa">
												Temporary Resident Visa
											</option>
											<option value="Work Permit Application">
												Work Permit Application
											</option>
											<option value="U.S. Visa Application">U.S. Visa Application</option>
											<option value="Passport Renewal">Passport Renewal</option>
											<option value="SIN Number Application">
												SIN Number Application
											</option>
											<option value="Application for Baby Passport">
												Application for Baby Passport
											</option>
											<option value="PR Card Application">PR Card Application</option>
											<option value="PGWP for Two One-Year Courses">
												PGWP (2-Year Strategy)
											</option>
											<option value="Custom Immigration Service">
												Custom Immigration Service
											</option>
										</select>
									</div>

									<div className="form-group">
										<label>Additional Questions (Optional)</label>
										<textarea
											name="customQuery"
											rows={3}
											placeholder="Any specific details about your case?"
											className="form-control-custom"
											value={userInfo.customQuery}
											onChange={handleInputChange}
										/>
									</div>

									<Button type="submit" className="submit-btn-whatsapp">
										<FaWhatsapp className="icon" /> Request via WhatsApp
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

export default DetailedImmigrationServices;
