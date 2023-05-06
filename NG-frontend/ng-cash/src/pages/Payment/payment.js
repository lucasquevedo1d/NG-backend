import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { Header } from '../../components/Header/Header'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Container, CssBaseline, Grid, Paper, TextField } from '@mui/material'
import { Copyright } from '../../components/Copyright/Copyright'
import theme from '../../constants/Theme'
import { BackButton, ButtonEnviar, Cash, LogoImg } from './styled'
import logo from "../../img/NG.cash (2).png"
import banco from "../../img/banco.jpg"
import { goToHome } from '../router/coordinator'
import axios from 'axios'
import { BASE_URL } from '../../constants/Url'
import UseForm from '../../Hooks/useFrom'



export const Payment = () => {
  const navigate = useNavigate()
  const [form, onChange, clear] = UseForm({ username: "", balance: 0 })

  // const [balance, setBalance] = useState(0)
  // const [username, setUsername] = useState("")
  const params = useParams()

  const onSubmitPayment = async (event) => {
    // event.preventDefault()

    const body={
      accountId:params.id,
      username: form.username,
      balance: form.balance
    }

      await axios.put(`${BASE_URL}/balance`, body,{
      headers: {
        Authorization:localStorage.getItem("token")
    }
})
      .then((res) => {
        alert(res.data.message)
      })
      .catch((err) => {
        alert(err.response.data.message)
      })
  }

  return (
    <ThemeProvider theme={theme} >
        <Header/>
        <div style={{
            backgroundImage: `url(${banco})`,
            height: '130vh',
            with: '100%',
            backgroundSize: "cover"

        }}>
            <br></br>
            <Paper variant="elevation" elevation={15} sx={{ mr: 65, ml: 65, mb: 5 }}>
                <Container component="main" maxWidth="xs" sx={{ mb: 5 }}>
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <LogoImg src={logo} />
                            
                        <Box sx={{ mt: 3 }} >
                            <Grid container spacing={2}>
                              <Cash>$ Enviar dinheiro</Cash>
                                <Grid item xs={12}>
                                    <TextField 
                                    fullWidth 
                                    variant='standard'
                                    margin='normal' 
                                    label='Nome'  
                                    name="username"
                                    required
                                    type='text'
                                    onChange={onChange}
                                    value={form.username}
                                    />
                                    <TextField 
                                    fullWidth 
                                    variant='standard' 
                                    margin='normal' 
                                    label='Valor'
                                    name="balance"
                                    type='number'
                                    onChange={onChange}
                                    value={form.balance}
                                    />
                                    <br></br>
                                    <Button  onClick={() => onSubmitPayment()} type="submit" fullWidth variant="contained"sx={{ mt: 3, mb: 2, bgcolor: "black", color:'white' }} color="primary">
                                     <ButtonEnviar>Enviar</ButtonEnviar> 
                                    </Button>
                                    <Button fullWidth variant='outlined' onClick={() => goToHome(navigate, params.id)}><BackButton>Voltar</BackButton></Button>
                                </Grid>
                                <Grid item xs={12}>
                                </Grid>
                                <Grid item xs={12}>
                                </Grid>
                            </Grid>                   
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 9, color: "black" }} />
                    <br></br>
                </Container>
            </Paper >
        </div>
    </ThemeProvider>

  )
}

