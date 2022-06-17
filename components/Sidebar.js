import React from 'react'

import {
  HomeIcon,
  LibraryIcon,
  SearchIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon

} from '@heroicons/react/outline'

function Sidebar() {
  return (
    <div>
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

        {/* Playlists */}
        <p>Playlist name...</p>
      </div>
    </div>
  )
}

export default Sidebar
