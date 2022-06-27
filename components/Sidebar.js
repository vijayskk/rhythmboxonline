import React, { useContext, useEffect, useState } from 'react'
import {useRouter} from 'next/router'
import {
  HomeIcon,
  LibraryIcon,
  SearchIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon

} from '@heroicons/react/outline'
import { db ,auth} from '../firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import { ChannelRefreshContext } from '../contexts/ChannelRefreshContext'

function Sidebar() {
  const [channelrefresh, setchannelrefresh] = useContext(ChannelRefreshContext);
  const router = useRouter()
  const [user] = useAuthState(auth)

  useEffect(()=>{
    if(user){
      
    }
  },[user,channelrefresh])

  return ( 
    <div className='overflow-y-scroll scrollbar-hide h-screen hidden md:inline-flex'>
      <div className='text-white p-5 space-y-2'>
        <button onClick={()=>{
          router.push('/')
        }} className='flex items-center space-x-2 hover:text-white'>
          <HomeIcon className='h-5 w-5' />
          <p className=''>Home</p>
        </button>



        <button className='flex items-center space-x-2 hover:text-white'>
          <SearchIcon className='h-5 w-5' />
          <p className=''>Search</p>
        </button>

        
        <hr className='border-t-[0.1px] border-gray-900' />

        <button onClick={()=>{
          router.push('/likes')
        }} className='flex items-center space-x-2 text-white'> 
          <HeartIcon className='h-5 w-5' />
          <p className=''>Liked Podcasts</p>
        </button>

        
        <hr className='border-t-[0.1px] border-gray-900 pb-4' />

        
      </div>
    </div>
  )
}

export default Sidebar
