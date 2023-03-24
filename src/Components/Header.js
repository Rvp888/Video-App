
import React, { useContext, useEffect, useState } from 'react';
import "../CSS/Header.css";
import Icon from '@mdi/react';
import { mdiMenu, mdiYoutube, mdiMagnify, mdiMicrophone, mdiDotsVertical, mdiAccountCircleOutline, mdiVideoPlusOutline, mdiBellOutline } from '@mdi/js';
import { GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { app } from './../Firebase';
import { navigationContext } from '../App';
import { Link } from 'react-router-dom';


const provider = new GoogleAuthProvider();

const auth = getAuth(app);


export default function Header() {
    
    const { changeLeftOpen, leftOpen, user, setUser } = useContext(navigationContext);
    const [userClicked, setUserClicked] = useState(false);

    useEffect(() => {
        // setUser( JSON.parse(localStorage.getItem("user")));
        onAuthStateChanged(auth, (users) => {
            if (users) {
                setUser(users);
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
                <Icon path={mdiMenu} size={1} style={{cursor: 'pointer'}} onClick={() => changeLeftOpen(!leftOpen)} />
                <Link to="/" style={{color: 'black', textDecoration: 'none'}}>
                    <div className='logo'>
                        <Icon path={mdiYoutube} size={1} color="red" /><span>YouTube<sup className='super-s' >TM</sup></span>
                    </div>
                </Link>
            </div>

            <div className='mid-actions'>
                <input type="search" placeholder='Search' className='searchInput' />
                <button className='searchButton'><Icon path={mdiMagnify} size={1} /></button>
                <Icon path={mdiMicrophone} size={1} style={{cursor: 'pointer'}} />
            </div>

            {
                user ?  <div className='right-actions'>   
                            <Link to="upload" style={{color: 'black'}}>
                                <Icon path={mdiVideoPlusOutline} size={1} style={{cursor: 'pointer'}} /> 
                            </Link>       
                            <Icon path={mdiBellOutline} size={1} style={{cursor: 'pointer'}} />        
                            <img src={user.photoURL} className="user-profile" />   
                        </div> : 
                        <div className='right-actions'>
                            <Icon path={mdiDotsVertical} size={1} style={{ cursor: 'pointer' }} />
                            <button className='signin-btn' onClick={handleSignIn} ><Icon path={mdiAccountCircleOutline} size={1} color="blue" />Sign in</button>
                        </div>
            }

            <div className='logout-btn'>Logout</div>

        </div>
    )
}
