import { Avatar, Card, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import { AiFillMessage } from 'react-icons/ai'
import Moment from 'react-moment'
import { useNavigate } from 'react-router-dom'

interface Props {
    id: number,
    userName: string,
    createdAt: string,
    title: string,
    text: string,
    numberOfComments?: number
}

const SinglePostCard: React.FC<Props> = (Props) => {
    const { id, userName, createdAt, title, text, numberOfComments } = Props;
    const navigate = useNavigate()
    return (
        <>
            <Card key={id} variant="outlined" sx={{ mt: 2, cursor: "pointer" }} onClick={() => { navigate(`/viewPost/${id}`) }}>
                <Stack direction="row" sx={{ m: 2 }}>
                    <Avatar></Avatar>
                    <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1, ml: 1 }}>{userName}</Typography>
                    <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1, ml: 2 }}><Moment fromNow>{new Date(createdAt)}</Moment></Typography>
                </Stack>
                <Typography variant='h5' sx={{ ml: 5, mb: 2 }}>{title}</Typography>
                <Typography variant='body1' sx={{ ml: 5, mb: 1 }}>{text}</Typography>
                <Stack direction="row" sx={{ ml: 5, mb: 2, mt: 2 }}>
                    <Typography><AiFillMessage /></Typography>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: "bold", ml: 1 }}>
                        {numberOfComments}
                    </Typography>
                </Stack>
            </Card >

        </>
    )
}

export default SinglePostCard