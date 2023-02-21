import React, { Component } from 'react'
import Navi from "../navi/Navi"
import './SignIn.css'
import Axios from 'axios'
import { useState, useEffect } from 'react'
import Cookie from "js-cookie"
import { useHistory } from "react-router-dom";
import alertify from 'alertifyjs'

function SignInPage() {

    const history = useHistory();

    const [usernameReg, setUsernamReg] = useState("")
    const [passwordReg, setPasswordReg] = useState("")
    const [emailReg, setEmailReg] = useState("")

    const [passwordLog, setPasswordLog] = useState("")
    const [emailLog, setEmailLog] = useState("")

    

    function onClickRegister(){
        if(!(emailReg.includes('@'))){
            alertify.error('Please enter a valid e-mail adress!')
        }
        else if(usernameReg.length==0){
            alertify.error('Name field is required!');
        }else if(emailReg==0){
            alertify.error('E-mail field is required!')
        }else if(passwordReg.length < 8){
            alertify.error('Password length must be longer than 8!')
        }else{
        Axios.post('http://localhost:8080/register/', {
            name: usernameReg, 
            password: passwordReg,
            email: emailReg
            });
            alertify.success('Account created! Please check your e-mail to verify your account!')
            history.push("/")}
    }

    function onClickLogin(){
        if(emailLog.length==0){
            alertify.error('E-mail field is required!');
        }else if(passwordLog.length==0){
            alertify.error('Password field is required!')
        }
        else{
        fetch('http://localhost:8080/signin/')
            .then(response => response.json())
            .then(result => {
                    const users= result.filter(function(item){
                        return ((item.email == emailLog))&&(item.password === passwordLog);
                    })
                    if(users.length>0){
                        if(users[0].isVerified != true){
                            alertify.error('Please verify your account!')
                        }else
                        {Cookie.set("username",users[0].name)
                        Cookie.set("email",users[0].email)
                        Cookie.set("id",users[0]._id)
                        Cookie.set("isSalesMan",users[0].isSalesManager)
                        Cookie.set("isProdMan",users[0].isProductManager)
                        setTimeout(()=>
                        {
                            history.push("/")
                            window.location.reload();
                        }, 500)
                        alertify.success('Logged in successfully!')}
                    }else{
                        alertify.error('Wrong combination!')
                    }   
                
            });}
    }

    function onClick() {
        const  loginBtn = document.querySelectorAll(".login-btn"),
        registerBtn = document.querySelectorAll(".register-btn"),
        box = document.querySelector(".box"),
        loginForm = document.querySelector(".login-form"),
        registerForm = document.querySelector(".register-form");

        registerBtn.forEach((btn) =>{
        btn.addEventListener("click",() =>{
        box.classList.add("slide-active");
        registerForm.classList.remove("form-hidden");
        loginForm.classList.add("form-hidden");
        });
        });

        loginBtn.forEach((btn) =>{
        btn.addEventListener("click",() =>{
        box.classList.remove("slide-active");
        registerForm.classList.add("form-hidden");
        loginForm.classList.remove("form-hidden");
        });
        });
};


    
    return (
        
        <div className="login-page">
            <div className="box">
                <div className="left">
                    <h3>Create Account</h3>
                    <button type="button" className="register-btn" onClick={onClick()}>Register</button>
                </div>
                <div className="right">
                    <h3> Already have an Account ?</h3>
                    <button type="button" className="login-btn" onClick={onClick()}>Login</button>
                </div>
                <div className="form">
                    <div className="login-form">
                        <form>
                        <h3>Log In</h3>
                        <div className="form-group">
                            <input type="email" placeholder="Email Address*" className="form-control" 
                            onChange={(e)=>{setEmailLog(e.target.value)}}/>
                        </div>
                        <div className="form-group">
                            <input type="password" placeholder="Password*" className="form-control"
                            onChange={(e)=>{setPasswordLog(e.target.value)}} />
                        </div>
                        <div className="form-group">
                        </div>
                        <button type="button" className="submit-btn" onClick={onClickLogin}>Login</button>
                        <p><a href="#" className="register-btn">Register</a></p></form>
                    </div>
                    <div className="register-form form-hidden">
                        <h3>Register</h3>
                        <div className="form-group">
                            <input type="text" placeholder="Full Name*" required className="form-control"
                             onChange={(e)=>{setUsernamReg(e.target.value)}}/>
                        </div>
                        <div className="form-group">
                            <input type="email" placeholder="Email Address*" className="form-control" 
                            onChange={(e)=>{setEmailReg(e.target.value)}}/>
                        </div>
                        <div className="form-group">
                            <input type="password" placeholder="Password*" className="form-control" 
                            onChange={(e)=>{setPasswordReg(e.target.value)}}/>
                        </div>

                        <button type="button" className="submit-btn" onClick={onClickRegister}>Register</button>
                        <p><a href="#" className="login-btn" onClick={onClick()}>Login</a></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignInPage