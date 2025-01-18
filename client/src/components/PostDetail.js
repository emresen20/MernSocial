import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { getPost, getsPostsByTags } from "../actions/posts";
import { CircularProgress, Paper, Typography, Divider } from "@mui/material";
import CommentSection from "./CommentSection";

export default function PostDetail() {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post?.tags?.length > 0) {
      dispatch(getsPostsByTags(post.tags.join(",")));
    }
  }, [post]);
  
  //console.log('posts',posts)

  const recommendPosts = posts?.filter(({ _id }) => _id && _id !== post?._id) || [];
 //gelen datada bizim içinde olduğumuz postta olduğundan filteledik
  //console.log('recommendPosts',recommendPosts)

  const openPost = (_id) => {
    navigate(`../posts/${_id}`);
  };

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
          <CommentSection post={post}/>
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div style={{ marginLeft: "20px", maxWidth: "300px" }}>
          <img
            style={{
              borderRadius: "20px",
              objectFit: "cover",
              width: "100%",
              height: "200px", // Resmin yüksekliği ayarlanabilir
            }}
            src={post.selectedFile || "placeholder-image-url"}
            alt={post.title || "Post Image"}
          />
        </div>
      </div>
      {!!recommendPosts.length && ( //Eğer recommendPosts.length sıfırsa (yani dizi boşsa), !! bunu false'a dönüştürür.
        <div style={{ borderRadius: "20px", margin: "10ps", flex: 1 }}>
          <Typography gutterBottom variant="h5">
            Bu Postlar da ilginizi çekebilir
          </Typography>
          <Divider />
          <div
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          >
            {recommendPosts.map(
              ({ title, name, message, likes, selectedFile, _id }) => (
                <div
                  style={{ margin: "20px", cursor: "pointer" }}
                  key={_id}
                  onClick={() => openPost(_id)}
                >
                  <Typography gutterBottom variant="h6">
                    {title}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {name}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {message}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    Begeni Sayısı: {likes.length}
                  </Typography>
                  <img src={selectedFile} width="200px" />
                </div>
              )
            )}
          </div>
        </div>
      )}
    </Paper>
  );
}
