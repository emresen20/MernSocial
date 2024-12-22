import React from 'react'
import {Button, Card,CardActions,CardMedia, Typography} from '@mui/material'
import {ThumbUp,Delete,MoreHoriz} from '@mui/icons-material'
import moment from 'moment'
import 'moment/locale/tr'

function Post({post}) {
  return (
    <Card sx={{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        borderRadius:'15px',
        height:'100%',
        position:'relative',
        backgroundColor:'#edede9'
        }}>
            <CardMedia sx={{
                height:0,
                paddingTop:'56.25%',
                backgroundColor:'rgba(0,0,0,0.5)',
                backgroundBlendMode:'darken'
                }}
                image={post.selectedFile}
                title={post.title}
                />
                <div style={{position:'absolute', top:'20px',color:'white',left:'20px'}}>
                    <Typography variant='h6'>{post.creator}</Typography>
                    <Typography variant='body2'>{moment(post.cratedAt).fromNow()}</Typography>
                    
                </div>
                <div>
                    <Button sx={{position:'absolute',top:'20px',right:'20px',color:'white'}} size='large'>
                        <MoreHoriz/>
                    </Button>
                </div>

          

    </Card>
  )
}

export default Post