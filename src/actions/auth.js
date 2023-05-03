import { AUTH } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const signin =(formData,navigate)=> async(dispatch)=>{
        try {
            // log in the User

            const { data }= await api.signIn(formData)
            

            dispatch({ type:AUTH , data })

            navigate('/')
        } catch (error) {
            console.log(error)
        }
}

export const signup =(formData,navigate)=> async(dispatch)=>{
    try {
        // register the User
        console.log(formData)

        const {data}= await api.signUp(formData)
        console.log(data)
        dispatch({ type:AUTH , data })

        navigate('/')
    } catch (error) {
        console.log(error)
    }
}
