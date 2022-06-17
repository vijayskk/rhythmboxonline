import { VolumeUpIcon } from '@heroicons/react/solid';
import { VolumeUpIcon as VolumeDownIcon  } from '@heroicons/react/outline';
import { FastForwardIcon, RewindIcon, VolumeOffIcon } from '@heroicons/react/solid';
import { PlayIcon } from '@heroicons/react/solid';
import { PauseIcon } from '@heroicons/react/solid';
import React, { useContext, useState } from 'react'
import { PlayerContext } from '../contexts/PlayerContext';

function Player() {

    const [player, setPlayer] = useContext(PlayerContext);
    const [isPlaying, setisPlaying] = useState(false);
    if(player != null){
        return(
            <div>
                
            </div>
        )
    }else{
        return (
            <div className='h-16 md:h-24 bg-gradient-to-b from-black to bg-gray-900 text-white w-screen grid grid-cols-3 text-xs md:text-base px-2 md:px-8'>
                <div className='flex items-center h-full'>
                    <img src="https://www.mostmags.com/wp-content/uploads/2021/12/perfect-250x250.jpg" className='hidden md:inline h-10 w-10' alt="" />
                    <div className='md:ml-6 ml-2'>
                        <h3 className='text-white font-bold '>Song name</h3>
                        <h3 className='text-gray-200 '>Author name</h3>
                    </div>
                </div>


                <div className='flex items-center justify-evenly'>
                    <RewindIcon className='h-8 w-8' />
                    {
                        isPlaying?
                        <PauseIcon className='h-8 w-8' />
                        :
                        <PlayIcon className='h-8 w-8' />
                    }
                    <FastForwardIcon className='h-8 w-8' />
                </div>


                <div className='flex items-center space-x-3 md:space-x-4 justify-end'>
                    <VolumeDownIcon className='md:h-6 md:w-6 h-4 w-4' />
                    <input className='w-16 md:w-32' type="range" name="" value="" min={0} max={100} />
                    <VolumeUpIcon className='h-6 w-6 hidden md:inline' />
                </div>
            </div>
          )
    }
  
}

export default Player
