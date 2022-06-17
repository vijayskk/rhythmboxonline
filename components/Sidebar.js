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
  const [allchannels, setallchannels] = useState([]);
  const [fullchannels, setfullchannels] = useState([]);
  useEffect(()=>{
    if(user){
      var tempallchannels = []
      var tempfullchannels = []
      db.collection("channels").get().then(data=>{
        data.forEach((obj)=>{
          if(obj.data().owneremail == user.email){
            var storedata = {
              ...obj.data(),
              id:obj.id
            }
            tempallchannels = [...tempallchannels,storedata]
          }else{
            var storedata = {
              ...obj.data(),
              id:obj.id
            }
            tempfullchannels = [...tempfullchannels,storedata]
          }
          
        })
        setallchannels(tempallchannels)
        console.log(tempallchannels)
        setfullchannels(tempfullchannels)
        console.log(tempallchannels)
      })
    }
  },[user,channelrefresh])

  return ( 
    <div className='overflow-y-scroll scrollbar-hide h-screen '>
      <div className='text-gray-500 p-5 space-y-2'>
        <button className='flex items-center space-x-2 hover:text-white'>
          <HomeIcon className='h-5 w-5' />
          <p className=''>Home</p>
        </button>

        <button className='flex items-center space-x-2 hover:text-white'> 
          <LibraryIcon className='h-5 w-5' />
          <p className=''>Search</p>
        </button>

        <button className='flex items-center space-x-2 hover:text-white'>
          <SearchIcon className='h-5 w-5' />
          <p className=''>Library</p>
        </button>

        
        <hr className='border-t-[0.1px] border-gray-900' />

        <button className='flex items-center space-x-2 hover:text-white'>
          <PlusCircleIcon className='h-5 w-5' />
          <p className=''>Create Playlist</p>
        </button>

        <button className='flex items-center space-x-2 hover:text-white'> 
          <HeartIcon className='h-5 w-5' />
          <p className=''>Liked Podcasts</p>
        </button>

        <button className='flex items-center space-x-2 hover:text-white'>
          <RssIcon className='h-5 w-5' />
          <p className=''>Your Episodes</p>
        </button>

        
        <hr className='border-t-[0.1px] border-gray-900 pb-4' />

        {(allchannels.length>0)?<p className='text-white'>My Channels</p> :null}
        {/* Playlists */}
        {
          allchannels.map((obj)=>{
            return(
              <p className='text-gray-500 hover:text-white cursor-pointer' onClick={()=>{
                router.push(`/channels?id=${obj.id}`)
              }}>{obj.channelname}</p>    
            )
          })
        }

        <hr className='border-t-[0.1px] border-gray-900 pb-4' />


        {(fullchannels.length>0)?<p className='text-white'>All Channels</p> :null}
        {/* Playlists */}
        {
          fullchannels.map((obj)=>{
            return(
              <p className='text-gray-500 hover:text-white cursor-pointer' onClick={()=>{
                router.push(`/channels?id=${obj.id}`)
              }}>{obj.channelname}</p>    
            )
          })
        }
        
      </div>
    </div>
  )
}

export default Sidebar
