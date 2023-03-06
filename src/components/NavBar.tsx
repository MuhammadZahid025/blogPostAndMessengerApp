import { Avatar, Button, Container, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { UserLoginContext } from "../context/AuthContext";
import jwtDecode from 'jwt-decode';
import Search from "./Search";


const Navbar = () => {
    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    const loginContext = useContext(UserLoginContext)
    const { logout, user } = loginContext

    const currentUser: any = jwtDecode(user!.token);

    // const handleSubmit = () => {
    //     console.log("test")
    // }
    // const handleChange = (e: any) => {
    //     console.log("test")
    // }

    const handleLogOut = () => {
        logout()
        navigate("/signin")
    }

    return (
        <Container maxWidth="md">
            <Stack mb={2}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ pt: 2, pb: 0, }}>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                        <AiFillHome size={25} fill="#1976d2" />
                        <Typography sx={{ display: "block" }} variant={"h5"} mr={1} color="#1976d2" style={{ fontWeight: 600 }}>
                            Elastic Search
                        </Typography>
                    </Stack>
                    <Stack>
                        {/* <Box component="form" onSubmit={handleSubmit}>
                            <TextField
                                size="small"
                                label="Search for posts..."
                                sx={{ flexGrow: 1, maxWidth: 300 }}
                                onChange={handleChange}
                            />
                        </Box> */}
                        <Search />
                    </Stack>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        {token ? <><Avatar sx={{}}></Avatar>
                            <Typography sx={{ ml: 1, mr: 1 }}>{currentUser.email}</Typography>
                            <Button variant="text" sx={{ minWidth: 65 }} onClick={handleLogOut}>
                                Logout
                            </Button></> : <> <Button variant="text" sx={{ minWidth: 80 }} href="/signup">
                                Sign Up
                            </Button>
                            <Button variant="text" sx={{ minWidth: 65 }} href="/signin">
                                Login
                            </Button></>}
                    </Stack>
                </Stack>
            </Stack>
        </Container>
    )
}
export default Navbar