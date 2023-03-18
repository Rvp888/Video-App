
import React, { useEffect, useState } from 'react';
import "../CSS/Header.css";
import Icon from '@mdi/react';
import { mdiMenu, mdiYoutube, mdiMagnify, mdiMicrophone, mdiDotsVertical,mdiAccountCircleOutline } from '@mdi/js';
import { GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { app } from './../Firebase';


const provider = new GoogleAuthProvider();

const auth = getAuth(app);


export default function Header() {
    const [user, setUser] = useState();

    useEffect(() => {
        // setUser( JSON.parse(localStorage.getItem("user")));
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
        });
    },[])

    function handleSignIn() {
        signInWithPopup(auth, provider).then((result) => {
            console.log("Sign In Successfull !", result.user);
            // localStorage.setItem("user", JSON.stringify(result.user));
            setUser({...result.user});
        })
        .catch((err) => {
            console.log("Sign In Failed !");
        })
    }

    return (
        <div className='header'>
            <div className='left-actions'>
                <Icon path={mdiMenu} size={1} style={{cursor: 'pointer'}} />
                <div className='logo'>
                    <Icon path={mdiYoutube} size={1} color="red" /><span>YouTube<sup className='super-s' >TM</sup></span>
                </div>
            </div>

            <div className='mid-actions'>
                <input type="text" placeholder='Search' className='searchInput' />
                <button className='searchButton'><Icon path={mdiMagnify} size={1} /></button>
                <Icon path={mdiMicrophone} size={1} style={{cursor: 'pointer'}} />
            </div>

            <div className='right-actions'>
                <Icon path={mdiDotsVertical} size={1} style={{cursor: 'pointer'}} />
                {
                    user ? <img src={user.photoURL} className="user-profile" /> : <button className='signin-btn' onClick={handleSignIn} ><Icon path={mdiAccountCircleOutline} size={1} color="blue" />Sign in</button>    
                } 
            </div>
        </div>
    )
}
