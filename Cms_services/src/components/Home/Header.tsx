import { Navbar, Nav, Container, Button, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Home/Header.css";

const Header = () => {
	return (
		<Navbar bg="white" expand="lg" className="header">
			<Container>
				<Navbar.Brand href="/">
					<img
						src="/Cms_logo.png"
						alt="Logo"
						className="d-inline-block align-top logo"
					/>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
					<Nav className="mx-auto nav-center">
						<Nav.Link href="/" className="mx-3 nav-link">
							HOME
						</Nav.Link>
						<Dropdown className="mx-3 dropdown-custom">
							<Dropdown.Toggle variant="link" id="dropdown-services" className="nav-link">
								SERVICES
							</Dropdown.Toggle>

							<Dropdown.Menu>
								<Dropdown.Item href="/tax-filing">Tax Filing</Dropdown.Item>
								<Dropdown.Item href="/immigration-services">Immigration Services</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
						<Nav.Link href="/about-us" className="mx-3 nav-link nav-large">
							ABOUT US
						</Nav.Link>

						
					</Nav>
				</Navbar.Collapse>
				<Navbar.Brand href="/">
					<img
						src="/logo2.jpeg"
						alt="Logo2"
						className="d-inline-block align-right logo"
					/>
				</Navbar.Brand>
			</Container>
		</Navbar>
	);
};

export default Header;
