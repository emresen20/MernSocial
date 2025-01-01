import React from 'react'
import { useSelector } from 'react-redux'
import {Grid,CircularProgress} from '@mui/material'
import Post from './Post'

function Posts({setCurrentId}) {
  
  const {posts,isLoading}=useSelector((state)=>{
    console.log(state)
    return state.posts

  })

  if(!posts.length && !isLoading) return 'Henüz Post Eklenmedi'


  console.log(posts)
  return (
    isLoading ? <CircularProgress/>:(
      <Grid container alignItems="stretch" spacing={3}>
        {
          posts.map((post)=>(
            <Grid key={post._id} item xs={12} sm={6}>   
              
              <Post post={post} setCurrentId={setCurrentId} />

            </Grid>
          ))
        }
      </Grid>
    )
  )
}

export default Posts