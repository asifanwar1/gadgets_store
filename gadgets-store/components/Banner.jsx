import React, {useState, useEffect} from 'react'
import productImages from '../../gadgets-store/productImages.json'
import Image from 'next/image'
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import InfoIcon from '@mui/icons-material/Info';
import InventoryIcon from '@mui/icons-material/Inventory';
import Link from 'next/link'

const Banner = ({props}) => {

    const [randomProducts1, setRandomProducts1] = useState([]);
    const [randomProducts2, setRandomProducts2] = useState([]);
//   console.log(products)
  console.log(props)


  useEffect(()=>{

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const shuffledProducts = shuffleArray(props);

    const selectedProducts1 = shuffledProducts.slice(0, 3);
    const selectedProducts2 = shuffledProducts.slice(3, 6);
    
    setRandomProducts1(selectedProducts1)
    setRandomProducts2(selectedProducts2)
    
  },[props])
 

  return (
    <>
        <Box sx={{ width: '98%', m:'auto', mt: 1,  bgcolor: 'transparent',  borderRadius: '16px', overflow: 'auto'}} className="boxBanner">
            <br></br>
            <br></br>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{m: 'auto',}}>
      
                <Grid item xs={8} sx={{ m: 'auto', boxShadow: 8, bgcolor: 'transparent',  borderRadius: '16px',  overflow: 'auto'}} className="svcGrid">
         
                    <Typography variant="h5" sx={{textAlign: 'center' }}>
                        Products
                    </Typography>

                </Grid>
                <br></br>
               
            </Grid>
            <br></br>
            {randomProducts1 ?
            <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 13 }} sx={{m: 'auto', textAlign: 'center'}}>
                {randomProducts1.map((element, index) => (
                    
                    <Grid item md={4} key={index}  sx={{ m: 'auto', filter: 'drop-shadow(15px 15px 15px rgba(0,0,0,0.63))' , bgcolor: 'transparent',  overflow: 'auto'}} className="svcGrid">
                        <img src={element.attributes.imageUrl} alt={`Image ${index}`} className="productMainPage"/>
                            <Box variant="h5" sx={{textAlign: 'center' }}>
                                <h6>{element.attributes.title} </h6>
                                <p>Price: $ {element.attributes.price} </p>
                                <Fab variant="extended" sx={{backgroundColor: '#7b54bf', '&:hover': {backgroundColor : '#9256fa'},}}>
                                    <ShoppingBagIcon sx={{ mr: 1, color:'white',}} />
                                    <Link href={`/product/${element.attributes.slug}`} className='buyNowMain'>Buy Now</Link>
                                </Fab>
                                <br></br>
                                <br></br>
                            </Box>
                    </Grid>
                ))}
                <br></br>
            </Grid>
            :
            <Grid></Grid>
            }
            <br></br>
            {randomProducts2 ?
            <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 13 }} sx={{m: 'auto', textAlign: 'center'}}>
                {randomProducts2.map((element, index) => (
                    
                    <Grid item md={4} key={index}  sx={{ m: 'auto', filter: 'drop-shadow(15px 15px 15px rgba(0,0,0,0.63))' , bgcolor: 'transparent',  overflow: 'auto'}} className="svcGrid">
                        <img src={element.attributes.imageUrl} alt={`Image ${index}`} className="productMainPage"/>
                            <Box variant="h5" sx={{textAlign: 'center' }}>
                                <h6>{element.attributes.title} </h6>
                                <p>Price: $ {element.attributes.price}  </p>
                                <Fab variant="extended" sx={{backgroundColor: '#7b54bf', '&:hover': {backgroundColor : '#9256fa'},}}>
                                    <ShoppingBagIcon sx={{ mr: 1, color:'white', }} />
                                    <Link href={`/product/${element.attributes.slug}`}  className='buyNowMain'>Buy Now</Link>
                                </Fab>
                                <br></br>
                                <br></br>
                            </Box>
                    </Grid>
                ))}
                <br></br>
            </Grid>
            :
            <Grid></Grid>
            }
            <br></br>
            <br></br>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{m: 'auto',}}>
      
                <Grid item xs={8} sx={{ m: 'auto', textAlign: 'center',  bgcolor: 'transparent',  borderRadius: '16px',  overflow: 'auto'}} className="svcGrid">

                    <Typography variant="h5" sx={{textAlign: 'center' }}>
                        Click on "All Products" button to check all available products
                    </Typography>
                    <br></br>
                    <Fab variant="extended" sx={{ backgroundColor: '#7b54bf', '&:hover': {backgroundColor : '#9256fa'},}}>
                        <InventoryIcon sx={{ mr: 1, color:'white', }} />
                        <Link href="/Products" className='buyNowMain'>All Products</Link>
                    </Fab>
                    <br></br>
                    <br></br>
                    
                </Grid>
                <br></br>
            </Grid>
            <br></br>
            <br></br>
        </Box>
    </>
  )
}



export default Banner

