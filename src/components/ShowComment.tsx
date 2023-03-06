import { Avatar, Box, Button, Card, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { AiFillEdit } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { BsReplyFill } from "react-icons/bs";
import Moment from 'react-moment';
import { useFindRepliesWithCommentIdLazyQuery } from '../generated/graphql';
import CreateComment from './CreateComment';


interface Props {
    name: string,
    createdAt: Date,
    text: string,
    // refetch: () => Promise<ApolloQueryResult<FindPostByIdQuery>> | Promise<ApolloQueryResult<FindRepliesWithCommentIdQuery>>,
    refetch: any,
    postId?: number
    parentId: number
    replyCount: number
}

const ShowComment: React.FC<Props> = (props) => {
    const { name, createdAt, text, refetch, postId, parentId, replyCount } = props
    const [isOn, setIsOn] = useState(false)
    const [showReply, setShowReply] = useState(false)
    // const [replies, setResplies] = useState<Comments[]>([]);

    console.log("------->parentId", parentId)


    const [findReplies, { data, refetch: replyRefetch }] = useFindRepliesWithCommentIdLazyQuery({
        onCompleted: (data) => {
            if (data.replies) {
                console.log("---->replyData", data)
                // setResplies(data?.replies)
                setShowReply(true)
            }

        }
    })


    const handleReply = (id: number) => {
        if (showReply) {
            setShowReply(false);
        } else {
            findReplies({
                variables: {
                    commentId: id
                }
            })
        }
    }
    return (
        <>
            {
                <Card sx={{ backgroundColor: "#F0F0F0", mt: 2 }}>
                    <Box sx={{ m: 2 }}>
                        <Stack direction="row" sx={{ m: 2 }} justifyContent="space-between">

                            <Box sx={{ display: "flex" }}>
                                <Avatar></Avatar>
                                <Typography variant="subtitle1" color="text.primary" sx={{ mt: 1, ml: 1 }}>{name}</Typography>
                                <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1, ml: 1 }}><Moment fromNow>{new Date(createdAt)}</Moment></Typography>

                            </Box>
                            <Box sx={{ mt: 2, width: "100px", display: "flex", justifyContent: "space-around" }} >
                                <BsReplyFill color='#1976d2' onClick={() => setIsOn(!isOn)} cursor="pointer" />
                                <AiFillEdit color='#1976d2' />
                                <BiTrash color='red' />
                            </Box>


                        </Stack>
                        <Typography variant='body1' sx={{ ml: 3, mb: 1 }}>{text}</Typography>
                        {isOn && <CreateComment
                            name="reply"
                            refetch={refetch}
                            postId={postId!}
                            parentId={parentId}
                            setIsOn={setIsOn!}
                        // replyCount={replyCount}
                        />}
                        {
                            replyCount > 0 ? <Button
                                sx={{ ml: 2 }}
                                style={{ textTransform: 'none' }}
                                onClick={() => handleReply(parentId)}>
                                {showReply ? "Hide Reply " : `${replyCount} Replies`}
                            </Button> : ""
                        }


                        {showReply && !!data?.replies.length &&
                            data.replies?.map(reply => {
                                return (
                                    <ShowComment
                                        name={reply.user.name}
                                        createdAt={reply.createdAt}
                                        text={reply.text}
                                        refetch={replyRefetch}
                                        postId={reply.postsId!}
                                        parentId={reply.id}
                                        replyCount={reply?.replyCount!}
                                    />
                                )
                            })
                        }
                    </Box>
                </Card>
            }
        </>
    )
}
export default ShowComment