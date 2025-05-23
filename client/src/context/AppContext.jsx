import { createContext, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from 'axios'

const  AppContext = createContext

const AppContextProvider = (props) => {

    const [credit, setCredit] = useState(false)

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const {getToken} = useAuth()

    const loadCreditsData = async () => {
        try{
            
            const token = await getToken()
            const {data} = await axios.get(backendUrl+'api/users/credits',{headers:{token}}) 

        }catch(error){

        }
    }

    const value = {
        
    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider