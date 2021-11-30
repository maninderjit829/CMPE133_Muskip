import {BrowserRouter, Switch, Route } from "react-router-dom"
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import UserRoute from "./components/UserRoute";
import {useDispatch } from "react-redux"
import React, {useEffect, useState} from 'react'
 import {auth} from "./firebase"
import { setUser } from "./redux/actions";
import "./App.css"
import fire from './firebase'
import {ToastContainer, toast } from 'react-toastify';


function App() {
  
  const [user, setUser2] = useState({});

  const registerUser = ({ email, password }) => {
    fire
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((data) => data.json())
    .then((res) => {
      setUser2(res.user) 
    })
    .catch((err) => {
      if(err.code === "auth/email-already-in-use"){
        return toast.warning("This email is already registered")
      }else {
        return toast.error("Something went wrong")
      }
    });
  }

  const loginUser = ({ email, password}) => {
    fire
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => setUser2(res.user))
    .catch((err) =>{
        if(err.code === "auth/wrong-password"){
          return toast.error("Email or password is invalid")
        } else if( err.code === "auth/user-not-found"){
          return toast.error("Email or password is invalid")
        } else {
          return toast.error("Something went wrong")
        }
      } 
    );
  }

  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if(authUser){
        dispatch(setUser(authUser));
      } else {
        dispatch(setUser(null))
      }
    })
  }, [dispatch])

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
        
            <UserRoute exact path="/" component={Home} />
            <Route exact path="/login">
              <Login loginUser = {loginUser}/>
            </Route> 
            <Route exact path="/register">
              <Register registerUser={registerUser} />
            </Route> 
        </Switch>
      </div>
    </BrowserRouter>
     );
}

export default App;
