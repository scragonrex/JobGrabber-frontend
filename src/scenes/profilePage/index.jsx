import { useMediaQuery } from "@mui/material"
import { Box } from "@mui/system"
import {useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Navbar from "../navbar"
import FriendListWidget from "../widgets/FriendListWidget"
import MyPostWidget from "../widgets/MyPostWidget"
import PostsWidget from "../widgets/PostsWidget"
import PostWidget from "../widgets/PostWidget"
import UserWidget from "../widgets/UserWidget"

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const token = useSelector((state)=>state.token);
  const { userId } = useParams(); //For getting the userId from the link URL
  const isNonMobileScreens = useMediaQuery("min-width:1000px");

  const getUser = async()=>{
    const response = await fetch(`http://localhost:3001/users/${userId}`,{
      method:"GET",
      headers:{Authorization:`Bearer ${token}`}
    });
    const data = await response.json();
    setUser(data);
  }

  useEffect(()=>{
    getUser();
  },[]); //eslint-diable-line react-hooks/exhaustive-deps

  if(!user)
  return null;
  return (
    <Box>
    <Navbar/>
    <Box
    width="100%"
    padding="2rem 6%"
    display={isNonMobileScreens ? "flex" : "block"}
    gap="2rem"
    justifyContent="center"
    >
      <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
        <UserWidget userId={userId} picturePath={user.picturePath} />
        <Box m="2rem 0"/>
        <FriendListWidget userId={userId}/>
      </Box>
      <Box
        flexBasis={isNonMobileScreens ? "42%" : undefined}
        mt={isNonMobileScreens ? undefined : "2rem"}
      >
        <MyPostWidget picturePath={user.picturePath}/>
        <PostsWidget userId={userId} isProfile/>
        <Box m="2rem 0"/>
      </Box>
    </Box>
  </Box>
  )
}

export default ProfilePage
