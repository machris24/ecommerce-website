import { useState, useEffect, useContext } from "react";
import { Navbar, Nav, Container, Button, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from '../../images/logo.png';
import { CgShoppingBag } from 'react-icons/cg';
import { FiSearch } from 'react-icons/fi'
import UserContext from "../../UserContext";
import '../nav/styles/NavSearch.css';


export default function NavSearch () {

    const { user, setUser } = useContext(UserContext);

    return (
            
            <Navbar expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#" className="logo">
                        <img src={Logo} alt="Logo" as={Link} to="/"/>
                        <span as={Link} to="/">DC Gadgets PH</span>
                    </Navbar.Brand>

                    
                    
                    
                    {
                        (user.isAdmin === true) ? 

                        <>
                        <Nav.Link as={Link} to="/products/add">Add New Product</Nav.Link>
                        <Nav.Link as={Link} to="">Show User Orders</Nav.Link>
                        <h3 as={Link} to="/admin">Admin</h3>
                        
                        </>
                        
                        :
                        <>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                            <Navbar.Collapse id="navbarScroll">

                                <InputGroup className="mb-2 m-auto px-2">
                                        <Form.Control
                                        placeholder="I'm looking to buy.."
                                        />
                                        <Button variant="outline-secondary" id="button-addon2" >
                                        <FiSearch />
                                        </Button>
                                </InputGroup>

                            </Navbar.Collapse>

                            <div className="cart-right px-5">
                                <Nav.Link as={Link} to='/cart'>
                                <CgShoppingBag className="cart" />
                                </Nav.Link>
                            </div>
                        </>
                    }  

                    {
                        (user.id !== null) ? 
                        <>
                            
                            <Nav.Link className="p-2" as={Link} to="/logout">Logout</Nav.Link>
                        </>
                        
                        
                        :
                        <>
                            <Nav.Link className="p-2" as={Link} to='/login'>Login</Nav.Link>
                            <Nav.Link className="p-2" as={Link} to='/signup'>Signup</Nav.Link>
                        </>
                    }
                    
                    

                </Container>
            </Navbar>
    )
}