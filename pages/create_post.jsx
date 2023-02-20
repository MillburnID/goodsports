import React from "react";
import styles from '../styles/styles.module.css'
import { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import {useRouter} from 'next/router'

import { auth } from "../firebaseConfig.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function create_post() {
    const [html, setHTML] = useState(<></>);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [file, setFile] = useState();
    const router = useRouter();

    
    function uploadImageTask() {
        const storageRef = ref(storage, `/files/${x}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            (err) => { 
                console.log(err) 
            },
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                });
            }
        );
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log("submit");
        
    }

    // TODO: implement 3rd party markdown editor
    
    
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setHTML((
                <>
                    <button onClick={() => {
                        auth.signOut()
                        router.push('/admin')
                    }}>Log Out</button>
                    <h1 className={styles.h1}>MAKE A POST</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" name="title" onChange={e=>setTitle(e.target.value)}/>
                        <br></br>
                        <label htmlFor="content">Content</label>
                        <textarea id="content" name="content" onChange={e=>setContent(e.target.value)}/>
                        <br></br>
                        <label htmlFor="image">Image</label>
                        <input type="file" id="image" name="image" onChange={e=>setFile(e.target.files[0])} />
                        <br></br>
                        <button type="submit">Submit</button>
                    </form>
                </>
            ));
        } else {
            router.push('/admin')
        }
    });

    return html;

    
}