import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { ThumbUp, Delete, MoreHoriz, ThumbDown } from "@mui/icons-material";
import moment from "moment";
import "moment/locale/tr";
import {useDispatch} from 'react-redux'
import { deletePost, likePost } from "../actions/posts";

function Post({ post,setCurrentId}) {
  const dispatch=useDispatch();

  const user=JSON.parse(localStorage.getItem('profile'))

  const LikeControles=()=>{
    if(post.likes.length>0){
        return post.likes.find(likedId=>likedId===user?.result?._id) ? (
          <> <ThumbDown fontSize="small" color="secondary"/>&nbsp; {post.likes.length} </>
        ) :( <> <ThumbUp fontSize="small"/>&nbsp; {post.likes.length} </>)
    }
    return <><ThumbUp fontSize="small"/>&nbsp; 0 </>
  }

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "15px",
        height: "100%",
        position: "relative",
        backgroundColor: "#edede9",
      }}
    >
      <CardMedia
        sx={{
          height: 0,
          paddingTop: "56.25%",
          backgroundColor: "rgba(0,0,0,0.5)",
          backgroundBlendMode: "darken",
        }}
        image={post.selectedFile}
        title={post.title}
      />
      <div
        style={{
          position: "absolute",
          top: "20px",
          color: "white",
          left: "20px",
        }}
      >
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div>
        <Button
          sx={{
            position: "absolute",
            top: "20px",
            right: "20px",
            color: "white",
          }}
          size="large"
          onClick={()=>setCurrentId(post._id)} //burada 3 noktaya basılınca props ile id yi yolladık
        >
          <MoreHoriz />
        </Button>
      </div>
      <div>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px",
          }}
          variant="p"
          color="darkgray"
        >
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography sx={{ 
        padding: "0 10px" 
        }}
        gutterBottom
        variant="h5"
        >
        {post.title}
        </Typography>
        <CardContent>
            <Typography variant="p" color="darkgray">{post.message}</Typography>
        </CardContent>
        <CardActions sx={{
            padding:'0 8px 8px 8px ',
            display:'flex',
            justifyContent:'space-between'
        }}>
            <Button size="small" color="primary" onClick={()=> dispatch(likePost(post._id))} disabled={!user?.result}>
                <LikeControles/>
            </Button>
            <Button size="small" color="secondary" onClick={()=> dispatch(deletePost(post._id))}>
                <Delete fontSize="small" color="secondary" />
            </Button>

        </CardActions>
    </Card>
  );
}

export default Post;
