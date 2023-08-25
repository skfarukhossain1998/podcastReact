import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import InputComponent from "../common/input";
import { toast } from "react-toastify";
import Button from "../common/Button";
import FileInput from "../common/input/FileInput";
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import {auth, db, storage} from '../../firebase';
import { addDoc, collection, doc, setDoc } from "firebase/firestore";


function CreatePodcastForm(){

    const [title,setTitle]=useState("");
    const [desc,setDesc]=useState("");
    const [displayImg,setDisplayImg]=useState();
    const [bannerImg,setBannerImg]=useState();
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();
    const dispatch=useDispatch();

        const handleSubmit=async()=>{
            /* toast.success("Handle Success") */

            
            if(title && desc && displayImg && bannerImg){   
                setLoading(true);
                //1. Upload file and get download links 
                //Use for checking purpose
                /* const bannerImgRef=ref(storage,`podcasts-bannerImage`);
                const uploaded=await uploadBytes(bannerImgRef,bannerImg);
                console.log(uploaded); */  
                try{
                    //Banner Image
                    const bannerImgRef=ref(storage,`podcasts/${auth.currentUser.uid}/${Date.now()}`);
                    await uploadBytes(bannerImgRef,bannerImg);
                    const bannerImgUrl=await getDownloadURL(bannerImgRef)
                 /*    console.log(bannerImgUrl); */
                  /*   toast.success("Banner File Uploaded"); */

                        //display Image
                    const displayImgRef=ref(storage,`podcasts/${auth.currentUser.uid}/${Date.now()}`);
                    await uploadBytes(displayImgRef,displayImg);
                    const displayImgUrl=await getDownloadURL(displayImgRef)
                    /* console.log(displayImgUrl); */
                    
                    
                   const podcastData={
                    title:title,
                    description:desc,
                    bannerImg:bannerImgUrl,
                    displayImg:displayImgUrl,
                    createdBy:auth.currentUser.uid,
                    };
                    const docRef=await addDoc(collection(db,"podcasts"),podcastData);
                    setTitle("");
                    setDesc("");
                    setBannerImg(null);
                    setDisplayImg(null);
                   
                    toast.success("Podcast Created");
                    setLoading(false);

                }
                catch(e){
                    toast.error(e.message);
                    console.log(e);
                    setLoading(false);

                }

              
            }
            else{
                toast.error("Please Fillup the all field");
                setLoading(false);
            } 

        };
      const displayImgHandle=(file)=>{
            setDisplayImg(file);
      };
      const bannerImgHandle=(file)=>{
        setBannerImg(file);
  };


    return (
    <>
        <InputComponent 
          type={"text"}
          state={title}
          setState={setTitle}
          placeholder={"Enter Title"}
          required={true}
        />
        <InputComponent 
          type={"text"}
          state={desc}
          setState={setDesc}
          placeholder={"Enter Description"}
          required={true}
        />

         <FileInput accept={"image/*"} id="display-input-image" fileHandle={displayImgHandle} text={"Display Image Upload"} />

    <FileInput accept={"image/*"} id="banner-input-image" fileHandle={bannerImgHandle} text={"Banner Image Upload"}/>
     
        
        <Button text={loading?"Loading...":"Create A Podcast"} disabled={loading} 
        onClick={handleSubmit}
        
        />

    </>
  )



}
export default CreatePodcastForm;


