import React, { createContext, useEffect, useState } from "react";
import axios from "../api/axios";

const ME_URL = '/users/me';

export const UserContext = createContext();

export const UserProvider =  (props) => {
    const [token, setToken] = useState(localStorage.getItem("sydenGroupToken"))

    useEffect(()=>{
        const _requestOptions = {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token,
            },
        };
      
        try{
            const response =  axios.get(ME_URL, _requestOptions);
            console.log(JSON.stringify(response?.data));
            localStorage.setItem("sydenGroupToken", token)
        } catch (err) {
            setToken(null);
        }
        
    }, [token]);

    return(
        <UserContext.Provider value={[token, setToken]}>
            {props.children}
        </UserContext.Provider>
    )
}