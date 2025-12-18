import { Navbar, Nav, Container, Dropdown, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Home/Header.css";
import { FaChevronDown } from "react-icons/fa";

const Header: React.FC = () => {
	return (
		<Navbar expand="lg" className="header-navbar" sticky="top">
			<Container>
				{/* LOGO */}
				<Navbar.Brand href="/" className="logo-container">
					<img src="/Cms_logo.png" alt="CMS Logo" className="logo" />
				</Navbar.Brand>

				{/* COMPACT TOGGLER */}
				<Navbar.Toggle aria-controls="main-navbar" className="custom-toggler" />

				{/* NAV */}
				<Navbar.Collapse id="main-navbar">
					<Nav className="mx-auto align-items-lg-center nav-links">
						<Nav.Link href="/">Home</Nav.Link>

						{/* SERVICES DROPDOWN */}
						<Dropdown className="dropdown-custom">
							<Dropdown.Toggle as={Nav.Link} className="services-toggle">
								Services <FaChevronDown className="dropdown-icon" />
							</Dropdown.Toggle>

							<Dropdown.Menu>
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
