import React, { useEffect } from 'react';
import './App.css';
import SignUpPage from './pages/SignUpPage';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Profile from './pages/Profile';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./components/common/PrivateRoute";
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { setUser } from './slices/userSlice';
import {useDispatch} from "react-redux";
import CreateAPodcastPage from './pages/CreateAPodcast';
import PodcastsPage from './pages/Podcasts';
import PodcastDetailsPage from './pages/PodcastDetails';
import CreateAnEpisodePage from './pages/CreateAnEpisode';
function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
    const unsubscribeAuth=onAuthStateChanged(auth,(user)=>{
      if(user){
        const unsubscribeSnap=onSnapshot(
          doc(db,"users",user.uid),
          (userDoc)=>{
            if(userDoc.exists()){
              const userData=userDoc.data();
              dispatch(
                setUser({
                  name:userData.name,
                  email:userData.email,
                  uid:user.uid
                })
              );
            }
          },
          (error)=>{
            console.log("Error fetching User Data",error);
          }
        );
        return()=>{
          unsubscribeSnap();
        };
      }
    });

return ()=>{
  unsubscribeAuth();
} ;
  },[]);


  return (
    <div className="App">
    <ToastContainer/>
      <Router>
        <Routes>
          <Route path="/" element={<SignUpPage />} />
         <Route element={<PrivateRoute/>}>
           <Route path="/profile" element={<Profile />} />
           <Route path="/create-a-podcast" element={<CreateAPodcastPage />} />
           <Route path="/podcasts" element={<PodcastsPage />} />
           <Route path="/podcast/:id" element={<PodcastDetailsPage />} />
           <Route path="/podcast/:id/create-episode" element={<CreateAnEpisodePage />} />
         </Route>
         
        </Routes>
      </Router>
    </div>
  );
}

export default App;
