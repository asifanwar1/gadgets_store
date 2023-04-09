import React, {useState, useEffect} from 'react'
import { Form, Button } from 'react-bootstrap';
import Image from 'next/image'
import axios from 'axios';
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
import Link from 'next/link'

const Footer = () => {
  return (
    <>
    <Box sx={{ width: '98%', m:'auto', mt: 1, borderTop: 1, borderColor: '#7b54bf', bgcolor: 'transparent', overflow: 'auto'}} className="boxBanner">
            <br></br>
            <br></br>
            <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 13 }} sx={{m: 'auto', textAlign: 'center'}}>
                <Grid item md={8} sx={{ m: 'auto',  bgcolor: 'transparent', overflow: 'auto'}} className="svcGrid">
                    <Box sx={{ '& > :not(style)': { m: 1 }, filter: 'drop-shadow(5px 5px 5px rgba(0,0,0,0.63))' }}>
                        <Fab color="primary" aria-label="add" sx={{backgroundColor: '#7b54bf', '&:hover': {backgroundColor : '#9256fa'},}}>
                            <WhatsAppIcon />
                        </Fab>
                        <Fab color="primary" aria-label="add" sx={{backgroundColor: '#7b54bf', '&:hover': {backgroundColor : '#9256fa'},}}>
                            <EmailIcon />
                        </Fab>
                        <Fab color="primary" aria-label="add" sx={{backgroundColor: '#7b54bf', '&:hover': {backgroundColor : '#9256fa'},}}>
                            <YouTubeIcon />
                        </Fab>
                        <Fab color="primary" aria-label="add" sx={{backgroundColor: '#7b54bf', '&:hover': {backgroundColor : '#9256fa'},}}>
                            <FacebookIcon />
                        </Fab>
                        <Fab color="primary" aria-label="add" sx={{backgroundColor: '#7b54bf', '&:hover': {backgroundColor : '#9256fa'},}}>
                            <TwitterIcon />
                        </Fab>
                        <br></br>
                        <br></br>
                    </Box>
                </Grid>
            </Grid>
            <br></br>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{m: 'auto',}}>
      
                <Grid item xs={8} sx={{ m: 'auto', bgcolor: 'transparent',  filter: 'drop-shadow(5px 5px 5px rgba(0,0,0,0.63))', overflow: 'auto'}} className="svcGrid">
                    <Box sx={{ '& > :not(style)': { m: 1 }, textAlign: 'center' }}>
                        <Link href="#Home"  className='listItem'>Home</Link> 
                        <Link href="#Products"  className='listItem'>Products</Link> 
                        <Link href="#Services"  className='listItem'>Services</Link> 
                        <Link href="#Contact"  className='listItem'>Contact</Link> 
                    </Box>
                </Grid>
                <br></br>
               
            </Grid>
            <br></br>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{m: 'auto',}}>
      
                <Grid item xs={8} sx={{ m: 'auto', bgcolor: 'transparent', filter: 'drop-shadow(5px 5px 5px rgba(0,0,0,0.63))',overflow: 'auto'}} className="svcGrid">
         
                    <Typography variant="body1" gutterBottom sx={{textAlign: 'center' }}  className='listItem'>
                        Gadgets Galore © {new Date().getFullYear()}
                    </Typography>

                </Grid>
                <br></br>
               
            </Grid>
            <br></br>
            <br></br>
        </Box>
    </>
  )
}

export default Footer