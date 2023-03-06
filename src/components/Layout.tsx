import { Box, Container, Grid } from '@mui/material'
import React from 'react'
import { AiFillFileText, AiTwotoneMessage } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import GeneralButton from './GenralButton'
import Navbar from './NavBar'
interface Props {
    children: React.ReactElement
}
const Layout: React.FC<Props> = ({ children }) => {
    const navigate = useNavigate()

    return (
        <>
            <Navbar />
            <Container maxWidth="md">
                <Grid container spacing={2}>
                    <Grid item xs={12} md={8} spacing={2}>
                        {children}
                    </Grid>
                    <Grid item md={4}>
                        <Box>
                            <GeneralButton
                                btnText="Messenger"
                                icon={AiTwotoneMessage}
                                onClick={() => navigate("/chat")}
                            />
                        </Box>

                        <Box mt={2}>
                            <GeneralButton
                                btnText="My Posts"
                                icon={AiFillFileText}
                                onClick={() => navigate("/chat")}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Layout