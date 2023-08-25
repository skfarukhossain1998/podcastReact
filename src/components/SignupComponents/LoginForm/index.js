import React, { useState } from "react";
import InputComponent from "../../common/input";
import Button from "../../common/Button";
import {signInWithEmailAndPassword  } from "firebase/auth";
import {doc,getDoc} from "firebase/firestore";
import {useDispatch} from "react-redux";
import {setUser} from "../../../slices/userSlice";
import {auth,db,storage} from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LoginForm(){
 
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();
    const dispatch=useDispatch();
  
    const handleLogin=async()=>{
        console.log("Working Login")
        setLoading(true);
        if(email && password){
            try{
                //Create User Account
                const userCredential=await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
    
                const user=userCredential.user;
                console.log("User",user);
    
                //Calling From db
              const userDoc= await getDoc(doc(db,"users",user.uid));
              const userData=userDoc.data();
              console.log("userData",userData);
    
                //Call the redux action
                dispatch(
                    setUser({
                    name:userData.name,
                    email:user.email,
                    uid:user.uid
                }));
                toast.success("Successfully Login");
                setLoading(false);
                navigate("/profile");
            }
            catch(e){
                console.log("Error in Signing",e);
                setLoading(false);
                toast.error(e.message);
            }
        }
        else{
            toast.error("Make Sure Email and Password are not empty");
            setLoading(false);
        }




    };  //handle Signing
return(
   
<>


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

                 
    <Button
     text={loading?"Loading..." :"Login"}
      onClick={handleLogin} 
      disabled={loading}
      />




</>





);




}
export default LoginForm;