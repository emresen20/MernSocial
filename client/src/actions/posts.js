

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

export const createPost=(post)=> async (dispatch)=>{
    try {
        const {data}=await api.postCrate(post)
        dispatch({type:'CREATE',payload:data})
    } catch (error) {
        console.log(error.message)
    }
}

export const updatePost=(id,post)=>async (dispatch)=>{
    try {
        const {data}=await api.postUpdate(id,post);
        dispatch({type:'UPDATE',payload:data})
    } catch (error) {
        console.log(error.message)
    }
}
