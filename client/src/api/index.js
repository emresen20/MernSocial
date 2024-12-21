

import axios from 'axios'

const url='/posts'

export const getPosts=()=>{
    return axios.get(url)
}