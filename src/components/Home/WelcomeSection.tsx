import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "../../styles/HomeStyles.css";
import Cms_logo from "/Cms_logo.png"; // Update path if needed

const WelcomeSection: React.FC = () => {
	return (
		<section className="section-padding bg-white">
			<Container>
				{/* Intro Block */}
				<Row className="justify-content-center text-center mb-5">
					<Col lg={10}>
						<h2 className="welcome-title">Welcome to CMS Services</h2>
						<p className="text-muted lead">
							At CMS Services, we are dedicated to streamlining your{" "}
							<span className="text-highlight fw-bold">
								financial and legal procedures
							</span>
							. Our expert team provides comprehensive support for Tax Filing,
							Immigration, Insurance, and Investment needs across Canada.
						</p>
					</Col>
				</Row>

				{/* Services Split - Converted to Grid */}
				<Row className="g-4 mb-5">
					{/* Tax Filing Column */}
					<Col md={6}>
						<div className="service-card">
							<div className="service-header">
								<h2>Tax Filing Maximization</h2>
							</div>
							<ul className="benefits-list">
								<li>
									<b>Newcomer Benefits:</b> $2,200 - $3,500 refund eligibility.
								</li>
								<li>
									<b>Carbon Rebate:</b> Get $600 to $950 offset credits.
								</li>
								<li>
									<b>GST/HST Credit:</b> Receive quarterly payments up to $530.
								</li>
								<li>
									<b>Ontario Trillium (OTB):</b> Benefit up to $900 annually.
								</li>
								<li>
									<b>Tuition Credits:</b> Claim 15% of tuition to reduce tax payable.
								</li>
								<li>
									<b>Business & Corp:</b> Full T2 Corporate filing support.
								</li>
							</ul>
							<div className="text-center mt-3">
								<Link to="/tax-filing" className="btn-service">
									Explore Tax Services
								</Link>
							</div>
						</div>
					</Col>

					{/* Immigration Column */}
					<Col md={6}>
						<div className="service-card">
							<div className="service-header">
								<h2>Immigration Solutions</h2>
							</div>
							<ul className="benefits-list">
								<li>
									<b>Work Permits:</b> Post-Grad (PGWP) & Spousal Open Work Permits.
								</li>
								<li>
									<b>Visa Extensions:</b> Study Bridges and Visitor Records.
								</li>
								<li>
									<b>PR Applications:</b> Express Entry & PNP guidance.
								</li>
								<li>
									<b>Visitor Visas:</b> TRV for family visits or tourism.
								</li>
								<li>
									<b>US Visa:</b> B1/B2 Travel application assistance.
								</li>
								<li>
									<b>Citizenship:</b> Complete support for your Canadian journey.
								</li>
							</ul>
							<div className="text-center mt-3">
								<Link to="/immigration-services" className="btn-service">
									View Immigration Services
								</Link>
							</div>
						</div>
					</Col>
				</Row>

				{/* Why Choose Us & CTA */}
				<Row className="align-items-center mt-5">
					<Col md={8}>
						<h3 className="fw-bold mb-3" style={{ color: "#852085" }}>
							Why Choose Us?
						</h3>
						<p className="text-secondary">
							With years of experience and a commitment to excellence, CMS Services acts
							as your dedicated partner. We don't just file forms; we strategize to
							maximize your returns and success rates.
						</p>
						<h3 className="fw-bold mb-3 mt-4" style={{ color: "#852085" }}>
							Get Started Today
						</h3>
						<p className="text-secondary">
							Let us achieve peace of mind for you. Stop worrying about CRA audits or IRCC
							deadlines.
						</p>
						<Link to="/contact" className="btn-hero mt-3">
							Book A Consultation
						</Link>
					</Col>
					<Col md={4} className="text-center d-none d-md-block">
						{/* Logo serves as a trust seal here */}
						<img
							src={Cms_logo}
							alt="CMS Services Trusted Brand"
							style={{ maxWidth: "100%", height: "auto", maxHeight: "200px" }}
						/>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default WelcomeSection;
