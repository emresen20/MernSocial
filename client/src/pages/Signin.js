import React from 'react'
import {LockOutlined} from '@mui/icons-material'
import Input from '../components/Input'
import { Avatar, Button, Container, Grid, Paper, Typography } from '@mui/material'


function Signin() {
  return (
    <Container component="main" maxWidth="xs">
      <Paper sx={{marginTop:10, display:'flex', flexDirection:'column',alignItems:'center',padding:2 }} elevation={3}>
        <Avatar>
          <LockOutlined/>
        </Avatar>
        <Typography sx={{marginBottom:5}} component="h1" variant='h5' >
          Giriş Yap
        </Typography>
        <form>
          <Grid container spacing={3}> 
            <Input name="email" label="Email Adresiniz" type="email" />
            <Input name="password" label="Parolanız" type="password" />
          </Grid>
          <Button sx={{marginTop:5}} type='submit' fullWidth  variant='contained' color='primary'>Giriş Yap</Button>
        </form>
      </Paper>

    </Container>
  )
}

export default Signin