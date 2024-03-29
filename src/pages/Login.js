import React ,{useState, useEffect } from 'react'
import {useDispatch, useSelector } from "react-redux"
import {useHistory, Link } from "react-router-dom"
import { fbSignInInitiate, googleSignInInitiate, loginInitiate } from '../redux/actions';
import "./Login.css";
import googleimg from "../img/google.png"
import {ToastContainer, toast } from 'react-toastify';


const Login = ({loginUser}) => {
    const [state, setState ] = useState({
        email: "",
        password: "",
    })
    const {email, password} = state;

    const {currentUser} = useSelector((state) => state.user);

    const navigate = useHistory();
    useEffect(() => {
        if(currentUser){
            navigate.push("/");
        }
    }, [currentUser, navigate]);
    const dispatch = useDispatch();

    const handleGoogleSignIn = () => {
        dispatch(googleSignInInitiate());
    }
    const handleFBSignIn = () => {
        dispatch(fbSignInInitiate());
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!email || !password){
            console.log("email is " + email + ", password is " + password)
            return toast.error("Incorrect Information, Please try again.");
        }
        dispatch(loginInitiate(email, password));
        setState({email: "", password: ""});

        const data = {
            email, password
        };

        loginUser(data);
    }

    const handleChange = (e) => {
        let {name, value} = e.target;
        setState({...state, [name]: value });
    }

    return (
        <div>
        <ToastContainer />
            <div id="logreg-forms">
                <form className="form-signin" onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 font-weight-normal" style={{ textAlign: "center"}}>
                        Muskip
                    </h1>
                    <div className="social-login">
                        <button className="btn google-btn social-btn" type="button" onClick={handleGoogleSignIn}>
                            <div>
                                <span className="socialText" >
                                    {/* <i className="fab fa-google-plus-g"></i> */}
                                    <img className="logo" src={googleimg} alt="google"/> 
                                      Continue with Google
                                </span>
                            </div>
                        </button>
                        <button className="btn facebook-btn social-btn" type="button" onClick={handleFBSignIn}>
                            <div>
                                <span className="socialText">
                                    <i className="fab fa-facebook-f"></i>  
                                    {/* <img className="fb_logo" src={fbimg} alt="fb"/>  */}
                                        Continue with Facebook
                                </span>
                            </div>
                        </button>
                    </div>
                    <p style={{textAlign: "center"}}>OR</p>
                    <input 
                        type="email"
                        id="inputEmail"
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
                        placeholder="password"
                        name="password"
                        onChange={handleChange}
                        value ={password}
                        required
                    />
                    <button className="btn btn-secondary btn-block" type="submit">
                        <i className="fas fa-sign-in-alt"></i>  Sign In
                    </button>
                    <hr/>
                    <p>Don't have an account?</p>
                    <Link to="/register">
                        <button className="btn btn-primary btn-block" type="button" id="btn-signup">
                            <i className="fas fa-user-plus"></i> Sign up New Account
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Login
