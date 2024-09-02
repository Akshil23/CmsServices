import React from "react";
import { Navbar, Nav, Container, Button, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Home/Header.css";

const Header = () => {
	return (
		<Navbar bg="white" expand="lg" className="header">
			<Container>
				<Navbar.Brand href="/">
					<img
						src="/logo.jpg"
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
    <Dropdown.Toggle 
        variant="link" 
        id="dropdown-services" 
        className="nav-link">
        SERVICES
    </Dropdown.Toggle>

    <Dropdown.Menu>
        <Dropdown.Item href="/pages/TaxFiling">
            Tax Filing
        </Dropdown.Item>
        <Dropdown.Item href="/services/immigration">
            Immigration Services
        </Dropdown.Item>
    </Dropdown.Menu>
	</Dropdown>
						<Nav.Link href="/about" className="mx-3 nav-link">
							ABOUT US
						</Nav.Link>
					
					<Nav.Link href="/" className="mx-3 nav-link">
							CONTACT US
						</Nav.Link></Nav>
					<Button variant="secondary" className="ml-lg-3 btn-custom">
						GET A FREE QUOTE
					</Button>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;
