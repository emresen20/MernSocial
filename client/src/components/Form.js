import React, { useState, useRef } from "react";
import { Paper, TextField, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { createPost } from "../actions/posts";

function Form() {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const fileInputRef = useRef(null); // Dosya inputu için referans

  const cleanIt = () => {
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });

    // Dosya inputunu sıfırla
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const dispatch = useDispatch();

  const handleSumbit = (e) => {
    e.preventDefault(); // Sayfa yenilenmesini engeller
    dispatch(createPost(postData));
  };

  return (
    <Paper sx={{ backgroundColor: "#edede9" }}>
      <form
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
        autoComplete="off"
        noValidate
        onSubmit={handleSumbit}
      >
        <Typography sx={{ marginBottom: "10px" }} variant="h6">
          Post Ekle
        </Typography>
        <TextField
          sx={{ margin: "5px" }}
          name="creator"
          variant="outlined"
          label="Oluşturan"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({
              ...postData,
              creator: e.target.value,
            })
          }
        />
        <TextField
          sx={{ margin: "5px" }}
          name="title"
          variant="outlined"
          label="Başlık"
          fullWidth
          value={postData.title}
          onChange={(e) =>
            setPostData({
              ...postData,
              title: e.target.value,
            })
          }
        />
        <TextField
          sx={{ margin: "5px" }}
          name="message"
          variant="outlined"
          label="Mesaj"
          fullWidth
          multiline
          rows={4}
          value={postData.message}
          onChange={(e) =>
            setPostData({
              ...postData,
              message: e.target.value,
            })
          }
        />
        <TextField
          sx={{ margin: "5px" }}
          name="tags"
          variant="outlined"
          label="Etiket (virgül ile ayırınız)"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({
              ...postData,
              tags: e.target.value.split(","),
            })
          }
        />
        <div style={{ width: "97%", margin: "10px auto" }}>
          <input //base64 çalışmadığından base 64 e çevirme koduß
            ref={fileInputRef} // Dosya inputuna referans ekledik
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.onloadend = () => {
                setPostData((prevState) => ({
                  ...prevState,
                  selectedFile: reader.result,
                }));
              };
              if (file) {
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>

        <Button
          sx={{ marginBottom: "10px" }}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Ekle
        </Button>
        <Button
          sx={{ marginBottom: "10px" }}
          variant="contained"
          color="secondary"
          size="small"
          type="button"
          fullWidth
          onClick={cleanIt}
        >
          Temizle
        </Button>
      </form>
    </Paper>
  );
}

export default Form;
