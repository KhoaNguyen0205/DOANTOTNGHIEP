/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import axios from "axios";
import { createContext, useEffect, useState } from "react";



 
export const UserContext = createContext({});

export function UserContextProvider({children}) {
   const [admin,setAdmin] = useState(null);
   const [user,setUser] = useState(null); 
   const [ready,setReady] = useState(false);
   useEffect( () => {
      if (!user) {
        axios.get('/profile').then(({data}) => {
            setUser(data);
            setReady(true);
        });
        
      }
   }, []);
  return(
     <UserContext.Provider value={{user,setUser,ready}}> 
     {children}
     </UserContext.Provider>
  );
}