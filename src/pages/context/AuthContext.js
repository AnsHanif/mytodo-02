import React ,{ createContext , useState }from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../config/firebase';


export const AuthContext = createContext();

export default function AuthContextProvider(props) {

    const [isAuthenticated, setisAuthenticated] = useState(false)
    const [user, setUser] = useState({})

onAuthStateChanged(auth, (user) => {
  if (user) {
    setUser(user)
    setisAuthenticated(true)
    // ...
  } else {
    setUser({})
    setisAuthenticated(false)
  }
});

  return (
    <AuthContext.Provider value={{user, isAuthenticated ,setisAuthenticated}}>
        {props.children}
    </AuthContext.Provider>
  )
}