import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Home/HeroSection.css';

const HeroSection = () => {
  return (
    <section
      className="hero d-flex align-items-center justify-content-center text-center text-white"
      data-aos="fade-out"
    >
      <div className="hero-content">
        <h1 className="display-5"><b>ALLOW PROFESSIONALS TO GUIDE YOU</b></h1>
        <br />
        {/* Call Us Now Button */}
        <a href="tel:+16474469738" className="btn btn-primary mt-3 call-us-button">
          Call Us Now
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
