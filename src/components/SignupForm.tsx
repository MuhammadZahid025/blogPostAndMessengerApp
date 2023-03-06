import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"

import { Container, Box, Typography, TextField, Button, Grid, Link } from "@mui/material"
import { useSignUpMutation } from "../generated/graphql";
import { useNavigate } from "react-router-dom";
import { signupSchema } from "../validationSchemas/ValidationSchema";

const SignupForm = () => {

    const { register, handleSubmit } = useForm({
        resolver: yupResolver(signupSchema)
    })
    const navigate = useNavigate()

    const [SignUp] = useSignUpMutation({

        onError({ message }) {
            console.log("error", message)
        },

        onCompleted(data) {
            const { signUp } = data;
            // constext.login(data)
            console.log("success", signUp);
            navigate("/signin")
        }
    })

    const onSubmit = (data: any) => {
        SignUp({
            variables: {
                createUserInput: {
                    email: data.email,
                    name: data.name,
                    password: data.password
                }
            }
        })
    }
    return (
        <Container maxWidth="xs" >
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h5" component="h1" >Sign up</Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }} >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        label="Ener your name here"
                        type="text"
                        {...register("name")}
                        fullWidth
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        label=" Enter your email here"
                        type="email"
                        {...register("email")}
                        fullWidth
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        label=" Enter your password here"
                        type="password"
                        {...register("password")}
                        fullWidth
                    />

                    <Button color='primary' variant="contained" fullWidth type='submit' sx={{ mt: 2, mb: 2 }}> Sign Up</Button>
                    <Grid container>
                        <Grid>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                            <Grid item >
                                <Link href="#" variant="body2">
                                    Already have an account? Login
                                </Link>

                            </Grid>

                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}

export default SignupForm