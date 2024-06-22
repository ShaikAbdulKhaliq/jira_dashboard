import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const LMSContext = createContext();
export const LMSContextProvider = ({ children }) => {

    const [loginResponse, setLoginResponse] = useState(null)
    const [formData, setFormData] = useState({ Name: '', EmployeeID: '' });
    const[loginStatus, setLoginStatus] = useState({ status: '', message: '' })

    


    return (
        <LMSContext.Provider value={{ loginResponse, setLoginResponse, formData, setFormData, loginStatus, setLoginStatus }}>
            {children}
        </LMSContext.Provider>
    )
}