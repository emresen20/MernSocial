

import * as api from '../api'


export const getPosts= ()=> async (dispatch)=>{
    try {
        const {data} = await api.getPosts();  //axiosta dönen veriler data içinde durur
        const action={type:'FETCH_ALL',payload:data}
        dispatch(action)
        console.log('data',data)
    } catch (error) {
            console.log(error.message)
    }   
}
