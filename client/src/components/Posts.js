import React from 'react'
import { useSelector } from 'react-redux'
import {Grid,CircularProgress} from '@mui/material'
import Post from './Post'

function Posts() {
  const posts=useSelector((state)=>{
    return state.posts

  })
  console.log(posts)
  return (
    !posts.length ? <CircularProgress/>:(
      <Grid container alignItems="stretch" spacing={3}>
        {
          posts.map((post)=>(
            <Grid key={post._id} item xs={12} sm={6}>   
              
              <Post post={post} />

            </Grid>
          ))
        }
      </Grid>
    )
  )
}

export default Posts