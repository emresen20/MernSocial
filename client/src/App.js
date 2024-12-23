import { Container, AppBar, Typography, Grow, Grid } from '@mui/material';
import Posts from './components/Posts';
import Form from './components/Form';
import { useEffect, useState } from 'react';
import { getPosts } from './actions/posts';
import { useDispatch } from 'react-redux';
import Navbar from './components/Navbar';

function App() {

  const dispatch = useDispatch();
  const [currentId,setCurrentId]=useState(null) //currentid yi posts a yolladık orada da propslayıp post doldurduk

  useEffect(() => {
    dispatch(getPosts());
    console.log('curennt id',currentId)
  }, [dispatch,currentId]);

  return (
    <Container maxWidth='lg'>
      <Navbar/>
      <Grow in>
        <Container>
          <Grid container justifyContent='space-between' alignItems='stretch' spacing={3}>
            <Grid item xs={12} sm={8}> 
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form setCurrentId={setCurrentId} currentId={currentId}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
