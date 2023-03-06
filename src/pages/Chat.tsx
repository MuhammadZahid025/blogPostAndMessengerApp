import { Box, Button, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { io, Socket } from "socket.io-client"


const Chat = () => {

    const [socket, setSocket] = useState<Socket>();
    const [room, setRoom] = useState<string>();
    const [chat, setChat] = useState<string>();
    const [messageList, setMessageList] = useState<any>([]);



    useEffect(() => {
        const token = localStorage.getItem("token")
        const newSocket = io(`http://localhost:8000`, {
            extraHeaders: {
                'Authorization': `Bearer ${token}`
            }
        });
        setSocket(newSocket);
    }, []);

    socket?.emit('register', '')

    socket?.on('private', (message: string) => {
        console.log(`Received private message: ${message}`);
    });

    const joinRoom = () => {
        if (!!socket) {
            socket?.emit("joinRoom", room);
            console.log("test---->>join-room")
            socket?.on("msgListener", (data) => {
                console.log("------->", data)
            })
        }
    };

    const sendMessage = async (to: string) => {
        if (chat !== "") {
            const content = {
                author: "zahid",
                room: room,
                message: chat,
            };
            socket?.emit("private", { to: 12345, content });
            setChat("");
        }
    };


    useEffect(() => {
        console.log('test');
        socket?.on("receiveMessage", (data) => {
            setMessageList((list: any) => [...list, data]);
        });
    }, [socket]);


    return (
        <div>
            <TextField
                type="text"
                onChange={(e) => {
                    setRoom(e.target.value);
                }}
            />
            <Button
                onClick={() => {
                    joinRoom();
                }}
            >Join room</Button>

            <Box>
                <TextField
                    type="text"
                    onChange={(e) => {
                        setChat(e.target.value);
                    }}
                />
                <Button
                    onClick={() => {
                        sendMessage("12345");
                    }}>
                    send message
                </Button>
                {/* <Button onClick={()=>socket?.close()}>Disconnect</Button> */}
            </Box>
            {
                !!messageList?.length && messageList.map((msg: any, index: number) => {
                    return (
                        <Typography>
                            {`${msg?.data?.author}: ${msg?.data?.message}`}
                        </Typography>
                    )
                })
            }

        </div>
    );
};
export default Chat;