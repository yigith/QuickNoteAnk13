import { Container, Navbar } from "react-bootstrap";

export default function NavigationBar() {
    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        alt=""
                        src="/logo.png"
                        height="24"
                        className="d-inline-block align-top"
                    />{' '}
                    Quick Note
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}