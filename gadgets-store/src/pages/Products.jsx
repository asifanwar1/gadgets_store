import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Link from 'next/link'
import MainNavbar from 'components/MainNavbar';
import Fab from '@mui/material/Fab';
import InfoIcon from '@mui/icons-material/Info';






const Products = ({products}) => {
  const [allProducts, setAllProducts] = useState(products.data);
  console.log(products)


  useEffect(()=>{
    setAllProducts(products.data)
    
  },[products])

  return (
    <>
    <MainNavbar/>
    <Box sx={{ flexGrow: 1, mt: 5 }}>
      {allProducts ?
        <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 13 }} sx={{m: 'auto', textAlign: 'center'}}>
          {allProducts.map((element, index) => (
            <Grid item md={4} key={index}  sx={{ m: 'auto', filter: 'drop-shadow(15px 15px 15px rgba(0,0,0,0.63))' , bgcolor: 'transparent',  overflow: 'auto'}} className="svcGrid">
              <img src={element.attributes.imageUrl} alt={`Image ${index}`} className="productMainPage"/>
              <br></br>
              <br></br>
              <Box sx={{textAlign: 'center' }}>
                <h4>{element.attributes.title}</h4>
                <p>Price: $ {element.attributes.price}  </p>
                <Fab variant="extended" sx={{backgroundColor: '#7b54bf', '&:hover': {backgroundColor : '#9256fa'},}}>
                  <InfoIcon sx={{ mr: 1, color:'white', }} />
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
          <p>No Item</p>
      }
     
    </Box>
    </>
  )
}

export async function getServerSideProps(){
  const {API_URL} = process.env;

  const res = await axios.get(`${API_URL}/api/products`);
  // const res = await fetch(`${API_URL}/api/products`);
  
  const data = await res.data;
  // const data = await res.json();

  return {
    props: {
      products: data
    },
  }
}

export default Products





{/* <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{mx: 'auto'}}>
        
{allProducts.map((element, index) =>
  <Grid item xs={2} sm={4} md={4} key={index}>
  <Card sx={{ maxWidth: 345 }}>
  <CardMedia
    sx={{ height: 300 }}
    image={element.attributes.imageUrl}
    title="green iguana"
  />
  <CardContent>
    <Typography gutterBottom variant="h5" component="div">
      {element.attributes.title}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      ${element.attributes.price}
    </Typography>
  </CardContent>
  <CardActions>
    {/* <Button size="small">Add to Cart</Button> */}
//     <Button size="small">Learn More</Button>
//     <Link href={`/product/${element.attributes.slug}`}>Buy Now</Link>
//   </CardActions>
// </Card>
// </Grid>
// )}

// </Grid> */}