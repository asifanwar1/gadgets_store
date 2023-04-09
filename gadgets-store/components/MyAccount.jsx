import React, {useState, useEffect} from 'react'
import { Form, Button } from 'react-bootstrap';
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import ListItemText from '@mui/material/ListItemText';
import { signOut, useSession } from "next-auth/react"


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

const MyAccount = () => {
    
    const { data: session } = useSession()
    const user = session?.user;
    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


  return (
    <>
      <MenuItem onClick={handleOpen} sx={{color: '#7b54bf' , '&:hover': {color : '#9256fa'},}}>My account</MenuItem>
      
      <div>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h5" component="h2">
              My Account
            </Typography>
            <br></br>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {user.username}
            </Typography>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {user.email}
            </Typography>
            <ListItemText primary='Logout' onClick={() => signOut()} className='listItem'/>  
          </Box>
        </Fade>
      </Modal>
    </div>
    </>
  )
}

export default MyAccount