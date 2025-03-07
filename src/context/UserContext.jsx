import { createContext, useState } from "react";

export const UserContext = createContext({})

const UserContextProvider = ({children}) => {

    const [empData, setempData] =  useState([]);

    const value = {
        empData,
        setempData
    }

    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider