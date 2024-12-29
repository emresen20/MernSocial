import React, {  useEffect, useState } from 'react'
import {AppBar,Button,Toolbar,Typography,Avatar} from '@mui/material'
import {Link,useLocation,useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import * as actionType from '../constants/actionTypes'
import { jwtDecode } from 'jwt-decode';



function Navbar() {
  const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')))
  const location=useLocation();//uygulamada user değ,işikliğinde anlık olarak veri güncellemesinde kullanılır

  const navigate=useNavigate();
  const dispatch=useDispatch();

  const logout=()=>{
   dispatch({type:actionType.LOGOUT})
   navigate('/signin')
   setUser(null)
  }

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      if(decodedToken.exp*1000<new Date().getTime()){
        logout()
      }
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);


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
        {user?.result ?(
          <div style={{display:'flex',width:'200px',alignItems:'center',gap:30}}>
            <Avatar >
              {user?.result.name.charAt(0)}
            </Avatar>
            <Button variant='contained' color='secondary' onClick={logout}>Çıkış Yap</Button>
          </div>
        ):(
           <Button component={Link} to='/signin' variant='contained' color='secondary'>
           Giriş Yap
         </Button>
        )}
       </Toolbar>
    </AppBar>
  )
}

export default Navbar