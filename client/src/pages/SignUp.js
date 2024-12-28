import React, { useState } from 'react'
import {LockPerson} from '@mui/icons-material'
import Input from '../components/Input'
import { Avatar, Button, Container, Grid, Paper, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const initialState={email:'',password:'',firstName:'',lastName:'',confirmPassword:''}

function SignUp() {

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
    console.log(form)
  }


  return (
    <Container component="main" maxWidth="xs">
      <Paper sx={{marginTop:10, display:'flex', flexDirection:'column',alignItems:'center',padding:2 }} elevation={3}>
        <Avatar>
          <LockPerson color='secondary'/>
        </Avatar>
        <Typography sx={{marginBottom:5}} component="h1" variant='h5' >
           Üye Ol
        </Typography>
        <form onSubmit={handleSumbit}>
          <Grid container spacing={3}> 
            <Input name="firstName" label="Adınız" type="text" autoFocus half handleChange={handleChange}/>
            <Input name="lastName" label="Soyadınız" type="text" handleChange={handleChange} half/>  
            <Input name="email" label="Email Adresiniz" type="email" handleChange={handleChange}/>
            <Input name="password" label="Parolanız" type={showPassword? 'text':'password'} handleChange={handleChange} handleShowPassword={handleShowPassword} />
            <Input name="confirmPassword" label="Parolayı Tekrar Giriniz" type={showPassword? 'text':'password'} handleChange={handleChange} handleShowPassword={handleShowPassword} />
          </Grid>
          <Button sx={{marginTop:5}} type='submit' fullWidth  variant='contained' color='secondary'>Üye Ol</Button>
        </form>
      </Paper>

    </Container>
  )
}

export default SignUp