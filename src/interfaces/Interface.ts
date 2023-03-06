import { ReactElement } from "react";
import { Socket } from "socket.io-client";

export interface User {
  token: string;
}

export interface UserLoginContextProps {
  user: User | null;
  showPosts: any;
  filteredPosts: any;
  socket: Socket | null;
  onlineUsers: OnlineUserType[] | null;
  login: (token: string) => void;
  logout: () => void;
  saveUser: (_user: User) => void;
  saveSocket: (socket: Socket) => void;
  funcShowPosts: (data: any) => void;
  funcShowFilteredPosts: (data:any) =>void;
  saveOnlineUsers: (data: OnlineUserType[]) => void;
}

// export interface PostsType{

// }

export interface Props {
  children: ReactElement;
}

export interface OnlineUserType {
  userId: string;
  data: {
    socketId: string;
    name: string;
  };
}
export interface Message {
  senderId: string;
  receiverId: string;
  message: string;
  time: string;
}
export interface Room {
  roomName: string;
  messages: Message[];
}

export interface ChatClickPayload {
  id: string;
  name: string;
  socketId: string;
}

export interface SendMessage {
  textMsg: string;
}

export interface CurrentUser {
  email: string;
  id: string;
  exp: number;
  iat: number;
}
