import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
import { setPodcasts } from "../slices/podcastSlice";
import { useDispatch, useSelector } from "react-redux";
import PodcastCard from "../components/Podcasts/PodcastCard";
import InputComponent from "../components/common/input";

function PodcastsPage(){
const dispatch=useDispatch();
const podcasts=useSelector((state)=>state.podcasts.podcasts);
const [search,setSearch]=useState("");

    useEffect(()=>{
    const unsubscribe=onSnapshot(
        query(collection(db,"podcasts")),
        (querySnapshot)=>{
            const podcastsData=[];
            querySnapshot.forEach((doc)=>{
                podcastsData.push({id:doc.id,...doc.data()});
            });
            dispatch(setPodcasts(podcastsData));

        },
        (error)=>{
            console.log("Error Fetching Podcast",error);
        }

    );
    return()=>{
        unsubscribe();
    }
    },[dispatch]);
    console.log(podcasts);
    var filteredPodcasts=podcasts.filter((item)=>item.title.trim().toLowerCase().includes(search.toLowerCase()));

    return(
        <div>
            <Header/>
            <div className="input-wrapper" style={{marginTop:"2rem"}}>
            <h1>Discover Podcasts</h1>
            <InputComponent 
                state={search}
                setState={setSearch}
                placeholder="Search By title"
                type="text"
                required={true}
                />
            {filteredPodcasts.length>0?(
                <div className="podcast-flex">
                {filteredPodcasts.map((item)=>{
                    return <PodcastCard
                    key={item.id}
                    id={item.id} title={item.title} displayImg={item.displayImg} />
                })}
                </div>
             ):(
            <p>{search ? "Podcast Not found":"No Podcasts on the page"}</p>)}
            </div>
        </div>
    )
}
export default PodcastsPage;