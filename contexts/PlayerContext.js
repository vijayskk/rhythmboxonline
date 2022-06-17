import React, { createContext, useState } from "react";

export const PlayerContext = createContext()

export const PlayerContextProvider = (props)=>{
    const [player, setPlayer] = useState(null);
    return(
        <PlayerContext.Provider value={[player, setPlayer]}>
            {props.children}
        </PlayerContext.Provider>
    )
}