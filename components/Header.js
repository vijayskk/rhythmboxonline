import { PlusIcon } from '@heroicons/react/outline'
import { CircularProgress, Modal, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { shuffle } from 'lodash'
import React, { useContext, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db, fb, storage } from '../firebase'
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from 'next/router'
import { ChannelRefreshContext } from '../contexts/ChannelRefreshContext'
import { v4 as uuidv4 } from 'uuid';


function Header() {

    const colors = [
        "bg-indigo-700",
        "bg-blue-700",
        "bg-green-700",
        "bg-red-700",
        "bg-yellow-700",
        "bg-pink-700",
        "bg-purple-700",
    ]
    const [color, setcolor] = useState(null);

    useEffect(() => {
        setcolor(shuffle(colors).pop());
    })

    const [podcastname, setpodcastname] = useState("");
    const [podcastDescription, setpodcastDescription] = useState("");
    const [thumbnail, setthumbnail] = useState(null);
    const [mp3file, setmp3file] = useState(null);
    const [isLoading, setisLoading] = useState(false);
    const [user] = useAuthState(auth)
    const [open, setOpen] = useState(false);
    const [haserror, sethaserror] = useState(false);
    const [error, seterror] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setthumbnail(null)
        setmp3file(null)
        setpodcastDescription("")
        setpodcastname("")
        sethaserror(false)
    };
    const [channelrefresh, setchannelrefresh] = useContext(ChannelRefreshContext);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'black',
        boxShadow: 24,
        p: 4,
    };
    const router = useRouter()
    const makechannel = async () => {
        var thumbnailurl
        var mp3fileurl
        
        if(user){
            if (podcastname == "" ) {

                sethaserror(true)
                seterror("Name is required")
            }
            else if (podcastDescription == "") {

                sethaserror(true)
                seterror("Description is required")
            }
            else if (mp3file == null) {
                sethaserror(true)
                seterror("Mp3 file required")
            } else if (thumbnail == null) {
                sethaserror(true)
                seterror("Thumbnail required")
            }else{
                setisLoading(true)
                sethaserror(false)
                try {
                    await storage.ref(`songs/${uuidv4()}.png`).put(thumbnail).then(({ ref }) => {
                        ref.getDownloadURL().then((url) => {
                            thumbnailurl = url
                        })
                    });
                    await storage.ref(`songs/${uuidv4()}.mp3`).put(mp3file).then(({ ref }) => {
                        ref.getDownloadURL().then((urlmp3) => {
                            mp3fileurl = urlmp3
                            console.log(urlmp3);
                            db.collection("songs").add({
                                podcastname,
                                podcastDescription,
                                thumbnailurl,
                                mp3fileurl,
                                authorname: user.displayName,
                                authoremail: user.email
                            }).then((data) => {
                                handleClose()
                                setchannelrefresh(channelrefresh + 1)
                                setisLoading(false)
                            })
                        })
                    });
    
    
                } catch (e) {
                    console.log(e);
                    setisLoading(false)
                    haserror(true)
                    seterror("Uploading failed")
                }
            }
        }
        
    }
    const logout = () => {
        fb.auth().signOut().then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }
    return (
        <div className='absolute top-5 right-2 md:right-8 flex space-x-4'>
            {user ? <div onClick={handleOpen} className='flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 px-4'>
                <PlusIcon className='text-white h-5 w-5' />
                <div className='text-white hidden md:inline'>
                    <h2>Create podcast</h2>
                </div>
            </div> : null}

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='flex flex-col space-y-2'>
                        <label htmlFor="name" className='text-white mb-4 text-2xl'>Enter the podcast name</label>
                        <input placeholder='Enter name' type="name" id="name" name="name" className='border border-gray-500 text-white mb-10 bg-black rounded-md h-10 pl-2' onChange={(e) => {
                            setpodcastname(e.target.value)
                        }} />

                        <label htmlFor="name" className='text-white mb-4 text-2xl pt-6'>Enter the podcast description</label>
                        <input placeholder='Enter description' type="name" id="name" name="name" className='border border-gray-500 text-white mb-10 bg-black rounded-md h-10 pl-2' onChange={(e) => {
                            setpodcastDescription(e.target.value)
                        }} />

                        <label htmlFor="name" className='text-white mb-4 text-2xl pt-6'>Select mp3 file</label>
                        <input accept=".mp3" className='text-white' type="file" onChange={(e) => {
                            setmp3file(e.target.files[0])
                        }} />

                        <label htmlFor="name" className='text-white mb-4 text-2xl pt-6 '>Select thumbnail file</label>
                        <input accept=".png" className='pb-6 text-white' type="file" onChange={(e) => {
                            setthumbnail(e.target.files[0])
                        }} />
                        {haserror ? <p className='text-center text-red-200 pt-4 pb-6'>⚠️ {error}</p> : null}
                        {isLoading ? <CircularProgress className='w-full mt-10 mb-10 self-center' color="secondary" /> : null}

                        <button className={`text-white w-full self-center ${color} h-10  rounded-md mx-10 cursor-pointer`} onClick={makechannel} type="submit">Create Podcast</button>
                    </div>
                </Box>
            </Modal>



            <div className='flex  items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-4' onClick={() => {
                if (user) {
                    logout()
                }
                else {
                    router.push('/login')
                }
            }}>
                <img className='rounded-full w-10 h-10' src="https://cdn4.vectorstock.com/i/thumb-large/23/88/person-gray-photo-placeholder-man-vector-23522388.jpg" />
                <div className='text-white'>
                    {user ? <h2>{user.displayName}</h2> :
                        <h2>Login</h2>
                    }
                </div>
            </div>

        </div>
    )
}

export default Header
