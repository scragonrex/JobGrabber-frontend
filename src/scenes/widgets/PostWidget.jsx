import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
} from '@mui/icons-material';
import {Box, Divider, Typography, IconButton, useTheme} from '@mui/material';
import Friends from '../../components/Friends';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { setPost } from '../../state';
import WidgetWrapper from '../../components/WidgetWrapper';
import FlexBetween from '../../components/FlexBetween';

const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
})=>{
    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state)=>state.token);
    const loggedInUserId = useSelector((state)=>state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likesCount = Object.keys(likes).length;

    const {palette} = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.medium;

    const pathchLike = async()=>{
        const response = await fetch(`http://localhost:3001/posts/${postId}/likes`,
        {
            method:"PATCH",
            headers:{
                Authorization:`Bearer ${token}`,
                "Content-Type":"application/json",
            },
            body:JSON.stringify({userId:loggedInUserId})
        });

        const updatedPost = await response.json();
        dispatch(setPost({post:updatedPost}));
    }
        return(
            <WidgetWrapper m="2rem 0">
                <Friends
                friendId={postUserId}
                name={name}
                subtitle={location}
                userPicturePath={userPicturePath}/>
                    <Typography color={main} sx={{mt:"1rem"}}>
                        {description}
                    </Typography>
                    <Typography>
                        {picturePath && (
                            <img
                            width="100%"
                            height="auto"
                            alt="Post"
                            src={`http://localhost:3001/assets/${picturePath}`}
                            />
                        )}
                    </Typography>
                        <FlexBetween mt="0.25rem">
                            <FlexBetween gap="1rem">

                                {/* Likes Button */}
                                <FlexBetween gap="0.3rem">
                                    <IconButton onClick={pathchLike}>
                                        {isLiked ? (
                                            <FavoriteOutlined sx={{color:primary}}/>)
                                            : (
                                                <FavoriteBorderOutlined/>
                                            )
                                        }
                                    </IconButton>
                                    <Typography>{likesCount}</Typography>
                                </FlexBetween>

                                {/* Comments button */}
                                <FlexBetween gap="0.3rem">
                                    <IconButton onClick={()=>setIsComments(!isComments)}>
                                        <ChatBubbleOutlineOutlined/>
                                    </IconButton>
                                    <Typography>{comments.length}</Typography>
                                </FlexBetween>
                            </FlexBetween>
                            <IconButton>
                                <ShareOutlined/>
                            </IconButton>
                        </FlexBetween>
                        {isComments && (
                            <Box mt="0.5rem">
                                {comments.map((comment,i)=>(
                                    <Box key={`${name}-${i}`}>
                                        <Divider/>
                                        <Typography sx={{color:main, m:"0.5rem 0", pl:"1rem"}}>
                                            {comment}
                                        </Typography>
                                        <Divider/>
                                    </Box>
                                ))}
                            </Box>
                        )}
            </WidgetWrapper>
        )
    }



export default PostWidget;