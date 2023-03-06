
import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";
import { UserLoginContext } from "../context/AuthContext";
import { ChatBoxPage } from "../pages/ChatBoxPage";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import ViewPost from "../pages/ViewPost";
import ProtectedRoute from "../util/ProtectedRoute";
import CreatePost from "./CreatePost";
import Layout from "./Layout";
import LogIn from "./LogIn";
import jwtDecode from 'jwt-decode';



const Views = () => {
    const { user, socket, saveUser, saveSocket, saveOnlineUsers } = useContext(UserLoginContext);
    let LS_user = localStorage.getItem('token');

    useEffect(() => {
        if (!user && !!LS_user) {
            const _user = { token: LS_user };
            saveUser(_user);
        }
    }, [user, saveUser, LS_user]);

    useEffect(() => {
        if (!!user && !socket) {
            const socketConecction = io(`http://localhost:8000`, {
                extraHeaders: {
                    'Authorization': `Bearer ${LS_user}`
                }
            });
            saveSocket(socketConecction)
        }
    }, [user, socket, LS_user, saveSocket])



    useEffect(() => {
        socket?.on("onlineUsers", (data: any) => {
            if (!!user?.token) {
                const currentUser: any = jwtDecode(user.token);
                const newUsersArry = data.users.filter((element: any) => {
                    return element.userId !== currentUser.id
                })
                saveOnlineUsers(data.users);
            }

        })
    }, [socket, saveOnlineUsers, user]);
    return (
        <Router>
            <Routes>
                <Route path='/' element={<ProtectedRoute><Layout><Home /></Layout></ProtectedRoute>} />
                <Route path='/newPost' element={<ProtectedRoute><Layout><CreatePost /></Layout></ProtectedRoute>} />
                <Route path="/viewPost/:id" element={<ProtectedRoute><Layout><ViewPost /></Layout></ProtectedRoute>} />
                <Route path="/chat" element={<ProtectedRoute><ChatBoxPage /></ProtectedRoute>} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/signin' element={<LogIn />} />
                {/* <Route path='/chat' element={< Chat />} /> */}
                {/* <Route /> */}
            </Routes>
        </Router>
    )
}

export default Views