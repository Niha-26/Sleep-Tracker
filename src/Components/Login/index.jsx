import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router";
import "./Login.css"
import fire from '../../firebase';

import EmailImage from '../../Assets/Images/email-image.png'
import passwordImage from '../../Assets/Images/passwordImage.png'
const Login = () => {
    const [loginS,setLoginS] = useState(false);
    const [username,_setUserName] = useState("");
    const [email,_setEmail] = useState("");
    const [password,_setPassword] = useState("");
    const [emailError,_setEmailError] = useState("");
    const [passwordError,_setPasswordError] = useState("");
    const [hasAccount,_setHasAccount] = useState(false);
    const [isLogin,_setUserLogin]  = useState(false);
    const history = useHistory();

    const LoginFunc = () => {
        // history.push("/dashboard");
        // setloggedin(true);
    }

    const _clearInputs = ()=>{
        _setEmail("");
        _setPassword("");
    }

    const _clearErrors = ()=>{
        _setEmailError("");
        _setPasswordError("");
    }

    const _handleLogin = ()=>{
        _clearErrors();
        fire
            .auth()
            .signInWithEmailAndPassword(email,password)
            .catch((err)=>{
                switch(err.code) {
                    case "auth/invalid-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found":
                        _setEmailError(err.message);
                        break;
                    case "auth/wrong-password":
                         _setPasswordError(err.message);
                        break;

                }
            })
    }

    const _handleSignup = ()=>{
        _clearErrors()
        fire
            .auth()
            .createUserWithEmailAndPassword(email,password)
            .then((response)=>{addNewUser(response.user.email)})
            .catch((err)=>{
                switch(err.code) {
                    case "auth/email-already-in-use":
                    case "auth/invalid-email":
                        _setEmailError(err.message);
                        break;
                    case "auth/weak-password":
                         _setPasswordError(err.message);
                        break;

                }
            })
    }

    const addNewUser = async (email)=>{
        let formData = new FormData();
        formData.append('name', email);
        fetch("http://127.0.0.1:8000/api/v1/add-user/",{
            method:"POST",
            body:formData
        })
        .then(response=>response.json())
        .then((res)=>{
               console.log("added new user") 
        });
}

    const authListener = ()=>{
        fire.auth().onAuthStateChanged((user)=>{
            if(user){
                _clearInputs()
                _setUserName(user);
                //alert(user)
                history.push('/dashboard');
            }else{
                _setUserName("");
            }
        })
    }
    
    useEffect(()=>{
        authListener();
    },[])

    return (
        <div>
            <div className="overlay" onClick={()=>{window.location.reload()}}></div>
        <div className="component">
                <div className="body-component">
                    <div className="header">
                    {isLogin===false?"Login":"Signup"}
                    </div>
                    <div className="mobile-header">Email Id</div>
                    <div className="email-input-div">
                        <img src={EmailImage} alt="email-image"  className="email-image"/>
                        <input type="text" className="mobile-number-box" value={email} onChange={(e)=>{_setEmail(e.target.value)}}/>
                    </div>
                    {emailError.length>0&&<div className="error">{emailError}</div>}
                    <div className="mobile-header">Password:</div>
                    <div className="email-input-div">
                        <img src={passwordImage} alt="email-image"  className="email-image"/>
                        <input type="password" className="mobile-number-box" value={password} onChange={(e)=>{_setPassword(e.target.value)}}/>
                    </div>
                    {passwordError.length>0&&<div className="error">{passwordError}</div>}
                    <br/>
                    <input type="button" value="Log In" className="login-button-div" onClick={isLogin===false?_handleLogin:_handleSignup}/>
                    {isLogin===false&&
                    <div className="suggest-signup-div">if you dont have an account please 
                    <span className="sign-up-span" 
                        onClick={()=>{_setUserLogin(true)}}>
                    sign up here</span></div>}
                </div>
            </div>
        </div>
        
    )
}

export default Login;