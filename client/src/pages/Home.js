import React, { useEffect, useState } from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField } from '@mui/material';
import Posts from '../components/Posts';
import Form from '../components/Form';
import { useDispatch } from 'react-redux';
import { getPosts } from '../actions/posts';
import Paginate from '../components/Pagination';
import { useNavigate } from 'react-router-dom';

function Home() {

  const dispatch = useDispatch();
  const navigate=useNavigate();
  const [currentId,setCurrentId]=useState(null) //currentid yi posts a yolladık orada da propslayıp post doldurduk
  const [serach,setSerach]=useState('')

  useEffect(() => {
    dispatch(getPosts());
    console.log('curennt id',currentId)
  }, [dispatch,currentId]);

  const searchPost=()=>{
    if(serach.trim()){ //trim baştaki ve sondaki boşlukları kaldırna bir javascript metodudur.
      console.log(serach)
    }else{
      navigate('/')
    }
  }

  const handleKeyPress=(e)=>{
    if(e.keyCode==13){ //13cü tuş entere denk geliyor
      searchPost()
    }
  }

  return (
    <Grow in>
        <Container>
          <Grid container justifyContent='space-between' alignItems='stretch' spacing={3}>
            <Grid item xs={12} sm={8}> 
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <AppBar sx={{borderRadius:4,marginBottom:'1rem', display:'flex', padding:'8px', backgroundColor:'#e9ecef'}} position='static' color='inherit' >
                <TextField name='search' variant='outlined' label="Post Ara" fullWidth value={serach} onChange={(e)=>setSerach(e.target.value)} onKeyDown={handleKeyPress}/> 
              </AppBar>
              <Form setCurrentId={setCurrentId} currentId={currentId}/>
              <Paper sx={{borderRadius:4,marginTop:'1rem',padding:'16px'}} elevation={6}>
                <Paginate/>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Grow>
      ////e.target.value, kullanıcının input alanına girdiği yeni değerdir.
  )
}

export default Home