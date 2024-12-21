import React from 'react'
import { useSelector } from 'react-redux'

function Posts() {
  const posts=useSelector((state)=>{
    return state.posts

  })
  console.log(posts)
  return (
    <div>Posts</div>
  )
}

export default Posts