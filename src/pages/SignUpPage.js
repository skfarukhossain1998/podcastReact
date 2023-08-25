import React, { useState } from "react";
import Header from "../components/common/Header";
import InputComponent from "../components/common/input";
import Button from "../components/common/Button";
import SignupForm from "../components/SignupComponents/SignupForm";
import LoginForm from "../components/SignupComponents/LoginForm";

function SignUpPage(){
   
    const [flag,setFlag]=useState(false);

    return(
        <div>
            <Header/>
            <div className="input-wrapper">
               {!flag ? <h1>SignUp</h1> :<h1>Login</h1> }
                { !flag ? <SignupForm/> : <LoginForm />}
                {!flag ?(
                    <p style={{cursor:"pointer"}} onClick={()=>setFlag(!flag)}>
                        Already have an account ? Click here to Login
                    </p>
                ):
                (
                    <p style={{cursor:"pointer"}} onClick={()=>setFlag(!flag)}>
                       Don't have an account ? Click here to SignUp
                    </p>
                ) }

            </div>
        </div>

    );
}
export default SignUpPage;