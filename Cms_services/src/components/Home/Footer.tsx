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
	const currentYear = new Date().getFullYear();

	return (
		<footer className="site-footer">
			<Container>
				<div className="footer-content-wrapper">
					<Row>
						{/* COLUMN 1: Brand Info */}
						<Col lg={4} md={12} className="footer-section mb-4">
							<div className="brand-area">
								<h3 className="brand-title">CMS SERVICES</h3>
								<p className="brand-desc">
									Providing professional Tax Filing, Insurance, Immigration, and
									Investment solutions. We make complex financial and legal processes
									simple for you.
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
							</div>
						</Col>

						{/* COLUMN 2: Our Services (SEO Links) */}
						<Col lg={3} md={6} sm={6} className="footer-section mb-4">
							<h4 className="section-title">Our Services</h4>
							<ul className="footer-list">
								<li>
									<a href="/tax-filing">
										<FaChevronRight className="bullet" /> Tax Filing
									</a>
								</li>
								<li>
									<a href="/immigration-services">
										<FaChevronRight className="bullet" /> Immigration
									</a>
								</li>
								<li>
									<a href="/insurance">
										<FaChevronRight className="bullet" /> Insurance
									</a>
								</li>
								<li>
									<a href="/investments">
										<FaChevronRight className="bullet" /> Investments
									</a>
								</li>
							</ul>
						</Col>

						{/* COLUMN 3: Contact Info (Local SEO) */}
						<Col lg={5} md={6} sm={12} className="footer-section mb-4">
							<h4 className="section-title">Contact Us</h4>
							<div className="contact-details">
								<a
									className="contact-row"
									href="https://maps.app.goo.gl/j99dZdqU66HSiUXX6"
									target="_blank"
									rel="noopener noreferrer"
								>
									<FaMapMarkerAlt className="icon-main" />
									<span>Based in Brampton, Serving All Canada</span>
								</a>

								<a className="contact-row" href="tel:+17533816665">
									<FaPhoneAlt className="icon-main" />
									<span>+1 (753) 381-6665</span>
								</a>

								<a className="contact-row" href="mailto:cmsservices10@gmail.com">
									<FaEnvelope className="icon-main" />
									<span>cmsservices10@gmail.com</span>
								</a>
							</div>
						</Col>
					</Row>
				</div>
			</Container>

			{/* Copyright Bar */}
			<div className="copyright-bar">
				<Container className="text-center">
					<p>&copy; {currentYear} CMS Services. All Rights Reserved.</p>
				</Container>
			</div>
		</footer>
	);
};

export default Footer;
