import React from 'react'
import {Paper,TextField,Button,Typography } from '@mui/material'

function Form() {
  return (
    <Paper sx={{backgroundColor:'#edede9'}}>
      <form style={{display:'flex',flexWrap:'wrap',justifyContent:'center'}} autoComplete='off' noValidate>
        <Typography sx={{marginBottom:'10px'}} variant='h6'>Post Ekle</Typography>
        <TextField sx={{margin:'5px' }} name='creator' variant='outlined' label='Oluşturan' fullWidth/>
        <TextField sx={{margin:'5px' }} name='title' variant='outlined' label='Başlık' fullWidth/>
        <TextField sx={{margin:'5px' }} name='message' variant='outlined' label='Mesaj' fullWidth multiline rows={4}/>
        <TextField sx={{margin:'5px' }} name='tags' variant='outlined' label='Etiket (virgül ile ayırınız)' fullWidth/>
        {/* dosya seçtirme */}

        <Button sx={{marginBottom:'10px'}} variant='contained' color='primary' size='large' type='sumbit' fullWidth>Ekle</Button>
        <Button sx={{marginBottom:'10px'}} variant='contained' color='secondary' size='small' type='sumbit' fullWidth>Temizle</Button>
      </form>
    </Paper>
  )
}

export default Form