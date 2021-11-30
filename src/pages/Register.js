import React ,{useState, useEffect } from 'react'
import {useDispatch, useSelector } from "react-redux"
import {useHistory, Link } from "react-router-dom"
import { registerInitiate } from '../redux/actions';
import "./Register.css";
import {ToastContainer, toast } from 'react-toastify';

const Register = ({registerUser}) => {
    const [state, setState ] = useState({
        displayName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    })
    const {currentUser} = useSelector((state) => state.user);

    const navigate = useHistory();
    useEffect(() => {
        if(currentUser){
            navigate.push("/");
        }
    }, [currentUser, navigate]);

    const dispatch = useDispatch();
    const {email, password, displayName, passwordConfirm } = state;

    const handleSubmit = (e) => {
        e.preventDefault();
        if(password !== passwordConfirm){
            return toast.error("Your password and confirmation password do not match.");
        } 
        if( password.length < 6 ){
            return toast.error("Password must be 6 or more charaters!");
        }
        dispatch(registerInitiate(email, password, displayName ));
        setState({ email: "", displayName: "", password: "", passwordConfirm: "" })
        const data = {
            email, password
        }
        registerUser(data);
    }

    const handleChange = (e) => {
        let {name, value} = e.target;
        setState({...state, [name]: value });
    }
    return (
        <div>
        <ToastContainer />
            <div id="register-form">
                <form className="form-signup" onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 font-weight-normal" style={{ textAlign: "center"}}>
                        Muskip
                    </h1>
                    <p className="intro">Sign up for better listening</p>
                    <input 
                        type="text"
                        id="displayName"
                        className="form-control"
                        placeholder="Userame"
                        name="displayName"
                        onChange={handleChange}
                        value ={displayName}
                        required
                    />
                    <input 
                        type="email"
                        id="userEmail"
                        className="form-control"
                        placeholder="Email Address"
                        name="email"
                        onChange={handleChange}
                        value ={email}
                        required
                    />
                    <input 
                        type="password"
                        id="inputPassword"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                        value ={password}
                        required
                    />
                    <input 
                        type="password"
                        id="inputRePassword"
                        className="form-control"
                        placeholder="Repeat Password"
                        name="passwordConfirm"
                        onChange={handleChange}
                        value ={passwordConfirm}
                        required
                    />
                    <button className="btn btn-primary btn-block" type="submit">
                        <i className="fas fa-user-plus"></i> Sign Up
                    </button>
                   
                    <Link to="/login">
                       <i className="fas fa-angle-left"></i>Back
                    </Link>
                </form>
                <br />
            </div>
        </div>
    )
}

export default Register
