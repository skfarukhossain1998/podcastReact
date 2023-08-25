import React, { useState } from "react";
import InputComponent from "../../common/input";
import Button from "../../common/Button";
import {auth,db} from "../../../firebase";
import {createUserWithEmailAndPassword } from "firebase/auth";
import {doc,setDoc} from "firebase/firestore";
import {useDispatch} from "react-redux";
import {setUser} from "../../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function SignupForm(){
    const [fullName,setFullName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const handleSignup=async()=>{
        console.log("Working Signup")
        setLoading(true);
        if(password==confirmPassword && password.length>=6){
            try{
                //Create User Account
                const userCredential=await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                const user=userCredential.user;
                console.log("User",user);

                //Saving in db
                await setDoc(doc(db,"users",user.uid),{

                    name:fullName,
                    email:user.email,
                    uid:user.uid    
                });

                //Call the redux action
                dispatch(
                    setUser({
                    name:fullName,
                    email:user.email,
                    uid:user.uid
                }));
                toast.success("Account has been created.");
                setLoading(false);
                navigate("/profile")
            }
            catch(e){
                console.log("Error",e);
                toast.error(e.message);
                setLoading(false);

            }

        }
        else{
            if(password!=confirmPassword){
                toast.error("Password Mismatch!!");
                setLoading(false);
            }
            else if(password.length<6){
                toast.error("Password Must be greter than 6 digits");   
                setLoading(false);
            }

            setLoading(false);
        }


    }
return(
   
<>
            <InputComponent 
                state={fullName}
                setState={setFullName}
                placeholder="Full Name"
                type="text"
                required={true}
                />

                 <InputComponent 
                state={email}
                setState={setEmail}
                placeholder="Email"
                type="text"
                required={true}
                />

                 <InputComponent 
                state={password}
                setState={setPassword}
                placeholder="Password"
                type="password"
                required={true}
                />

                 <InputComponent 
                state={confirmPassword}
                setState={setConfirmPassword}
                placeholder="Confirm Password"
                type="password"
                required={true}
                />
    <Button 
    text={loading ? "Loading...":"Signup"} 
    disabled={loading}
     onClick={handleSignup} />




</>





);




}
export default SignupForm;