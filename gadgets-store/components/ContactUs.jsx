import React, {useState, useEffect} from 'react'
import { Form, Button } from 'react-bootstrap';
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
import EmailIcon from '@mui/icons-material/Email';
import YouTubeIcon from '@mui/icons-material/YouTube'; 
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Link from 'next/link'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: '#c8f0e6',
    border: '2px solid #7b54bf',
    boxShadow: 24,
    p: 4,
    textAlign: 'center',
  };

const ContactUs = () => {
    const { data: session } = useSession()
    const user = session?.user;
    console.log(user)

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [alertOpen, setAlertOpen] = useState(false);
    const handleAlertOpen = () => setAlertOpen(true);
    const handleAlertClose = () => setAlertOpen(false);

    const [message, setMessage] = useState('');
    const [messageError, setMessageError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        let isValid = true;
    
    
        if (!message) {
          setMessageError('Message is required.');
          isValid = false;
        }
    
        if (isValid) {
          try {
            const response = await axios.post('/api/contact', { message });
            console.log(response.data); // Success message
           
            handleAlertOpen();
            setMessage('');
            setEmailError('');
    
          } catch (error) {
            console.log(error);
          }
        }
      };

  return (
    <>
    <Box sx={{ width: '98%', m:'auto', mt: 1, bgcolor: 'transparent',  borderRadius: '16px', overflow: 'auto'}} className="boxBanner">
            <br></br>
            <br></br>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{m: 'auto',}}>
      
                <Grid item xs={8} sx={{ m: 'auto', boxShadow: 8, bgcolor: 'transparent',  borderRadius: '16px',  overflow: 'auto'}} className="svcGrid">
         
                    <Typography variant="h5" gutterBottom sx={{textAlign: 'center' }}>
                        Contact Us
                    </Typography>

                </Grid>
                <br></br>
               
            </Grid>
            <br></br>
            {user ?
              <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 13 }} sx={{m: 'auto', textAlign: 'center'}}>
                
              <Grid item xs={8} sx={{ m: 'auto', boxShadow: 8, bgcolor: 'transparent',  borderRadius: '16px', overflow: 'auto'}} className="svcGrid">
                  <Form onSubmit={handleSubmit} >
                      <Form.Group controlId="formBasicUsername">
                          <Form.Label style={{float: 'left', marginLeft: '20px'}}>Username</Form.Label>
                          <Form.Control type="text" disabled defaultValue={user.username} style={{backgroundColor: 'transparent', border: '1px solid black', width: '95%', margin: 'auto'}}/>
                      </Form.Group>

                      <Form.Group controlId="formBasicEmail">
                          <Form.Label style={{float: 'left', marginLeft: '20px'}}>Email address</Form.Label>
                          <Form.Control type="email" disabled defaultValue={user.email} style={{backgroundColor: 'transparent', border: '1px solid black', width: '95%', margin: 'auto'}}/>
                      </Form.Group>

                      <Form.Group controlId="formBasicMessage">
                          <Form.Label style={{float: 'left', marginLeft: '20px'}}>Message</Form.Label>
                          <Form.Control as="textarea" rows={3} placeholder="Enter message" value={message} onChange={(event) => setMessage(event.target.value)} style={{backgroundColor: 'transparent', border: '1px solid black', width: '95%', margin: 'auto'}}/>
                          <Form.Text className="text-danger">{messageError}</Form.Text>
                      </Form.Group>
                        <br></br>
                      <Fab type="submit"  variant="extended" sx={{backgroundColor: '#7b54bf', '&:hover': {backgroundColor : '#9256fa'}, filter: 'drop-shadow(5px 5px 5px rgba(0,0,0,0.63))'}}>
                          <SendIcon sx={{ mr: 1 }} />
                          Submit 
                      </Fab>
                      <br></br>
                      <br></br>
                  </Form>
              </Grid>
          </Grid>
            :
            <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 13 }} sx={{m: 'auto', textAlign: 'center'}}>
                
                <Grid item xs={8} sx={{ m: 'auto', boxShadow: 8, bgcolor: 'transparent',  borderRadius: '16px', overflow: 'auto'}} className="svcGrid">
                    <Form >
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label style={{float: 'left', marginLeft: '20px'}}>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" style={{backgroundColor: 'transparent', border: '1px solid black', width: '95%', margin: 'auto'}}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label style={{float: 'left', marginLeft: '20px'}}>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" style={{backgroundColor: 'transparent', border: '1px solid black', width: '95%', margin: 'auto'}}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicMessage">
                            <Form.Label style={{float: 'left', marginLeft: '20px'}}>Message</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Enter message" style={{backgroundColor: 'transparent', border: '1px solid black', width: '95%', margin: 'auto'}}/>
                        </Form.Group> 
                            <br></br>
                        <Fab variant="extended" onClick={handleOpen} sx={{backgroundColor: '#7b54bf', '&:hover': {backgroundColor : '#9256fa'}, filter: 'drop-shadow(5px 5px 5px rgba(0,0,0,0.63))'}}>
                            <SendIcon sx={{ mr: 1 }} />
                            Submit 
                        </Fab>
                        <br></br>
                        <br></br>
                    </Form>
                </Grid>
            </Grid>
            }
            
            <br></br>
            <br></br>
        </Box>



        <div>
        <Modal open={open} onClose={handleClose} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{timeout: 500,}}>
            <Fade in={open}>
            <Box sx={style}>
                <Box sx={{textAlign: 'center', mt: '5%' }}>
                    <Typography variant="h5" gutterBottom >
                        Please <Link href='/Login' className='listItem'>SignIn</Link> or <Link href='/Register' className='listItem'>Create</Link> an account
                        to send messages to us.
                    </Typography>
                </Box>
            </Box>
            </Fade>
        </Modal>
        </div>


        <div>
        <Modal open={alertOpen} onClose={handleAlertClose} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{timeout: 500,}}>
            <Fade in={alertOpen}>
            <Box sx={style}>
                <Box sx={{textAlign: 'center', mt: '5%' }}>
                    <Typography variant="h5" gutterBottom >
                        Message Sent. 
                    </Typography>
                </Box>
            </Box>
            </Fade>
        </Modal>
        </div>
    </>
  )
}

export default ContactUs