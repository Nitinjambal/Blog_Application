import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputBase,
  TextareaAutosize,
  styled,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useLocation } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import axios from "axios";

const Container = styled(Box)`
  margin: 20px 100px;
`;

const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});

const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  font-size: 25px;
`;

const TextArea = styled(TextareaAutosize)`
  width: 100%;
  margin-top: 50px;
  font-size: 18px;
  border: none;
  &:focus-visible {
    outline: none;
  }
`;

const initalPost = {
  title: "",
  description: "",
  picture: "",
  username: "",
  categories: "",
  createdDate: new Date(),
};

const API_URL = "http://localhost:3000/api/v1/users";

function CreatePost() {
  const [post, setPost] = useState(initalPost);
  const url = post.picture
    ? post.picture
    : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

  const [file, setFile] = useState("");
  const location = useLocation();
  const { userAccount } = useContext(DataContext);
  console.log("userAccount:", userAccount);

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await axios.post(`${API_URL}/file/upload`, data);
        console.log("res:", response);
        post.picture = response.data;
      }
    };
    getImage();
    post.categories = location.search?.split("=")[1] || "All";
    post.username = userAccount.username;
  }, [file]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Image src={url} alt="postBanner" />
      <StyledFormControl>
        <label htmlFor="fileInput">
          <AddCircleIcon fontSize="large" color="action" cursor="pointer" />
        </label>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <InputTextField
          name="title"
          onChange={(e) => handleChange(e)}
          placeholder="Title"
        />
        <Button variant="contained">Publish</Button>
      </StyledFormControl>
      <TextArea
        name="description"
        onChange={(e) => handleChange(e)}
        minRows={5}
        placeholder="Tell your story....."
      />
    </Container>
  );
}

export default CreatePost;
