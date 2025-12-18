import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
	FaInstagram,
	FaEnvelope,
	FaPhoneAlt,
	FaMapMarkerAlt,
	FaChevronRight,
	FaWhatsapp,
} from "react-icons/fa";
import "../../styles/Home/Footer.css";

const Footer: React.FC = () => {
	const year = new Date().getFullYear();

	return (
		<footer className="site-footer">
			<Container>
				<Row className="footer-content">
					{/* BRAND */}
					<Col lg={4} md={12} className="footer-section">
						<h3 className="brand-title">CMS Services</h3>
						<p className="brand-desc">
							Professional Tax Filing, Insurance, Immigration, and Investment services
							across Canada. Trusted, reliable, and client-focused.
						</p>

						<div className="social-icons">
							<a
								href="https://www.instagram.com/Cms_services.23"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Instagram"
							>
								<FaInstagram />
							</a>
							<a
								href="https://wa.me/17533816665"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="WhatsApp"
							>
								<FaWhatsapp />
							</a>
						</div>
					</Col>

					{/* SERVICES */}
					<Col lg={3} md={6} sm={6} className="footer-section">
						<h4 className="section-title">Our Services</h4>
						<ul className="footer-list">
							<li>
								<a href="/tax-filing">
									<FaChevronRight /> Tax Filing
								</a>
							</li>
							<li>
								<a href="/immigration-services">
									<FaChevronRight /> Immigration
								</a>
							</li>
							<li>
								<a href="/insurance">
									<FaChevronRight /> Insurance
								</a>
							</li>
							<li>
								<a href="/investments">
									<FaChevronRight /> Investments
								</a>
							</li>
						</ul>
					</Col>

					{/* CONTACT */}
					<Col lg={5} md={6} className="footer-section">
						<h4 className="section-title">Contact</h4>
						<div className="contact-details">
							<a
								href="https://maps.app.goo.gl/j99dZdqU66HSiUXX6"
								target="_blank"
								rel="noopener noreferrer"
								className="contact-row"
							>
								<FaMapMarkerAlt />
								<span>Brampton, Serving All Canada</span>
							</a>

							<a href="tel:+17533816665" className="contact-row">
								<FaPhoneAlt />
								<span>+1 (753) 381-6665</span>
							</a>

							<a href="mailto:cmsservices10@gmail.com" className="contact-row">
								<FaEnvelope />
								<span>cmsservices10@gmail.com</span>
							</a>
						</div>
					</Col>
				</Row>
			</Container>

			{/* COPYRIGHT */}
			<div className="copyright-bar">
				<Container>
					<p>© {year} CMS Services. All Rights Reserved.</p>
				</Container>
			</div>
		</footer>
	);
};

export default Footer;
