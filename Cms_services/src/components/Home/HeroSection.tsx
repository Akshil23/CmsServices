import "../../styles/HomeStyles.css";

const HeroSection = () => {
	return (
		<section className="hero-section">
			<div className="hero-overlay"></div>
			<div className="hero-content">
				{/* SEO: H1 Keyword Rich */}
				<h1 className="hero-title">
					ALLOW <span style={{ color: "#fd851d" }}>PROFESSIONALS</span>
					<br />
					TO GUIDE YOU
				</h1>
				<p className="hero-subtitle text-white">
					Expert Tax Filing, Immigration Services, Insurance & Investments.{" "}
					<br className="d-none d-md-block" />
					Serving Brampton & All of Canada.
				</p>

				{/* Call Action Button */}
				<a href="tel:+16474469738" className="btn-hero">
					Call For Consultation
				</a>
			</div>
		</section>
	);
};

export default HeroSection;
