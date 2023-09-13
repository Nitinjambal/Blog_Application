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
import { useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import axios from "axios";
import { getAccessToken } from "../../utils/commenUtils";

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

const API_URL = "http://localhost:3000/api/v1";

function CreatePost() {
  const [post, setPost] = useState(initalPost);
  const [file, setFile] = useState("");
  const location = useLocation();
  const { userAccount } = useContext(DataContext);
  const navigate=useNavigate()

  const url = post.picture
    ? post.picture
    : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        try {
          const response = await axios.post(
            `${API_URL}/users/file/upload`,
            data,{

            }
          );
          // console.log("res:", response);
          setPost({
            ...post,
            picture: response.data,
            categories: location.search?.split("=")[1] || "All",
            username: userAccount.username,
          });
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    };
    getImage();
  }, [file, location.search, userAccount.username]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const savePost = async () => {
    try {
      const response = await axios.post(`${API_URL}/posts/create`, post,{
        headers: {
                authorization: getAccessToken()
            }
      });
     navigate("/")
    } catch (error) {
      console.log("error:", error);
    }
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
        <Button variant="contained" onClick={savePost}>
          Publish
        </Button>
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
