import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { UserLoginContext } from '../context/AuthContext'
import { useSignInMutation } from '../generated/graphql'
import { signInSchema } from '../validationSchemas/ValidationSchema'

const LogIn = () => {

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(signInSchema)
  })

  const loginContext = useContext(UserLoginContext)
  const { login } = loginContext

  const navigate = useNavigate()

  const [SignIn] = useSignInMutation({
    onError({ message }) {
      console.log("error", message)
    },
    onCompleted(data) {
      const { signIn } = data;
      const { accesstoken } = signIn
      login(accesstoken)
      navigate("/")
    }
  })

  const onSubmit = (data: any) => {
    SignIn({
      variables: {
        user: {
          email: data.email,
          password: data.password
        }
      }
    })
  }

  return (
    <Container maxWidth="xs" >
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" component="h1" >Sign In</Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }} >

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

          <Button color='primary' variant="contained" fullWidth type='submit' sx={{ mt: 2, mb: 2 }}> Sign in</Button>
          <Grid container>
            <Grid>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
              <Grid item >
                <Link href="#" variant="body2">
                  Don't have an account? SignUp
                </Link>

              </Grid>

            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default LogIn