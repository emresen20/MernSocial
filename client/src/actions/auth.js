
import { AUTH } from "../constants/actionTypes";
import * as api from '../api/index'

export const signin=(formdata,navigate)=>async (dispatch)=>{

    try {
        const {data} =await api.signIn(formdata)
        dispatch({type:AUTH,data:data})
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}

export const signup=(formdata,navigate)=>async (dispatch)=>{

    try {
        const {data} =await api.signUp(formdata)
        dispatch({type:AUTH,data:data})
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}