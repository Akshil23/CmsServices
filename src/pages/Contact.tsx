import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
	FaPhoneAlt,
	FaEnvelope,
	FaMapMarkerAlt,
	FaWhatsapp,
	FaClock,
} from "react-icons/fa";
import "../styles/pages/Contact.css";

const Contact: React.FC = () => {
	const whatsappNumber = "17533816665"; // Your Business WhatsApp

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		service: "",
		message: "",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Construct WhatsApp Message
		const text = `*New Contact Inquiry*%0A%0A*Name:* ${formData.name}%0A*Email:* ${
			formData.email
		}%0A*Phone:* ${formData.phone}%0A*Service:* ${
			formData.service || "General Inquiry"
		}%0A%0A*Message:* ${formData.message}`;

		const url = `https://wa.me/${whatsappNumber}?text=${text}`;
		window.open(url, "_blank");
	};

	return (
		<div className="contact-page-wrapper">
			<Container>
				{/* HEADER */}
				<div className="text-center mb-5" data-aos="fade-up">
					<h1 className="page-title">Get In Touch</h1>
					<p className="page-subtitle">
						Have questions about your Taxes, Visa application, or Insurance? We are here
						to help. Reach out to us directly or fill the form below.
					</p>
				</div>

				<Row className="g-5">
					{/* LEFT COLUMN: CONTACT INFO & MAP */}
					<Col lg={5} data-aos="fade-right">
						{/* Contact Info Card */}
						<div className="contact-info-card">
							<h3>Contact Details</h3>
							<p className="mb-4 text-muted">We respond quickly during business hours.</p>

							<div className="info-item">
								<div className="icon-box">
									<FaPhoneAlt />
								</div>
								<div>
									<h5>Call Us</h5>
									<a href="tel:+17533816665" className="contact-link">
										+1 (753) 381-6665
									</a>
								</div>
							</div>

							<div className="info-item">
								<div className="icon-box">
									<FaWhatsapp />
								</div>
								<div>
									<h5>WhatsApp</h5>
									<a
										href={`https://wa.me/${whatsappNumber}`}
										target="_blank"
										rel="noreferrer"
										className="contact-link"
									>
										Chat with us directly
									</a>
								</div>
							</div>

							<div className="info-item">
								<div className="icon-box">
									<FaEnvelope />
								</div>
								<div>
									<h5>Email Us</h5>
									<a href="mailto:cmsservices10@gmail.com" className="contact-link">
										cmsservices10@gmail.com
									</a>
								</div>
							</div>

							<div className="info-item">
								<div className="icon-box">
									<FaClock />
								</div>
								<div>
									<h5>Business Hours</h5>
									<p className="mb-0">Mon - Fri: 9:00 AM - 7:00 PM</p>
									<p className="mb-0">Sat - Sun: By Appointment</p>
								</div>
							</div>

							<div className="info-item">
								<div className="icon-box">
									<FaMapMarkerAlt />
								</div>
								<div>
									<h5>Our Location</h5>
									<p className="mb-0">Brampton, Ontario</p>
									<p className="mb-0 text-muted small">(Serving Clients Across Canada)</p>
								</div>
							</div>
						</div>

						{/* Google Map */}
						<div className="map-container mt-4">
							<iframe
								title="CMS Services Location"
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d92383.05141042735!2d-79.76189914999999!3d43.6853247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b15aa0f316987%3A0x651639d73d636c7a!2sBrampton%2C%20ON!5e0!3m2!1sen!2sca!4v1714243644265!5m2!1sen!2sca"
								width="100%"
								height="300"
								style={{ border: 0, borderRadius: "15px" }}
								allowFullScreen={true}
								loading="lazy"
							></iframe>
						</div>
					</Col>

					{/* RIGHT COLUMN: CONTACT FORM */}
					<Col lg={7} data-aos="fade-left">
						<div className="contact-form-wrapper">
							<h2>Send a Message</h2>
							<p className="text-muted mb-4">
								Select a topic so we can connect you with the right expert.
							</p>

							<form onSubmit={handleSubmit}>
								<Row>
									<Col md={6}>
										<div className="form-group">
											<label>Your Name</label>
											<input
												type="text"
												name="name"
												className="form-control-styled"
												placeholder="John Doe"
												onChange={handleChange}
												required
											/>
										</div>
									</Col>
									<Col md={6}>
										<div className="form-group">
											<label>Phone Number</label>
											<input
												type="tel"
												name="phone"
												className="form-control-styled"
												placeholder="(123) 456-7890"
												onChange={handleChange}
											/>
										</div>
									</Col>
								</Row>

								<div className="form-group">
									<label>Email Address</label>
									<input
										type="email"
										name="email"
										className="form-control-styled"
										placeholder="email@example.com"
										onChange={handleChange}
										required
									/>
								</div>

								<div className="form-group">
									<label>Topic</label>
									<select
										name="service"
										className="form-control-styled select-arrow"
										onChange={handleChange}
										required
										defaultValue=""
									>
										<option value="" disabled>
											How can we help you?
										</option>
										<option value="Tax Filing">Tax Filing / Tax Returns</option>
										<option value="Immigration">Immigration / Visas / Permits</option>
										<option value="Insurance">
											Insurance Quote (Life/Auto/Super Visa)
										</option>
										<option value="Investment">Investments / TFSA / RRSP</option>
										<option value="General">Other / General Inquiry</option>
									</select>
								</div>

								<div className="form-group">
									<label>Message</label>
									<textarea
										name="message"
										rows={5}
										className="form-control-styled"
										placeholder="Tell us a bit more about your requirements..."
										onChange={handleChange}
										required
									></textarea>
								</div>

								<Button type="submit" className="submit-btn">
									Send Message
								</Button>

								<div className="mt-4 text-center">
									<p className="text-muted small">
										We respect your privacy. Your information is never shared.
									</p>
								</div>
							</form>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Contact;
