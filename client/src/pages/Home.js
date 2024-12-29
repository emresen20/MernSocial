import React, { useEffect, useState } from 'react'
import { Container, Grow, Grid, Paper } from '@mui/material';
import Posts from '../components/Posts';
import Form from '../components/Form';
import { useDispatch } from 'react-redux';
import { getPosts } from '../actions/posts';
import Paginate from '../components/Pagination';

function Home() {

  const dispatch = useDispatch();
  const [currentId,setCurrentId]=useState(null) //currentid yi posts a yolladık orada da propslayıp post doldurduk

  useEffect(() => {
    dispatch(getPosts());
    console.log('curennt id',currentId)
  }, [dispatch,currentId]);
  return (
    <Grow in>
        <Container>
          <Grid container justifyContent='space-between' alignItems='stretch' spacing={3}>
            <Grid item xs={12} sm={8}> 
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form setCurrentId={setCurrentId} currentId={currentId}/>
              <Paper sx={{borderRadius:4,marginTop:'1rem',padding:'16px'}} elevation={6}>
                <Paginate/>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Grow>
  )
}

export default Home