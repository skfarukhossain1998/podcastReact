import React, { useState } from "react";
import Header from "../components/common/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import InputComponent from "../components/common/input";
import Button from "../components/common/Button";
import FileInput from "../components/common/input/FileInput";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
function CreateAnEpisodePage(){
    const {id}=useParams();
    const [title,setTitle]=useState("");
    const [desc,setDesc]=useState("");
    const [password,setPassword]=useState("");
    const [audioFile,setAudioFile]=useState(false);
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const audioFileHandle=(file)=>{
        setAudioFile(file);
    };

    const handleSubmit=async()=>{
        setLoading(true);
        if((title,desc,audioFile,id)){
            try{
                const audioRef=ref(
                    storage,`podcast-episode/${auth.currentUser.uid}/${Date.now()}`
                );
                await uploadBytes(audioRef,audioFile);
                const audioURL=await getDownloadURL(audioRef);
                const episodeData={
                    title:title,
                    description:desc,
                    audioFile:audioURL,
                };

                await addDoc(collection(db,"podcasts",id,"episodes"),episodeData);
                toast.success("Episode Create Successfully");
                setLoading(false);
                navigate(`/podcast/${id}`);
                setDesc("");
                setAudioFile("");
                setTitle("");
                /* navigate('./PodcastDetails'); */

            }
            catch(e){
                toast.error(e.message);
                setLoading(false);
            }



        }
        else{
            toast.error("Fill the all fields");
            setLoading(false);
        }

    };

    return(
        <div>
            <Header/>
             <div className="input-wrapper">
            <h1>Create An Episode</h1>
            <InputComponent 
                state={title}
                setState={setTitle}
                placeholder="Title"
                type="text"
                required={true}
                />

                 <InputComponent 
                state={desc}
                setState={setDesc}
                placeholder="Description"
                type="text"
                required={true}
                />

                
                <FileInput
                 accept={"audio/*"} 
                 id="audio-file-image"
                fileHandle={audioFileHandle}
                 text={"Upload Audio File"} />

                <Button
                text={loading?"Loading...":"Create An Episode"} 
                disabled={loading} 
                onClick={handleSubmit}
        
        />

            
            </div>
        </div>
    );

}
export default CreateAnEpisodePage;