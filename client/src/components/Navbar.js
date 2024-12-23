import React from 'react'
import {AppBar,Typography} from '@mui/material'

function Navbar() {
  return (
    <AppBar sx={{marginBottom:'15px',backgroundColor:'#edede9',position:'static',color:'#000',borderRadius:'10px'}}>
        <Typography variant='h2' align='center'>Shen Social</Typography>
    </AppBar>
  )
}

export default Navbar