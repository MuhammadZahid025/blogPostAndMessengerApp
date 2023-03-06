import { ApolloQueryResult } from "@apollo/client"
import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { FindPostByIdQuery, useCreateCommentMutation } from "../generated/graphql"

interface Props {
    postId: number,
    refetch: () => Promise<ApolloQueryResult<FindPostByIdQuery>>;
    name: string,
    parentId?: number,
    setIsOn?: (vlaue: boolean) => void
}

const CreateComment: React.FC<Props> = (Props) => {
    const { postId, refetch, name, parentId, setIsOn } = Props

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            text: ""
        }
    })

    const [CreateComment] = useCreateCommentMutation({
        onError({ message }) {
            console.log("error", message)
        },

        onCompleted(data) {
            refetch()
            reset()
        }
    })

    const onSubmit = (data: { text: string }) => {
        if (parentId) {
            CreateComment({
                variables: {
                    createCommentDto: {
                        text: data.text,
                        postId: postId,
                        parentId: parentId
                    }
                }
            })
            if (setIsOn) {
                setIsOn(false);
            }
        } else {
            CreateComment({
                variables: {
                    createCommentDto: {
                        text: data.text,
                        postId: postId
                    }
                }
            })
        }
    }
    return (
        <>
            <Card variant="outlined" sx={{ mt: 2 }}>
                <Stack>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ ml: 2, mr: 2, mb: 2 }}>
                        <Typography variant="h5" sx={{ mt: 1, ml: 2, mr: 2 }}>
                            {name === "comment" ? "Comment" : "Reply"}
                        </Typography>
                        <Controller
                            control={control}
                            name="text"
                            render={({ field }) => (
                                <TextField
                                    fullWidth
                                    // label="What are your thoughts on this post?"
                                    label={name === "comment" ? "What are your thoughts on this post?" : "What are your take on this comment?"}
                                    required
                                    {...field}
                                    multiline
                                    rows={name === "comment" ? 2 : 1}
                                    margin='normal'
                                />
                            )}
                        />
                        <Button variant="outlined" type="submit" fullWidth sx={{ mt: 2 }}>
                            Submit
                        </Button>
                    </Box>
                </Stack>
            </Card>
        </>
    )
}
export default CreateComment