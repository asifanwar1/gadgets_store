import React, {useState, useEffect} from 'react'
import { Form, Button } from 'react-bootstrap';
import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios';
import { signOut, useSession } from "next-auth/react"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import InfoIcon from '@mui/icons-material/Info';
import SendIcon from '@mui/icons-material/Send';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import YouTubeIcon from '@mui/icons-material/YouTube'; 
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import DashDrawer from 'components/DashDrawer';
import MainNavbar from 'components/MainNavbar';
import Link from 'next/link'

const Messages = ({allMessages}) => {

    const { data: session, status } = useSession();
    const user = session?.user;
    console.log(user)

    const [pageName, setPageName] = useState(" / Messages");

  const handleDeleteMessage = (id) =>{
    console.log(id)

  }

  if(user && user.role === "admin"){
    return (
      <>
        <Head>
          <title>Dashboard</title> 
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/logo.png" />
        </Head>
        <DashDrawer props={pageName}/>
        {allMessages ?
          <Box>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{m: 'auto',}}>
              {allMessages.map((element, index) =>
                <Grid key={index} item xs={5} sx={{ m: 'auto', overflow: 'auto'}} >
                  <Card variant="outlined" sx={{backgroundColor: 'transparent', filter: 'drop-shadow(5px 5px 5px rgba(0,0,0,0.63))'}}>
                    <CardContent>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Time: {element.attributes.createdAt}
                      </Typography>
                      <Typography variant="h5" component="div">
                        Name: {element.attributes.user.data.attributes.username}
                      </Typography>
                      <Typography sx={{ mb: 1.5, color: 'transparent', textShadow: '0 0 8px #000' }} color="text.secondary">
                        Email: {element.attributes.user.data.attributes.email}
                      </Typography>
                      <Typography variant="body2">
                        Message: {element.attributes.userMessage}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Fab variant="extended" onClick={() => handleDeleteMessage(element.id)} sx={{backgroundColor: '#7b54bf', '&:hover': {backgroundColor : '#9256fa'},}}>
                        <DeleteIcon sx={{ mr: 1 }} />
                        Delete Message 
                      </Fab>
                    </CardActions>
                  </Card>
                </Grid>
              )}
        </Grid>
      </Box>
      :
        <Box></Box>
      }
      </>
    )

  }


  return(
    <>
        <Head>
            <title>Gadgets Galore</title> 
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/logo.png" />
        </Head>
        <section>
            <MainNavbar/>
        </section>
        <section>
            <Box sx={{textAlign: 'center', mt: '5%' }}>
                <Typography variant="h5" gutterBottom >
                    Please <Link href='/Login' className='listItem'>SignIn</Link> or <Link href='/Register' className='listItem'>Create</Link> an account
                    to continue.
                </Typography>
            </Box>
        </section>
    </>
  )
}



import { authOptions } from '../api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"

export async function getServerSideProps({ req, res }){
  const session = await getServerSession(req, res, authOptions);

  if(session){
    const response = await axios.get(`${process.env.API_URL}/api/messages?populate=user`, {
      headers: {
          // Authorization: `Bearer ${process.env.ADMIN_TOKEN}`
          Authorization: `Bearer ${session.user.jwtoken}`
      }
    });
  
    
    const data = await response.data;
  
    return {
      props: {
        allMessages: data.data
      },
    }

  }
  else{
    return {
      props: {
        // cartItems: userCart
      },
    }
  }
 
}



export default Messages