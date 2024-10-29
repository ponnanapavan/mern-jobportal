import { createContext, useContext, useState } from "react"


const AuthContext=createContext(null)


export const useAuthContext=()=>{
      return useContext(AuthContext)
}



export const AuthProvider=({children})=>{

    const [auth,setAuth]=useState(null)
      return <AuthContext.Provider  value={{auth,setAuth}}>
          {children}
      </AuthContext.Provider>
}