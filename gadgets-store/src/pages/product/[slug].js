import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Link from 'next/link'
import MainNavbar from 'components/MainNavbar';
import Head from 'next/head'
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

const Product = ({product}) => {

  const { data: session } = useSession()
  const user = session?.user;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const [alertOpen, setAlertOpen] = useState(false);
  const handleAlertOpen = () => setAlertOpen(true);
  const handleAlertClose = () => setAlertOpen(false);;

  const handleAddToCart = async () => {
    if(product && user){
      try {
        const res = await axios.post('/api/addToCart', product);
        if(res.status === 200){
          console.log("item added to cart");
          handleAlertOpen();
        }
      } catch (err) {
        console.log(err
          );
      }
    }
    else{
      handleOpen();
    }
  }
    
  
  console.log(product)
  return (
    <>
        <Head>
          <title>Gadgets Galore</title> 
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/logo.png" />
        </Head>
        <MainNavbar/>
        <Box>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{mx: 'auto'}}>
                <Grid item md={4} sx={{m: 'auto',}}>
                    <Box sx={{ m: 'auto', mt: 5, textAlign: 'center', bgcolor: 'transparent',  overflow: 'auto'}}>
                        <img src={product.attributes.imageUrl} alt='In Demand' className="productPage"/>
                    </Box> 
                </Grid>

                <Grid item md={4} sx={{m: 'auto',}}>
                    <Box sx={{ m: 'auto', textAlign: 'center', bgcolor: 'transparent',  overflow: 'auto'}}>
                        <Typography variant="h5" gutterBottom sx={{textAlign: 'center' }}>
                            {product.attributes.title}
                        </Typography>
                        <Typography variant="h5" gutterBottom sx={{textAlign: 'center' }}>
                            Price: $ {product.attributes.price}
                        </Typography>
                        <Typography variant="body1" gutterBottom sx={{textAlign: 'left' }}>
                            {product.attributes.description}
                        </Typography>
                    </Box> 
                </Grid>
            </Grid>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{mx: 'auto'}}>
                <Grid item sm={3} sx={{m: 'auto',}}>
                    <Box sx={{ '& > :not(style)': { m: 1 } }}>
                        <Fab variant="extended" onClick={handleAddToCart} sx={{backgroundColor: '#7b54bf', '&:hover': {backgroundColor : '#9256fa'},}}>
                            <ShoppingCartIcon/>
                            Add To Cart
                        </Fab>
                        <Fab variant="extended" sx={{backgroundColor: '#7b54bf', '&:hover': {backgroundColor : '#9256fa'},}}>
                            <ShoppingBagIcon/>
                            Buy Now
                        </Fab>
                    </Box> 
                </Grid>
            </Grid>
        </Box>



      <div>
      <Modal open={open} onClose={handleClose} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{timeout: 500,}}>
        <Fade in={open}>
          <Box sx={style}>
            <Box sx={{textAlign: 'center', mt: '5%' }}>
              <Typography variant="h5" gutterBottom >
                Please <Link href='/Login' className='listItem'>SignIn</Link> or <Link href='/Register' className='listItem'>Create</Link> an account
                to buy your favourite tech gadgets
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
                        Item added to cart. 
                    </Typography>
                </Box>
            </Box>
            </Fade>
        </Modal>
        </div>
    </>
  )
}


// export async function getServerSideProps(context) {
//     // console.log(context.query)
//     let headers = {Authorization: `Bearer ${process.env.ADMIN_TOKEN}`}
//     let a = await fetch(process.env.API_URL + "/api/products?filters[slug]=" + context.query.slug + "&populate=*", {headers:headers})
//     let product = await a.json() 
//     console.log(product)
//     return {
//       props: {product: product.data[0]},
//     }
// }


export async function getServerSideProps(context) {
    try {
      const headers = {
        Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
      };
      const response = await axios.get(`${process.env.API_URL}/api/products?filters[slug]=${context.query.slug}&populate=*`, {
        headers,
      });
      const product = response.data.data[0];
    //   console.log(product);
      return {
        props: {
          product,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        props: {
          product: null,
        },
      };
    }
}


export default Product