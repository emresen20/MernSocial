import React from 'react'
import {AppBar,Button,Toolbar,Typography} from '@mui/material'
import {Link} from 'react-router-dom'

function Navbar() {
  return (
    <AppBar sx={{
    margin:'30px 0',
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding:'10px 50px',
    backgroundColor:'#edede9',
    position:'static',
    color:'#000',
    borderRadius:'10px',
      
    }}>
       <div 
        style={{
          display:'flex',
          alignItems:'center'
        }}>
        <Typography sx={{color:'black',textDecoration:'none'}} variant='h3' component={Link} to="/" align='center'>Shen Social</Typography>
       </div>
       <Toolbar sx={{
        display:'flex',
        justifyContent:'flex-end',
        
       }}>
        <Button component={Link} to='/signin' variant='contained' color='secondary'>
          Giriş Yap
        </Button>
       </Toolbar>
    </AppBar>
  )
}

export default Navbar