import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { commentPost } from "../actions/posts";

export default function CommentSection({ post }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const dispatch=useDispatch();
  const user=JSON.parse(localStorage.getItem('profile'))

  const handleComment = async () => {
    const yorum=`${user.result.name} : ${comment}`; // burada ismiyle birlikte birleştirebilmek için yapıldı
    dispatch(commentPost(yorum,post._id)) // commentpost valuesi için yorum id için de post._id yi verdik
  };


  return( 
  <div>
    <div
      style={{
        display: "flex",
        justifyContent:'space-between'
      }}
    >
        <div style={{height:'200px',overflow:'auto',marginRight:'30px'}}>
            <Typography gutterBottom variant="h6"> Yorumlar</Typography>
            {
                comments.map((c,i)=>(
                    <Typography key={i} gutterBottom variant="subtitle1">Yorum (c)</Typography>
                ))
            }
        </div>
            {
              user?.result?.name && (
                <div style={{width:'40%'}}>
                <Typography gutterBottom variant="h6">
                    Yorum Yazınız
                </Typography>
                <TextField fullWidth multiline rows={4} variant="outlined" label="Yorumunuz" value={comment} 
                onChange={(e)=> setComment(e.target.value)}/>
                <br/>
                <Button sx={{marginTop:'10px'}} fullWidth disabled={!comment.length} color="primary" 
                variant="contained" onClick={handleComment}>Yorum Yap</Button>
            </div>
              )
            }
    </div>
  </div>
  )}
