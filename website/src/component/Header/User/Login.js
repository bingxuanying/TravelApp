import React, {useState}from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../HeaderNav/HeaderNav.css";
import {Navbar, Nav, Modal, Button} from 'react-bootstrap';

function Login() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Nav.Link href="#Login">
                <a id="Help-buttom" size="lg" variant="outline-dark" onClick={handleShow}>
                    Login
                </a>
            </Nav.Link>
            <Modal show={show} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>This is the login Page</Modal.Body>
            </Modal>
        </>
    );
}

export default Login;