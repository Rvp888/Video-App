
import React, { useContext, useEffect, useState } from 'react';
import "../CSS/Header.css";
import Icon from '@mdi/react';
import { mdiMenu, mdiYoutube, mdiMagnify, mdiMicrophone, mdiDotsVertical, mdiAccountCircleOutline, mdiVideoPlusOutline, mdiBellOutline } from '@mdi/js';
import { GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { app, database } from './../Firebase';
import { navigationContext } from '../App';
import { Link, useNavigate } from 'react-router-dom';
import { query, getDocs, addDoc, where } from 'firebase/firestore';


const provider = new GoogleAuthProvider();

const auth = getAuth(app);


export default function Header() {
    const navigate = useNavigate();
    const { changeLeftOpen, leftOpen, user, setUser, searchFunction } = useContext(navigationContext);
    const [userClicked, setUserClicked] = useState(false);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        onAuthStateChanged(auth, (users) => {
            if (users) {
                setUser(users);
            }
        });
    },[])

    function handleSignIn() {
        signInWithPopup(auth, provider).then(async(res) => {
            const q = query(database.users, where("userId", "==", res.user.uid));
            const snapshot = await getDocs(q);
            if(snapshot.docs.length === 0){
                const payload = {
                    userName: res.user.displayName,
                    userId: res.user.uid,
                    userProfile: res.user.photoURL,
                    userEmail: res.user.email,
                    subscribedChannels: [],
                }
                const res1 = await addDoc(database.users, payload);
            }
            setUser({...res.user});
        })
        .catch((err) => {
            console.log("Sign In Failed !");
        })
    }

    function handleSignout() {
        signOut(auth).then(() => {
            setUser(null);
        }).catch((err) => {
            console.log(err);
        })
    }

    function handleSearch() {
        searchFunction(searchText);
        navigate(`/search`, {replace: true});
    }

    return (
        <div className='header'>

            <div className='left-actions'>
                <Icon path={mdiMenu} size={1.5} className='header-icon' onClick={() => changeLeftOpen(!leftOpen)} />
                <Link to="/" style={{color: 'black', textDecoration: 'none'}}>
                    <div className='logo' title='YouTube Home' >
                        <Icon path={mdiYoutube} size={1.5} color="red" /><span className='app-name'>YouTube<sup className='super-s' >TM</sup></span>
                    </div>
                </Link>
            </div>

            <div className='mid-actions'>
                <input type="search" placeholder='Search' className='searchInput' value={searchText} onChange={(e) => {setSearchText(e.target.value)}} />
                <button className='searchButton' onClick={handleSearch} title='Search' ><Icon path={mdiMagnify} size={1} /></button>
                <Icon path={mdiMicrophone} size={1.5}  className='header-icon' style={{cursor: 'pointer'}} title='Search with your voice' />
            </div>

            {
                user ?  <div className='right-actions'>   
                            <Link to="upload" style={{color: 'black'}} title='Create' >
                                <Icon path={mdiVideoPlusOutline} size={1.5} style={{cursor: 'pointer'}} className='header-icon' /> 
                            </Link>       
                            <Icon path={mdiBellOutline} size={1.5} style={{cursor: 'pointer'}} className='header-icon' title='Notifications' />        
                            <img src={user.photoURL} onClick={() => setUserClicked(!userClicked)} className="user-profile" />   
                        </div> : 
                        <div className='right-actions'>
                            <Icon path={mdiDotsVertical} size={1} style={{ cursor: 'pointer' }} />
                            <button className='signin-btn' onClick={handleSignIn} ><Icon path={mdiAccountCircleOutline} size={1} color="blue" />Sign in</button>
                        </div>
            }

            <div className='logout-btn' onClick={handleSignout} style={{display: userClicked ? 'block' : 'none'}}>Logout</div>

        </div>
    )
}
