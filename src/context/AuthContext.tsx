import { useState, createContext } from 'react'
import { io, Socket } from 'socket.io-client';
import { OnlineUserType, Props, User, UserLoginContextProps } from '../interfaces/Interface';

const UserLoginContext = createContext<UserLoginContextProps>({
    user: null,
    socket: null,
    onlineUsers: null,
    showPosts: [],
    filteredPosts: [],
    saveSocket: (socket: Socket) => { },
    login: () => { },
    logout: () => { },
    funcShowPosts: (data: any) => { },
    funcShowFilteredPosts: (data: any) => { },
    saveUser: (_user: User) => { },
    saveOnlineUsers: (data: OnlineUserType[]) => { }
})

const UserLoginProvider: React.FC<Props> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [socket, setSocket] = useState<Socket | null>(null)
    const [onlineUsers, setOnlineUsers] = useState<OnlineUserType[] | null>(null)
    const [showPosts, setShowPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])

    const funcShowPosts = (data: any) => {
        setShowPosts(data)
    }

    const funcShowFilteredPosts = (data: any) => {
        setFilteredPosts(data)
    }


    const saveOnlineUsers = (data: OnlineUserType[]) => {
        setOnlineUsers(data)
    }

    const saveUser = (_user: User) => {
        setUser(_user);
    };

    const saveSocket = (socket: Socket) => {
        setSocket(socket)
    }

    const login = (token: string) => {
        const socketConecction = io(`http://localhost:8000`, {
            extraHeaders: {
                'Authorization': `Bearer ${token}`
            }
        });
        localStorage.setItem("token", token)
        setUser({ token })
        setSocket(socketConecction)
    }

    const logout = () => {
        localStorage.removeItem("token")
        socket?.close()
        setUser(null);
    }

    return (
        <UserLoginContext.Provider value={{ user, onlineUsers, login, logout, saveUser, socket, saveSocket, saveOnlineUsers, funcShowPosts, funcShowFilteredPosts, showPosts, filteredPosts }}>
            {children}
        </UserLoginContext.Provider>
    )
}
export { UserLoginProvider, UserLoginContext };