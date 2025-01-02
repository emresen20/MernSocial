

import * as api from '../api'
import {CREATE,UPDATE,FETCH_ALL,LIKE,DELETE,FETCH_BY_SEARCH,START_LOADING,END_LOADING,FETCH_POST} from '../constants/actionTypes'

export const getPosts= (page)=> async (dispatch)=>{
    try {
        dispatch({type:START_LOADING}) //veri çekilirken bekleme
        const {data} = await api.getPosts(page);  //axiosta dönen veriler data içinde durur
        const action={type:FETCH_ALL,payload:data}
        dispatch(action)
        dispatch({type:END_LOADING})
        console.log('data',data)
    } catch (error) {
            console.log(error.message)
    }   
}

export const getPost=(id)=> async (dispatch)=>{
    try {
        dispatch({type:START_LOADING})
        const {data}=await api.getPost(id);
        console.log(data);
        const action={type:FETCH_POST,payload:data}
        dispatch(action)

        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error.message)
    }
}

export const createPost=(post)=> async (dispatch)=>{
    try {
        dispatch({type:START_LOADING})
        const {data}=await api.postCrate(post)
        dispatch({type:CREATE,payload:data})
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error.message)
    }
}

export const updatePost=(id,post)=>async (dispatch)=>{
    try {
        const {data}=await api.postUpdate(id,post);
        dispatch({type:UPDATE,payload:data})
    } catch (error) {
        console.log(error.message)
    }
}

export const deletePost=(id)=> async (dispatch)=>{
    try {
        await api.postDelete(id);
        dispatch({type:DELETE,payload:id})
    } catch (error) {
        console.log(error.message)
    }
}

export const likePost=(id)=>async (dispatch)=>{
    try {
        const {data}=await api.likeChange(id);
        dispatch({type:LIKE,payload:data})
    } catch (error) {
        console.log(error.message)
        
    }
}

export const getPostsBySearch=(searchQuery)=>async (dispatch)=>{
    try {
        dispatch({type:START_LOADING})
        const {data:{data}}=await api.getSearch(searchQuery);
        dispatch({type:FETCH_BY_SEARCH,payload:data})
        dispatch({type:END_LOADING})
        console.log(data);
    } catch (error) {
        console.log(error)
    }
}

