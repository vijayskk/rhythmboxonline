import { PlusIcon } from '@heroicons/react/outline'
import { Modal, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { shuffle } from 'lodash'
import React, { useContext, useEffect, useState } from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth,db, fb} from '../firebase'
import { doc, setDoc } from "firebase/firestore"; 
import { useRouter } from 'next/router'
import { ChannelRefreshContext } from '../contexts/ChannelRefreshContext'


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

    useEffect(()=>{
        setcolor(shuffle(colors).pop());
    })

    const [channelrefresh, setchannelrefresh] = useContext(ChannelRefreshContext);
    const [channelname, setchannelname] = useState("");
    const [user] = useAuthState(auth)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute' ,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      };
    const router = useRouter()
    const makechannel = () =>{
        if(user){
            db.collection("channels").add({
                channelname,
                ownername:user.displayName,
                owneremail:user.email
            }).then((data)=>{
                handleClose()
                setchannelrefresh(channelrefresh + 1)
            })

        }
    }
    const logout = ()=>{
        fb.auth().signOut().then(() => {
          // Sign-out successful.
        }).catch((error) => {
          // An error happened.
        });
      }
    return (
        <div className='absolute top-5 right-8 flex space-x-4'>
            {user?<div onClick={handleOpen} className='flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 px-4'>
                <PlusIcon className='text-white h-5 w-5' />
                <div className='text-white'>
                    <h2>Create channel</h2>                
                </div>
            </div>:null}

            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
            <div className='flex flex-col space-y-2'>
                <label htmlFor="name" className='text-white mb-4 text-2xl'>Enter the channel name</label>
                <input placeholder='Enter name' type="name" id="name" name="name" className='border border-gray-500 text-white mb-10 bg-black rounded-md h-10 pl-2' onChange={(e)=>{
                    setchannelname(e.target.value)
                }} />
                <button className={`text-white w-full self-center ${color} h-10  rounded-md mx-10 cursor-pointer`} onClick={makechannel} type="submit">Create Channel</button>
            </div>
            </Box>
            </Modal>

            

            <div className='flex  items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-4' onClick={()=>{
                if(user){
                    logout()
                }
                else{
                    router.push('/login')
                }
            }}>
                <img className='rounded-full w-10 h-10'  src="https://cdn4.vectorstock.com/i/thumb-large/23/88/person-gray-photo-placeholder-man-vector-23522388.jpg" />
                <div className='text-white'>
                    {user?<h2>{user.displayName}</h2>:
                    <h2>Login</h2>
                }
                </div>
            </div>
            
        </div>
    )
}

export default Header
