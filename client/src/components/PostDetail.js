import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import { getPost } from "../actions/posts";
import { CircularProgress, Paper ,Typography,Divider} from "@mui/material";

export default function PostDetail() {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  if (!post) return null;

  if (isLoading) {
    return (
      <Paper elevation={6}>
        <CircularProgress size="10em" />
      </Paper>
    );
  }

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div style={{ display: "flex", width: "100%" }}>
        <div style={{ borderRadius: "20px", margin: "10px", flex: 1 }}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Yorum Alanı</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div sx={{ marginLeft: "20px" }}>
          <img
            sx={{
              borderRadius: "20px",
              objectFit: "cover",
              width: "100%",
              maxHeight: "300px",
            }}
            src={post.selectedFile}
            alt={post.title}
          />
        </div>
      </div>
    </Paper>
  );
}
