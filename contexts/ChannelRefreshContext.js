import React, { createContext, useState } from "react";

export const ChannelRefreshContext = createContext()

export const ChannelRefreshContextProvider = (props)=>{
    const [channelrefresh, setchannelrefresh] = useState(1);
    return(
        <ChannelRefreshContext.Provider value={[channelrefresh, setchannelrefresh]}>
            {props.children}
        </ChannelRefreshContext.Provider>
    )
}