import SendIcon from '@mui/icons-material/Send';
import { Avatar, Box, Card, Container, Grid, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import { createRef, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Navbar from '../components/NavBar';
import { UserLoginContext } from '../context/AuthContext';
import { ChatClickPayload, CurrentUser, Room, SendMessage } from '../interfaces/Interface';
import Brightness1Icon from '@material-ui/icons/Brightness1';


export const ChatBoxPage = () => {

    const { handleSubmit, register, reset } = useForm({
        defaultValues: {
            textMsg: ""
        }
    })

    const [receiverId, setReceiverId] = useState("")
    const [roomMessages, setRoomMessages] = useState<Room[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<Room>({ roomName: "", messages: [] });
    const [notification, setNotification] = useState<string[]>([]);
    const [clickedUserName, setClickedUserName] = useState("")
    const loginContext = useContext(UserLoginContext)
    const { socket, onlineUsers, user } = loginContext
    const currentUser: CurrentUser = jwtDecode(user!.token);
    const currentUserfromSocket = onlineUsers?.find((emelent) => emelent.userId === currentUser.id)

    const messagesRef = createRef<HTMLDivElement>();

    const onlineUsersExcludeMe = onlineUsers?.filter(users => users.userId !== currentUser.id)

    useEffect(() => {
        socket?.on("groupChat", (payload: Room) => {
            const { roomName, messages } = payload;
            const data = { roomName: roomName, messages: [...messages] };
            if (!roomMessages?.length) {
                setRoomMessages([data]);
            } else {
                const alreadyExistsIndex = roomMessages.findIndex(room => room.roomName === data.roomName);
                if (alreadyExistsIndex > -1) {
                    const updatedRooms = [...roomMessages];
                    updatedRooms[alreadyExistsIndex] = { ...updatedRooms[alreadyExistsIndex], messages: [...data.messages] };
                    setRoomMessages([...updatedRooms]);
                } else {
                    setRoomMessages([...roomMessages, data]);
                }
            }
            if (check(selectedRoom.roomName, roomName) || selectedRoom.roomName === '') {
                setSelectedRoom({ ...data });
            }
        })
        // return () => {
        //     socket?.off('chat')
        // }
    }, [roomMessages, socket, selectedRoom.roomName, selectedRoom])

    useEffect(() => {
        socket?.on("chat", (payload: Room) => {
            const { roomName, messages } = payload;
            const senderId = messages[messages.length - 1].senderId;
            if (roomName !== selectedRoom.roomName) {
                setNotification([...notification, senderId]);
            }
            const data = { roomName: roomName, messages: [...messages] };
            const alreadyExistsIndex = roomMessages.findIndex(room => room.roomName === data.roomName);
            if (alreadyExistsIndex > -1) {
                const updatedRooms = [...roomMessages];
                updatedRooms[alreadyExistsIndex] = { ...updatedRooms[alreadyExistsIndex], messages: [...data.messages] };
                setRoomMessages([...updatedRooms]);
            } else {
                setRoomMessages([...roomMessages, data]);
            }
            if (check(selectedRoom.roomName, roomName)) {
                setSelectedRoom({ ...data });
            }
        });
        if (!!messagesRef?.current?.scrollIntoView)
            messagesRef.current.scrollIntoView({ behavior: "smooth" });
        return () => {
            socket?.off('chat')
        }
    }, [socket, roomMessages, selectedRoom.roomName, messagesRef, notification])


    const check = (currentRoom: string, room: string) => {
        if (currentRoom === room)
            return true;
        else {
            const strArr = currentRoom.split('&');
            const newRoomId = `${strArr[1]}&${strArr[0]}`;
            if (newRoomId === room)
                return true;
            else
                return false;
        }
    }

    const handleChatClick = (paylaod: ChatClickPayload) => {
        const { socketId, id, name } = paylaod
        const updatedNotification = notification.filter(notification => notification !== id)
        setNotification([...updatedNotification])
        const roomName = `${currentUser.id}&${id}`;
        const dataToEmit = {
            roomName: roomName,
            userId: currentUser.id,
            senderSocketId: currentUserfromSocket?.data.socketId,
            receiverSocketId: socketId,
            userName: currentUserfromSocket?.data.name,
        }
        socket?.emit("joinRoom", dataToEmit)

        setClickedUserName(name)
        setReceiverId(id)
    }

    const handleSendMessage = (payload: SendMessage) => {
        const roomName = `${currentUser.id}&${receiverId}`;
        const timeSent = moment(new Date()).format('hh:mm A');
        const dataToEmit = {
            roomName: roomName,
            senderId: currentUser.id,
            receiverId: receiverId,
            message: payload.textMsg,
            timeSent: timeSent
        }
        socket?.emit("sendMessage", dataToEmit)
        reset()
    }

    return (
        <>
            <Navbar />
            <Container maxWidth="md">
                <Grid container spacing={2}>
                    <Grid item md={4}>
                        <Typography variant="h6" sx={{ ml: 7, mt: 3 }}>Chat</Typography>
                        {
                            !!onlineUsersExcludeMe?.length && onlineUsersExcludeMe.map((user, index) => {

                                return (
                                    <Box sx={{ m: 1, }} key={user.userId}>
                                        <Card
                                            variant='outlined'
                                            sx={{ cursor: "pointer", '&:hover': { color: 'red', }, display: "flex" }}
                                            onClick={() => handleChatClick({ id: user.userId, name: user.data.name, socketId: user.data.socketId })}
                                        >
                                            <>
                                                <Typography variant='h6' sx={{ ml: 3 }}>
                                                    {user.data.name}
                                                </Typography>
                                                <Typography sx={{ ml: 3, mt: 1 }}>
                                                    {!!notification.find(element => element === user?.userId) && <Brightness1Icon style={{ color: "#c73636", fontSize: "15px" }} />}
                                                </Typography>
                                            </>
                                        </Card>
                                    </Box>
                                )
                            })
                        }

                    </Grid>
                    {!clickedUserName ? <Typography sx={{ m: "150px" }}>No user selected!</Typography> :
                        <Grid item xs={12} md={8}>
                            <Card variant="outlined">
                                <Box>
                                    <Stack direction="row" sx={{ backgroundColor: "#F0F0F0" }}>
                                        <Avatar sx={{ m: 2 }}></Avatar>
                                        <Typography variant="subtitle1" color="text.primary" sx={{ m: 3, ml: 1 }}> {clickedUserName}</Typography>
                                    </Stack>
                                </Box>
                                <Box sx={{
                                    width: 560,
                                    height: 610,
                                    background: '#F0F0F0',
                                    overflowY: "auto"
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: '100%',
                                        background: '#F0F0F0'
                                    }}>
                                        {
                                            (
                                                selectedRoom?.roomName === `${currentUser.id}&${receiverId}`
                                                || selectedRoom?.roomName === `${receiverId}&${currentUser.id}`
                                            )
                                            && (!!selectedRoom?.messages?.length) &&
                                            selectedRoom?.messages.map((msg, index) => {
                                                return (
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: !!msg?.senderId && msg.senderId === currentUser?.id ? 'flex-end' : 'flex-start',
                                                            padding: '0.7em',
                                                        }}
                                                        key={index}
                                                    >
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                alignItems: 'end'
                                                            }}
                                                        >
                                                            <Box sx={{
                                                                bgcolor: !!msg?.senderId && msg.senderId === currentUser?.id ? '#dcf8c6' : '#fff',
                                                                padding: "0.7em",
                                                                borderRadius: 1,
                                                                lineBreak: "anywhere"
                                                            }}>
                                                                <Typography variant="body1" sx={{ lineHeight: '100%' }}>
                                                                    {msg.message}
                                                                </Typography>

                                                            </Box>
                                                            <Typography sx={{ fontSize: '12px', mt: '5px' }}>{msg.time}</Typography>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div ref={messagesRef} />
                                </Box>

                                <Box component="form" onSubmit={handleSubmit(handleSendMessage)}>
                                    <TextField
                                        fullWidth
                                        label="Say Hi"
                                        type="textMsg"
                                        {...register("textMsg")}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton edge="end" type='submit'>
                                                        <SendIcon color='primary' cursor="pointer" />
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Box>

                            </Card>
                        </Grid>
                    }
                </Grid>
            </Container>
        </>
    )
}
