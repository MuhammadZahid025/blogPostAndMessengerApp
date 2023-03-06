import { Avatar, Box, Button, Card, Stack, TextField, Typography } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useCreatePostsMutation } from '../generated/graphql'
import { toast } from 'react-toastify';

const CreatePost = () => {

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            title: "",
            text: ""
        }
    })

    const navigate = useNavigate()

    const [CreatePosts] = useCreatePostsMutation({
        onError({ message }) {
            toast.error("Something went wrong")
        },

        onCompleted(data) {
            toast.success("Post created successfully");
            navigate("/")
            reset()
        }
    })

    const onSubmit = (data: any) => {
        CreatePosts({
            variables: {
                createPostDto: {
                    title: data.title,
                    text: data.text
                }
            },

        })
    }

    return (
        <>
            <Card variant="outlined" sx={{ mt: 2 }}>
                <Stack spacing={1}>
                    <Stack direction="row" sx={{ mt: 2, ml: 2, mr: 2 }}>
                        <Avatar></Avatar>
                        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1, ml: 1 }}>What would you like to post today, Ali Zain?</Typography>
                    </Stack>
                    <Stack>
                        <Box component="form" onSubmit={handleSubmit(onSubmit)} m={2}>
                            <Controller
                                control={control}
                                name="title"
                                render={({ field: { value, onChange } }) => (
                                    <TextField
                                        fullWidth
                                        label="Title"
                                        required
                                        margin='normal'
                                        onChange={onChange}
                                        value={value}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="text"
                                render={({ field: { value, onChange } }) => (
                                    <TextField
                                        fullWidth
                                        label="Text"
                                        required
                                        multiline
                                        rows={10}
                                        margin='normal'
                                        onChange={onChange}
                                        value={value}
                                    />
                                )}
                            />

                            <Button variant="outlined" type="submit" fullWidth sx={{ mt: 2 }}>
                                Submit
                            </Button>
                        </Box>
                    </Stack>


                </Stack>
            </Card>
        </>
    )
}

export default CreatePost