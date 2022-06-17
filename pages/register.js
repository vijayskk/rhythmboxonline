import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {fb , auth} from '../firebase'
import firebase from 'firebase/compat/app'
import {useRouter} from 'next/router'
import { CircularProgress, LinearProgress } from '@mui/material';

function register() {


    const [name,setname] = useState("")
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [confirmpass, setconfirmpass] = useState("");
    const [haserror, sethaserror] = useState(false);
    const [error, seterror] = useState("");
    const [isLoading, setisLoading] = useState(false);
    const router = useRouter()
    const registerwithEmail = () =>{

        if(name == "" && email == "" && password == "" ){
            
        sethaserror(true)
        seterror("All Fields are required")
        }
        else if(password != confirmpass){
            sethaserror(true)
        seterror("Passwords won't match")
        }else if(password.length < 6){
            sethaserror(true)
            seterror("Passwords need atleast 6 digits")
        }
        else {
            setisLoading(true)
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                firebase.auth().currentUser.updateProfile({
                    displayName: name,
                  }).then(function() {
                    console.log("Display name updated");
                    router.push('/login')
                  }).catch(function(error) {
                    console.log(error);
                    sethaserror(true)
                    setisLoading(false)
                    seterror("Sorry,Server error")
                  });
                // ...
            })
            .catch((error) => {
                setisLoading(false)
                const errorCode = error.code;
                console.log(errorCode);
                if(errorCode == "auth/email-already-in-use"){
                    sethaserror(true)
                    seterror("Email Already in use")
                }else{
                    sethaserror(true)
                    seterror("Sorry,Server error")
                }
                // ..
            });
        }

        
    }

  return (
    <div className='flex flex-col items-center justify-start h-screen'>

            <h1 className='text-white text-4xl md:text-7xl font-bold text-center mt-20 md:mt-32'>Create an Account</h1>
            <img src="black-concrete.jpg" alt="" className='fixed w-screen h-screen -z-40' />
            

        <div className='w-1/6 flex flex-col mt-20 items-center'>
            {/* <img className='w-52 mb-5 mt-20' src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Rhythmbox_logo_3.4.4.svg/1200px-Rhythmbox_logo_3.4.4.svg.png" alt="" /> */}
            <div className='flex flex-col space-y-2'>
                <label htmlFor="name" className='text-white'>Fullname</label>
                <input placeholder='Enter your name' type="name" id="name" name="name" className='border border-gray-500 text-white bg-black rounded-md h-10 pl-2' onChange={(e)=>{
                    setname(e.target.value)
                }} />
            </div>
            <div className='flex flex-col space-y-2 mt-4'>
                <label htmlFor="email" className='text-white'>Email</label>
                <input placeholder='Enter your email' type="email" id="email" name="email" className='border border-gray-500 text-white bg-black rounded-md h-10 pl-2' onChange={(e)=>{
                    setemail(e.target.value)
                }} />
            </div>
            <div className='flex flex-col space-y-2 mt-4'>
                <label htmlFor="password" className='text-white'>Password</label>
                <input placeholder='Enter your password' type="password" id="password" name="password" className='border border-gray-500 text-white bg-black rounded-md h-10 pl-2' onChange={(e)=>{
                    setpassword(e.target.value)
                }} />
            </div>
            <div className='flex flex-col space-y-2 mt-4'>
                <label htmlFor="cpassword" className='text-white'>Confirm Password</label>
                <input placeholder='Confirm your password' type="password" id="cpassword" name="cpassword" className='border border-gray-500 text-white bg-black rounded-md h-10 pl-2' onChange={(e)=>{
                    setconfirmpass(e.target.value)
                }} />
            </div>
            {haserror?<p className='text-center text-red-200 pt-4'>⚠️ {error}</p>:null}
            {isLoading?<CircularProgress color="secondary" />:null}
            <button className='text-white w-60 bg-orange-600 h-10 mt-4 rounded-md mx-10 cursor-pointer' type="submit" onClick={()=>{
                registerwithEmail()
            }}>Create Account</button>
            <a className='cursor-pointer text-white mt-4 ' onClick={()=>{
                    router.push('/login')
                }}>Login Instead</a>
        </div>
    </div>
  )
}

export default register
