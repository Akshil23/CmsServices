import { Navbar, Nav, Container, Dropdown, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Home/Header.css";
import { FaChevronDown } from "react-icons/fa";

const Header: React.FC = () => {
	return (
		<Navbar expand="lg" className="header-navbar" fixed="top">
			<Container>
				{/* LOGO */}
				<Navbar.Brand href="/" className="logo-container">
					<img src="/Cms_logo.png" alt="CMS Logo" className="logo" />
				</Navbar.Brand>

				{/* CUSTOM HAMBURGER TOGGLER (3 Clean Lines) */}
				<Navbar.Toggle aria-controls="main-navbar" className="custom-toggler">
					<div className="hamburger-box">
						<span className="icon-bar top-bar"></span>
						<span className="icon-bar middle-bar"></span>
						<span className="icon-bar bottom-bar"></span>
					</div>
				</Navbar.Toggle>

				{/* NAV LINKS */}
				<Navbar.Collapse id="main-navbar">
					<Nav className="ms-auto align-items-lg-center nav-links">
						<Nav.Link href="/">Home</Nav.Link>

						{/* SERVICES DROPDOWN */}
						<Dropdown className="dropdown-custom">
							<Dropdown.Toggle
								as={Nav.Link}
								className="services-toggle d-flex align-items-center"
							>
								Services <FaChevronDown className="dropdown-icon" />
							</Dropdown.Toggle>

							<Dropdown.Menu align="end">
								<Dropdown.Item href="/tax-filing">Tax Filing</Dropdown.Item>
								<Dropdown.Item href="/immigration-services">
									Immigration Services
								</Dropdown.Item>
								<Dropdown.Divider />
								<Dropdown.Item href="/insurance">Insurance</Dropdown.Item>
								<Dropdown.Item href="/investments">Investments</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>

						<Nav.Link href="/about-us">About Us</Nav.Link>
						<Nav.Link href="/benefits-calculator">Benefits Calculator</Nav.Link>

						<Button href="/contact" className="btn-custom">
							Book Consultation
						</Button>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;
