import React, { useState } from 'react'
import {LockOutlined} from '@mui/icons-material'
import Input from '../components/Input'
import { Avatar, Button, Container, Grid, Paper, Typography } from '@mui/material'
import { Link,useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {signin} from '../actions/auth'


const initialState={email:'',password:''}

function Signin() {

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const [form,setForm]=useState(initialState)
  const [showPassword,setShowPassword]=useState(false)

  const handleShowPassword=()=>{
    setShowPassword(!showPassword);
  }

  const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  }

  const handleSumbit=(e)=>{
    e.preventDefault();
    dispatch(signin(form,navigate))
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper sx={{marginTop:10, display:'flex', flexDirection:'column',alignItems:'center',padding:2 }} elevation={3}>
        <Avatar>
          <LockOutlined/>
        </Avatar>
        <Typography sx={{marginBottom:5}} component="h1" variant='h5' >
          Giriş Yap
        </Typography>
        <form onSubmit={handleSumbit}>
          <Grid container spacing={3}> 
            <Input name="email" label="Email Adresiniz" type="email" handleChange={handleChange}/>
            <Input name="password" label="Parolanız" type={showPassword? 'text':'password'} handleChange={handleChange} handleShowPassword={handleShowPassword} />
          </Grid>
          <Button sx={{marginTop:5}} type='submit' fullWidth  variant='contained' color='primary'>Giriş Yap</Button>
          <Grid sx={{marginTop:5}}>
            <Grid item sx={{display:'flex', flexDirection:'row' ,alignItems:'center' , gap:1}}>
              <Typography >
                Henüz üye değilseniz
              </Typography>
              <Typography component={Link} to="/signup"  color='secondary'   sx={{ textDecoration: 'none' }} >
                Üye Ol
              </Typography>
            </Grid>
            
          </Grid>
        </form>
      </Paper>

    </Container>
  )
}

export default Signin