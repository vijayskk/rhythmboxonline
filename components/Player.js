import { VolumeUpIcon } from '@heroicons/react/solid';
import { VolumeUpIcon as VolumeDownIcon  } from '@heroicons/react/outline';
import { FastForwardIcon, RewindIcon, VolumeOffIcon } from '@heroicons/react/solid';
import { PlayIcon } from '@heroicons/react/solid';
import { PauseIcon } from '@heroicons/react/solid';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { PlayerContext } from '../contexts/PlayerContext';
import { CircularProgress } from '@mui/material';

function Player() {

    const [player, setPlayer] = useContext(PlayerContext);
    const [isPlaying, setisPlaying] = useState(true);
    const [isLoaded, setisLoaded] = useState(false);
    const [volume, setvolume] = useState(100);
    const audioPlayer = useRef()
    
    const togglePlay = () =>{
        setisPlaying(true)
        audioPlayer.current.play()
        
    }

    const togglePause = () =>{
        setisPlaying(false)
        audioPlayer.current.pause()
        
    }



    if(player == null){
        return(
            <div>
                
            </div>
        )
    }else{
        
        
        
        return (
            <div className='h-16 md:h-24 bg-gradient-to-b from-black to bg-gray-900 text-white w-screen grid grid-cols-3 text-xs md:text-base px-2 md:px-8'>
                <div className='flex items-center h-full'>
                    
                    {!isLoaded?<CircularProgress />:<img src={player.thumbnailurl} className='hidden md:inline h-10 w-10' alt="" />}
                    <audio onLoadedData={()=>{
                        setisLoaded(true)
                    }} ref={audioPlayer} className='hidden' src={player.mp3fileurl} autoPlay >
                        
                    </audio>
                    <div className='md:ml-6 ml-2'>
                        <h3 className='text-white font-bold '>{player.podcastname}</h3>
                        <h3 className='text-gray-200 '>{player.authorname}</h3>
                    </div>
                </div>


                <div className='flex items-center justify-evenly'>
                    <RewindIcon className='h-8 w-8' />


                    {
                        isPlaying?
                        <PauseIcon className='h-8 w-8' onClick={togglePause} />
                        :
                        <PlayIcon className='h-8 w-8' onClick={togglePlay} />
                    }
                    <FastForwardIcon className='h-8 w-8' />
                </div>


                <div className='flex items-center space-x-3 md:space-x-4 justify-end'>
                    <VolumeDownIcon className='md:h-6 md:w-6 h-4 w-4' />
                    <input className='w-16 md:w-32' type="range" name="" value={volume} min={0} max={100} onChange={(e)=>{
                        setvolume(e.target.value)
                        audioPlayer.current.volume = (e.target.value/100)
                    }} />
                    <VolumeUpIcon className='h-6 w-6 hidden md:inline' />
                </div>
            </div>
          )
    }
  
}

export default Player
