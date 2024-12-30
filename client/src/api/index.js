

import axios from 'axios'

const url='/posts'

const API=axios.create({baseURL:'http://localhost:3000'}) //bu apiyi aşağıda kullanuyoruz çünkü authorazationu eklemek istiyoruz

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){ //localde profilede veri var mı ?
        req.headers.Authorization=`Bearer ${JSON.parse(localStorage.getItem('profile')).token}` // bu bilgiyi headersata Authorizationı dolduruyoruz
    }
    return req
})

export const getPosts=(page)=>{
    return axios.get(`${url}/?page=${page}`)
}

export const postCrate=(newPost)=> API.post(url,newPost)

export const postUpdate=(id,updatedPostData)=>API.patch(`${url}/${id}`,updatedPostData)

export const postDelete=(id)=>API.delete(`${url}/${id}`)

export const likeChange=(id)=>API.patch(`${url}/${id}/likePost`)

export const signIn=(formData)=>axios.post('/user/signin',formData)

export const signUp=(formData)=>axios.post('/user/signup',formData)

export const getSearch=(searchQuery)=>API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}`)



// export const postUpdate=(id,updatedPostData)=>axios.patch(`${url}/${id}`,updatedPostData)  bunları değiştirdik API KOYDUIK

// export const postDelete=(id)=>axios.delete(`${url}/${id}`)

// export const likeChange=(id)=>axios.patch(`${url}/${id}/likePost`)

// export const signIn=(formData)=>axios.post('/user/signin',formData)

// export const signUp=(formData)=>axios.post('/user/signup',formData)