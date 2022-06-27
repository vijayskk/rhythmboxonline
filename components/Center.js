import React, { useEffect, useState } from 'react'
import Header from './Header'
import { shuffle } from 'lodash'


function Center(props) {

    const colors = [
        "from-indigo-500",
        "from-blue-500",
        "from-green-500",
        "from-red-500",
        "from-yellow-500",
        "from-pink-500",
        "from-purple-500",
    ]
    const [color, setcolor] = useState(null);

    useEffect(()=>{
        setcolor(shuffle(colors).pop());
    })

    return (
        <div className='flex-grow h-screen overflow-y-scroll scrollbar-hide'>
        <Header showAdd={props.showAdd} />
        <section className={`flex items-end space-x-7 bg-gradient-to-b  to-black ${color} h-40 md:h-80`}>
            <p className='text-white text-4xl md:text-7xl font-bold ml-10'>{props.title}</p>
        </section>
            {props.children}
        </div>
    )
}

export default Center
