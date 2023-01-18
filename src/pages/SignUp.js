// Import Dependencies/Modules
import { useState, useEffect, useContext } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Navigate, useNavigate, Link } from "react-router-dom";
import Swal from 'sweetalert2';
import UserContext from "../UserContext";

// Import assets
import { CgMail, CgKey, CgSmileMouthOpen, CgQuote } from 'react-icons/cg';
import { GoDeviceMobile } from 'react-icons/go'
import Login from '../images/Login.svg'
import './styles/SignUp.css';

export default function SignUp() {

    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    const [isActive, setIsActive] = useState(false);

    console.log(firstName)
    console.log(lastName)
    console.log(email)
    console.log(username)
    console.log(mobileNo)
    console.log(mobileNo.length)
    console.log(email)
    console.log(password1)
    console.log(password2)

    // ******FUNCTION******

    function signupUser (e) {

		e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/users/checkEmail`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)

			if (data === true) {

				Swal.fire({
					title: "Duplicate Email Found",
					icon: "error",
					text: "Kindly provide another email to complete registration."
				})
			} else {

                fetch(`${process.env.REACT_APP_API_URL}/users/signup`, {
					method: "POST",
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						firstName: firstName,
						lastName: lastName,
						email: email,
                        username: username,
						mobileNo: mobileNo,
						password: password1
					})
				})
				.then(res => res.json())
				.then(data => {
					console.log(data)

					if(data === true) {

						// Clear input fields
						setFirstName("");
						setLastName("")
						setEmail("");
						setMobileNo("");
						setPassword1("");
						setPassword2("");
                        setUsername("");

						Swal.fire({
							title: "Registration Successful",
							icon: "success",
							text: "Happy Shopping!!"
						})

						navigate("/login");

					} else {

						Swal.fire({
							title: "Something went wrong",
							icon: "error",
							text: "Please, try again."
						})
					}

				})    

            }
        
        })
	
	};

    useEffect(() => {
        if((email !== "" && password1 !== "" && password2 !== "" && firstName !== "" && lastName !== "" && username !== "" && mobileNo.length === 11) && ( password1 === password2)) {

            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }, [email, password1, password2, firstName, lastName, mobileNo, username]);

    return (

        // (user.id !== null) ? 
  
        //     <Navigate to="/courses" />
        //     :
            <Container className="signup-wrapper">
                <Form className="signupForm" onSubmit={e => signupUser(e)}>

                    <h1 className="hi"> Signup </h1>

                    <Form.Group className="input mb-3" controlId="formField">
                        <span>
                            <span>
                                <CgQuote className="icon" size={20}/>
                                <Form.Control 
                                    type="text" 
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                />
                            </span>
                        </span>
                    </Form.Group>

                    <Form.Group className="input mb-3" controlId="formField">
                        <span>
                            <span>
                                <CgQuote className="icon" size={20}/>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
                                />
                            </span>
                        </span> 
                    </Form.Group>

                    <Form.Group className="input mb-3" controlId="formField">
                        <span>
                            <span>
                                <GoDeviceMobile className="icon" size={20}/>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Mobile Number"
                                    value={mobileNo}
                                    onChange={e => setMobileNo(e.target.value)}
                                />
                            </span>
                        </span> 
                    </Form.Group>

                    <Form.Group className="input mb-3" controlId="formField">
                        <span>
                            <span>
                                <CgMail className="icon" size={20}/>
                                <Form.Control 
                                    type="email" 
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </span>
                        </span>      
                    </Form.Group>

                    <Form.Group className="input mb-3" controlId="formField">
                        <span>
                            <span>
                                <CgSmileMouthOpen className="icon" size={20}/>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Username"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                />
                            </span>
                        </span>                           
                    </Form.Group>

                    <Form.Group className="input mb-3" controlId="formField">
                        <span>
                            <span>
                                <CgKey className="icon" size={20}/>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Password"
                                    value={password1}
                                    onChange={e => setPassword1(e.target.value)}
                                />
                            </span>
                        </span>
                    </Form.Group>

                    <Form.Group className="input mb-3" controlId="formField">
                        <span>
                            <span>
                            <CgKey className="icon" size={20}/>
                            <Form.Control 
                                type="password" 
                                placeholder="Verify Password"
                                value={password2}
                                onChange={e => setPassword2(e.target.value)}
                            />
                            </span>
                        </span>
                    </Form.Group>
                    

                    {
                        isActive ?
                            <Button className="btnlogin" variant="primary" type="submit">
                                Let's go shop!
                            </Button> 
                            :
                            <Button className="btnlogin" variant="primary" type="submit" id="submitBtn" disabled>
                                Let's go shop!
                            </Button>
                    }
                       

                    </Form>

                    <div id="right-panel">

                        <img src={Login} alt="Login" className="image"/>

                        <div className="right-panel">
                            <div className="content">
                                <h3> Already have an account? </h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                <Button as={Link} to='/login'>Login!</Button>
                                
                        </div>       

                        
                        </div>
                    </div>
                            
            </Container>

    )

}