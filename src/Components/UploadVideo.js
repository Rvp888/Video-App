

import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useContext, useEffect, useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import { navigationContext } from '../App';
import "../CSS/UploadVideo.css";
import { database, storage } from '../Firebase';
import { addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function UploadVideo() {
    const { changeLeftOpen, user } = useContext(navigationContext);
    const [videoDetails, setVideoDetails] = useState({
        id: uuidv4(),
        displayName: null,
        description: null,
        videoURL: '',
        createdAt: null,
        views: 0,
        thumbnailPhoto: '',
        likes: [],
        comments: [],
        channelName: null,
        channelPhoto: null,
        channelId: null,
    });
    const [videoUploaded, setVideoUploaded] = useState(true);    
    const [thumbnailUploaded, setThumbnailUploaded] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        changeLeftOpen(false);
    }, []);

    async function submitVideo() {
        let tempPayload = {...videoDetails};
        tempPayload.channelName = user.displayName;
        tempPayload.channelPhoto = user.photoURL;
        tempPayload.createdAt = new Date();
        tempPayload.channelId = user.uid;
        const res = await addDoc(database.videos, tempPayload);
        setTimeout(() => {
            navigate('/', {replace: true});
        },1000);        
    }

    function handleFileChange(e, type) {
        const file = e.target.files[0];
        const videoRef = type === 'video' ? ref(storage, `videos/${file.name}`) : ref(storage, `thumbnails/${file.name}`);
        const uploadTask = uploadBytesResumable(videoRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    type === 'video' ? videoDetails.videoURL = downloadURL : videoDetails.thumbnailPhoto = downloadURL;
                    setVideoDetails(videoDetails);
                    setVideoUploaded(false);
                    setThumbnailUploaded(false);
                });
            }
        );
    }

    return (
        <div className='video-upload-page'>
            <h1 className='video-upload-title'>Upload Your Video</h1>
            <div className='video-upload-cont'>
                <label className='action-label' htmlFor='Select Video' >Select Video</label>
                <input type="file" className='input-tag' accept='video/*' onChange={(e) => handleFileChange(e, 'video')} />
                <br/>
                <label className='action-label' htmlFor='Select Thumbnail Image' >Select Thumbnail Image</label>
                <input type="file" className='input-tag' accept='image/*' onChange={(e) => handleFileChange(e, 'thumbnail')} />
                <br/>
                <label className='action-label'>Video Title</label>
                <input type="text" className='input-tag' placeholder='Enter Video Title' onBlur={(e) => setVideoDetails({...videoDetails, displayName: e.target.value})} />
                <br/>
                <label className='action-label'>Video Description</label>
                <textarea className='description-tag' placeholder='Enter Video description...' onBlur={(e) => setVideoDetails({...videoDetails, description: e.target.value})} ></textarea>
                <br/>
                <button className='upload-action' disabled={videoUploaded && thumbnailUploaded} onClick={submitVideo} >Upload</button>
            </div>
        </div>
    )
}
