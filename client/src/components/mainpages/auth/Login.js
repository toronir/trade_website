import React, { useRef, useState } from 'react'
import {Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { Container,Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setAuthUserData } from '../../../Redux/Auth-reducer';
import { useSelector } from 'react-redux';

function Login() {


    const [validated, setValidated] = useState(false);
    const passRef = useRef('')
    const emailRef = useRef('')
    const dispatch = useDispatch()
    const store = useSelector(store =>store)


    const emailCheck = (email, password) => {
        if (email === 'test01@gmail.com' && password === '123456') {
            return true
        }
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
        
        if (emailCheck(emailRef.current.value, passRef.current.value)) {
            dispatch(setAuthUserData(1,emailRef.current.value,"toronir",true))
            <Redirect to="/cart" />
            
        }



    };
    return (
        <Container  className="justify-content-center align-items-center d-flex">
            <Row>
            <h1 className="text-center">LogIn</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit} >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" ref={emailRef} required />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" ref={passRef} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button className="text-center" variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            </Row>
        </Container>
    )
}

export default Login
