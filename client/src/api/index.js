

import axios from 'axios'

const url='/posts'

export const getPosts=()=>{
    return axios.get(url)
}

export const postCrate=(newPost)=> axios.post(url,newPost)

export const postUpdate=(id,updatedPostData)=>axios.patch(`${url}/${id}`,updatedPostData)