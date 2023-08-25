import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/common/Header";
import Button from "../components/common/Button";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import Loader from "../components/common/Loader";
import './style.css';

function Profile(){

    const user=useSelector((state)=>state.user.user);
    console.log("My User: ",user);
    if(!user){
        return <Loader/>;
    }
    const handleLogout=()=>{
        signOut(auth).then(()=>{
            toast.success("Logout Successfully");

        }).catch((error)=>{
            toast.error(error.message);
        });
    }
   
    return(
        <div>
           <Header/>
           <div className="user-container"> 
           <div className="user-details"> 
           <h1> Name:  {user.name}</h1>
           <h1> Email:{user.email}</h1>
           <h1> User ID:  {user.uid}</h1>
           <Button text={"Logout"} onClick={handleLogout} style={{width:"350px"}} />
           </div>
           </div>
        </div>
    );
}
export default Profile;