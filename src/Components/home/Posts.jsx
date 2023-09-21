import { Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:3000/api/v1/posts";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/allPosts`);
        setPosts(data.getPost);
      } catch (error) {
        console.log("error:", error);
      }
    };

    fetchData();
  }, []);

  console.log(posts);
  return (
    <Box>
      {posts && posts.length > 0 ? (
        posts?.map((post) => (
          <Box key={post._id}>
            <img src={post.picture} alt="blog" />
            <Typography>{post.categoary}</Typography>
            <Typography>{post.title}</Typography>
            <Typography>{post.username}</Typography>
            <Typography>{post.description}</Typography>)
          </Box>
        ))
      ) : (
        <Box style={{ color: "#878787", margin: "30px 80px", fontSize: 18 }}>
          There is no post at this moment please create new post
        </Box>
      )}
    </Box>
  );
}

export default Posts;
